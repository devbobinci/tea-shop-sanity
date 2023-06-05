"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { child, get, getDatabase, onValue, ref } from "firebase/database";
import { app } from "../../utilities/firebase";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import urlFor from "@/lib/urlFor";
import { formatCurrency } from "@/app/utilities/formatCurrency";
import { useUserPanelContext } from "@/app/context/UserPanelContext";

import { BsCashCoin } from "react-icons/bs";
import { HiChevronRight } from "react-icons/hi";

type Orders = {
  order: [
    {
      price: number;
      name: string;
      quantity: number;
      purchase_date: string;
      mainImage: MainImage;
      slug: Slug;
    }
  ];
};

type OrderedProduct = {
  price: number;
  name: string;
  quantity: number;
  purchase_date: string;
  mainImage: MainImage;
  slug: Slug;
};

const orderStatus = [
  "Przyjęto w oddziale",
  "W trakcie realizacji",
  "W trakcie pakowania",
  "Wysłane",
  "Czeka na odbiór",
];

function getRandom(arr: string[], n: number) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

const randomOrderStatus = getRandom(orderStatus, orderStatus.length).map(
  (status) => status
);

export default function Orders() {
  const auth = getAuth(app);

  const [orders, setOrders] = useState<Orders[]>([]);

  const { userPanel, setUserPanel } = useUserPanelContext();

  function sum(array: any) {
    let sum = 0;

    array.forEach((item: number) => {
      sum += item;
    });
    return sum;
  }

  const [user, loading] = useAuthState(auth);
  const db = getDatabase();
  function getOrderedProducts() {
    const dbRef = ref(db);

    get(child(dbRef, `users/${user?.uid}/orders`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const orderEntries = Object.entries(snapshot.val());

          const newOrders = orderEntries.map((order: any) => {
            return {
              id: order[0],
              purchase_date: order[1].map((date: any) => date.purchase_date),
              total_price: order[1].map((order: any) => order.price),
              order: order[1],
            };
          });

          setOrders(newOrders);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    db && getOrderedProducts();
  }, [user]);

  if (user && orders.length === 0) {
    getOrderedProducts();
  }

  if (!user) {
    return (
      <div className="mx-auto my-24 flex max-w-7xl justify-center px-4 md:px-6 xl:my-32 xl:px-0">
        <button
          className="inline-block rounded-full bg-my-yellow px-6 py-3 text-xl text-white"
          onClick={() => setUserPanel(true)}
        >
          Zaloguj się ponownie 👨‍💻
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto my-24 max-w-7xl px-4 md:px-6 xl:my-32 xl:px-0">
      <div>
        {orders.length === 0 && (
          <div className="flex items-center gap-2">
            <span className="animate-pulse">Ładowanie</span>
            <button
              onClick={() => getOrderedProducts()}
              className="rounded-full bg-my-yellow px-4 py-3 text-white"
            >
              Spróbuj ponownie
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-4">
        {orders &&
          orders.map((orderedProducts: any, i: number) => (
            <Link
              key={orderedProducts.id}
              href={`zamowienia/${orderedProducts.id}`}
            >
              <div
                key={orderedProducts.id}
                className="group rounded-md bg-white p-6 shadow-md transition-all hover:shadow-lg xl:p-8"
              >
                {/* outer div */}
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <h1 className="pb-3 text-lg font-bold">
                      {randomOrderStatus[i]}
                    </h1>
                    <p className="text-sm md:text-base">
                      {orderedProducts.order.length}{" "}
                      {orderedProducts.order.length > 1 ? "rzeczy" : "rzecz"}
                    </p>

                    {/* Single ordered product */}
                    <div className="mt-4 flex items-center gap-1 md:gap-2">
                      {orderedProducts.order
                        .slice(0, 3)
                        .map((product: OrderedProduct) => (
                          <div key={product.name} className="cursor-pointer">
                            <div className="h-20 w-20 md:h-24 md:w-24">
                              <Image
                                src={urlFor(product?.mainImage?.asset).url()}
                                height={100}
                                width={100}
                                alt={product.name}
                                className="h-full w-full rounded-md bg-my-beige/30 object-contain p-1.5 opacity-70 transition-all hover:opacity-100"
                              />
                            </div>
                          </div>
                        ))}
                      {orderedProducts.order.length > 3 && (
                        <span className="ml-2 text-gray-700">
                          +{orderedProducts.order.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-3 md:text-right">
                    <h2 className="text-sm md:text-base">
                      Zamówienie nr:{" "}
                      <span className="font-semibold italic text-my-yellow">
                        {orderedProducts.id}
                      </span>
                    </h2>

                    <p className="text-sm italic md:text-base">
                      Złożone dnia{" "}
                      <span className="text-xs text-gray-700 md:text-sm">
                        {orderedProducts.purchase_date[0]}
                      </span>
                    </p>

                    <p className="inline-flex items-center gap-2 text-gray-700 md:text-lg">
                      <BsCashCoin className="text-xl" />
                      {formatCurrency(sum(orderedProducts.total_price))}
                    </p>

                    <HiChevronRight className="text-2xl transition-all group-hover:translate-x-1.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
