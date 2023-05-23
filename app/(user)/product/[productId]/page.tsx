"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { groq } from "next-sanity";

import { client } from "@/lib/sanity.client";
import urlFor from "@/lib/urlFor";
import { getSingleProduct } from "@/lib/sanity-db";

import { useShoppingCart } from "@/app/context/StateContext";
import { ExtraPhotos, PackageSize } from "@/app/components";
import { RichTextComponents } from "@/app/components/RichTextComponents";

import { TbTruckDelivery, TbCalendarTime } from "react-icons/tb";
import { PortableText } from "@portabletext/react";

export const revalidate = 60;

type Props = {
  params: {
    productId: string;
    slug: string;
  };
};

export default function ProductPage({ params: { productId } }: Props) {
  const { increaseCartQuantity, getItemQuantity, openCart } = useShoppingCart();

  const [currentProduct, setCurrentProduct] = useState<Product>();

  const fetchSingleProduct = async () => {
    const product: Product = await getSingleProduct(productId);

    setCurrentProduct(product);
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const quantity = getItemQuantity(currentProduct?._id!);

  return (
    <div className="mx-auto my-6 max-w-7xl gap-16 px-4 md:my-24 md:px-6 xl:my-32 xl:flex xl:px-0">
      {/* product image div */}
      {currentProduct && (
        <div className="flex flex-col gap-2 md:mx-auto md:w-2/3 lg:gap-6 xl:w-1/2">
          <div className="rounded-2xl bg-my-gray/20">
            <Image
              src={urlFor(currentProduct?.mainImage).url()!}
              height={600}
              width={600}
              alt={currentProduct!.title}
              className="h-full max-h-[300px] w-full object-contain shadow-sm md:max-h-[400px] xl:max-h-[500px]"
            />
          </div>
          {currentProduct?.extraPhotos && (
            <ExtraPhotos photos={currentProduct?.extraPhotos} />
          )}

          <div>
            <PortableText
              value={currentProduct?.body}
              components={RichTextComponents}
            />
          </div>
        </div>
      )}

      {/* Product info div */}
      {currentProduct && (
        <div className="md:mx-auto md:w-2/3 xl:w-1/2">
          <div className="py-6 xl:pb-10 xl:pt-0">
            <h2 className="text-3xl font-bold">{currentProduct?.title}</h2>
            <p className="text-sm text-my-m-gray xl:text-base">
              {currentProduct?.description}
            </p>
          </div>
          {/* reviews */}
          <div></div>
          <hr />
          {/* cena */}
          <h3 className="py-6 text-2xl font-semibold xl:py-10">
            {currentProduct?.newPrice
              ? currentProduct?.newPrice
              : currentProduct?.price}
            {" zł"}
            {currentProduct?.newPrice && (
              <span className="ml-1 text-sm text-[#555] line-through">
                {currentProduct?.price} zł
              </span>
            )}
          </h3>
          <hr />
          {/* package size */}
          <PackageSize packageSize={currentProduct?.packageSize} />
          <hr />
          {/* buttony */}
          {currentProduct?.availability ? (
            <div className="flex justify-between gap-6 py-6 xl:gap-8 xl:py-10">
              <button
                onClick={() => {
                  openCart();
                  increaseCartQuantity(currentProduct._id, currentProduct);
                }}
                className="flex-1 rounded-full bg-my-yellow py-4 font-semibold hover:bg-yellow-500"
              >
                Kup Teraz
              </button>
              <button
                onClick={() =>
                  increaseCartQuantity(currentProduct._id, currentProduct)
                }
                className="flex-1 rounded-full border border-my-yellow bg-white py-4 font-semibold text-my-yellow"
              >
                {!quantity ? "Dodaj do Koszyka" : `W koszyku: ${quantity}`}
              </button>
            </div>
          ) : (
            <div className="py-6 xl:py-10">
              <button className="flex-1 cursor-not-allowed rounded-full border border-my-red bg-white px-4 py-4 font-semibold text-my-red">
                Produkt tymczasowo niedostepny
              </button>
            </div>
          )}

          {/* Delivery info */}
          <div className="rounded-lg border ">
            {/* free delivery */}
            <div className="flex items-center gap-2 border-b p-4">
              <TbTruckDelivery className="text-2xl text-my-red" />
              <div>
                <h5 className="text-lg font-semibold">Darmowa dostawa</h5>
                <p className="text-sm">
                  Szybka dostawa w 2-5 dni.{" "}
                  <Link href="/details" className="underline">
                    Szczegóły
                  </Link>
                </p>
              </div>
            </div>

            <hr className="border-none" />
            {/* return delivery */}
            <div className="flex items-center gap-2 p-4">
              {/* icon */}
              <TbCalendarTime className="text-2xl text-my-red" />
              <div>
                <h5 className="text-lg font-semibold">Podlega zwrotowi</h5>
                <p className="text-sm">
                  Darmowe zwroty przez 30 dni.{" "}
                  <Link href="/details" className="underline">
                    Szczegóły
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const query = groq`*[_type == "product"]{slug{current}}`;

  const products = await client.fetch(query);

  return products.map((product: Product) => ({
    productId: product.slug.current,
  }));
}
