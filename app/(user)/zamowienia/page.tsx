"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { child, get, getDatabase, onValue, ref } from "firebase/database";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { IoIosCash } from "@react-icons/all-files/io/IoIosCash";
import { HiChevronRight } from "@react-icons/all-files/hi/HiChevronRight";
import { ClipLoader } from "react-spinners";

import urlFor from "@/lib/urlFor";
import { app } from "@/app/utilities/firebase";
import { formatCurrency } from "@/app/utilities/formatCurrency";
import { useUserPanelContext } from "@/app/context/UserPanelContext";
import { randomOrderStatus } from "@/app/utilities/randomOrderStatus";
import { sum } from "@/app/utilities/sumPrice";
import { MainImage, Slug } from "@/typings";

export const revalidate = 60;

type Order = {
  id: string;
  order: OrderedProduct[];
  purchase_date: string[];
  total_price: number[];
};

type OrderedProduct = {
  price: number;
  name: string;
  quantity: number;
  purchase_date: string;
  mainImage: MainImage;
  slug: Slug;
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { userPanel, setUserPanel } = useUserPanelContext();

  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);

  const db = getDatabase();

  function getOrderedProducts() {
    const dbRef = ref(db);

    try {
      get(child(dbRef, `users/${user?.uid}/orders`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const orderEntries = Object.entries(snapshot.val());

            // Nie chcialem dac type any, ale skomplikowana struktura w tablicy wyszła przez Object.entries i pomimo wielu prób nie podołałem.
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
    } catch (error: any) {
      throw new Error("Nie udało się załadować zamówień", error);
    }
  }

  useEffect(() => {
    db && getOrderedProducts();
  }, [user]);

  if (user && orders?.length === 0) {
    getOrderedProducts();
  }

  const sortedOrders = orders?.sort((a: Order, b: Order) => {
    return a.purchase_date[0] ? -1 : b.purchase_date[0] ? 1 : 0;
  });

  if (!user && !loading) {
    return (
      <div
        suppressHydrationWarning
        className="mx-auto my-24 flex max-w-7xl justify-center px-4 md:px-6 lg:my-32 xl:px-0"
      >
        <button
          className="inline-block rounded-full bg-my-yellow px-6 py-3 text-xl text-white"
          onClick={() => setUserPanel(true)}
        >
          Zaloguj się ponownie 👨‍💻
        </button>
      </div>
    );
  } else if (user && orders.length === 0) {
    getOrderedProducts();
    return (
      <div className="mx-auto my-24 flex max-w-7xl items-center justify-center gap-2 px-4 md:px-6 lg:my-32 xl:px-0">
        <span className="animate-pulse">Brak zamówień</span>
        <Link
          href="/product"
          className="rounded-full bg-my-yellow px-4 py-3 text-white"
        >
          Zobacz naszą ofertę
        </Link>
      </div>
    );
  } else if (loading) {
    <div className="mx-auto my-24 flex max-w-7xl justify-center px-4 md:px-6 lg:my-32 xl:px-0">
      <span>Ładowanie...</span>
      <br />
      <ClipLoader color="gray" size={20} />
    </div>;
  }

  return (
    <div
      className="mx-auto my-24 max-w-7xl px-4 md:px-6 lg:my-32 xl:px-0"
      suppressHydrationWarning
    >
      <div className="mx-auto grid max-w-5xl gap-8">
        {orders &&
          sortedOrders.map((order: Order, i: number) => (
            <Link key={order.id} href={`zamowienia/${order.id}`}>
              <div
                key={order.id}
                className="group rounded-md bg-white p-6 shadow-md transition-all hover:shadow-lg xl:p-8"
              >
                {/* outer div */}
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <h1 className="pb-3 text-lg font-bold">
                      {randomOrderStatus[i]}
                    </h1>
                    <p className="text-sm md:text-base">
                      {order.order.length}{" "}
                      {order.order.length > 1 ? "rzeczy" : "rzecz"}
                    </p>

                    {/* Single ordered product */}
                    <div className="mt-4 flex items-center gap-1 md:gap-2">
                      {order.order
                        .slice(0, 3)
                        .map((product: OrderedProduct) => (
                          <div key={product.name} className="cursor-pointer">
                            <div className="h-20 w-20 md:h-24 md:w-24">
                              <Image
                                src={urlFor(product?.mainImage?.asset).url()}
                                height={100}
                                width={100}
                                alt={product.name}
                                className="h-full w-full rounded-md bg-my-beige/30 object-contain p-1.5 transition-all"
                              />
                            </div>
                          </div>
                        ))}
                      {order.order.length > 3 && (
                        <span className="ml-2 text-gray-700">
                          +{order.order.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-3 text-right md:text-right">
                    <h2 className="text-sm md:text-base">
                      Zamówienie nr:{" "}
                      <span className="text-sm font-semibold italic text-my-yellow">
                        {order.id}
                      </span>
                    </h2>

                    <p className="text-sm italic md:text-base">
                      Złożone dnia{" "}
                      <span className="text-xs text-gray-700 md:text-sm">
                        {order.purchase_date[0]}
                      </span>
                    </p>

                    <p className="inline-flex items-center gap-2 text-gray-700 md:text-lg">
                      <IoIosCash className="text-xl" />
                      {formatCurrency(sum(order.total_price))}
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
