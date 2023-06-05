"use client";

import { auth } from "@/app/utilities/firebase";
import { child, get, getDatabase, ref } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { useEffect, useState, useRef } from "react";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";

import { RxCopy } from "react-icons/rx";
import toast from "react-hot-toast";
import Link from "next/link";
import urlFor from "@/lib/urlFor";
import Image from "next/image";
import { formatCurrency } from "@/app/utilities/formatCurrency";
import { MdDone } from "react-icons/md";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

type OrderedProduct = {
  price: number;
  name: string;
  quantity: number;
  purchase_date: string;
  mainImage: MainImage;
  slug: Slug;
};

function sum(array: any) {
  let sum = 0;

  array.forEach((item: number) => {
    sum += item;
  });
  return sum;
}

export default function OrderPage({ params: { slug } }: Props) {
  const [order, setOrder] = useState<OrderedProduct[]>([]);
  const [user, loading] = useAuthState(auth);
  const [value, copy] = useCopyToClipboard();

  const db = getDatabase();
  function getOrderedProduct() {
    const dbRef = ref(db);

    get(child(dbRef, `users/${user?.uid}/orders/${slug}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setOrder(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    db && getOrderedProduct();
  }, [user]);

  return (
    <div className="mx-auto my-24 max-w-7xl px-4 md:px-6 xl:my-32 xl:px-0">
      <div className="mx-auto max-w-5xl rounded-md bg-white p-4 shadow-md xl:p-8">
        <h1 className="text-center text-2xl font-semibold uppercase md:text-3xl">
          Dane zamówienia
        </h1>

        <div className="my-8 flex flex-col gap-4 md:flex-row md:justify-between">
          <div>
            Numer zamówienia{" "}
            {!value ? (
              <RxCopy
                onClick={() => copy(slug)}
                className="inline cursor-pointer text-xl text-gray-700 hover:text-black"
              />
            ) : (
              <MdDone className="inline cursor-pointer text-xl text-gray-700 hover:text-black" />
            )}
            <p className="block">{slug}</p>
          </div>

          <div>Data zamówienia {order[0]?.purchase_date}</div>
        </div>

        <hr className="mb-4" />

        <div className="my-4">
          <h2 className="text-xl font-semibold">Zamówione produkty</h2>

          <div className="my-8 flex flex-col gap-4">
            {order.map((order: OrderedProduct) => (
              <Link key={order.name} href={`/product/${order.slug.current}`}>
                <div className="flex gap-6">
                  <Image
                    src={urlFor(order.mainImage).url()}
                    height={200}
                    width={200}
                    alt={order.name}
                    className="h-24 w-24 rounded-md bg-my-m-gray/10 object-contain shadow-sm md:h-28 md:w-28"
                  />
                  <div className="space-y-2">
                    <h3 className="font-semibold md:text-lg">{order.name}</h3>
                    <h4 className="text-xs italic md:text-sm">
                      {order.quantity}{" "}
                      {order.quantity === 1 ? "sztuka" : "sztuki"}
                    </h4>
                    <h4>{formatCurrency(order.price)}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <hr className="mb-4" />
          <h2 className="text-lg md:text-xl">
            Całkowita wartość zamówienia:{" "}
            <span className="font-semibold">
              {formatCurrency(sum(order.map((o) => o.price)))}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

// Firebase get item props funciton
// export async function generateStaticParams() {}
