"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { groq } from "next-sanity";

import { client } from "@/lib/sanity.client";
import urlFor from "@/lib/urlFor";
import { getSingleProduct } from "@/lib/sanity-db";

import { useShoppingCart } from "@/app/context/StateContext";
import { ExtraPhotos } from "@/app/components";
import { RichTextComponents } from "@/app/components/RichTextComponents";

import { PortableText } from "@portabletext/react";

import { motion as m, AnimatePresence } from "framer-motion";
import { TbTruckDelivery, TbCalendarTime } from "react-icons/tb";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import toast from "react-hot-toast";
import { Product } from "@/typings";
import Loader from "@/app/components/Loader";

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
  const [currentImage, setCurrentImage] = useState(currentProduct?.mainImage!);

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const [moreText, setMoreText] = useState(false);

  const quantity = getItemQuantity(currentProduct?._id!);

  return (
    <AnimatePresence>
      <div className="mx-auto my-24 max-w-7xl px-4 md:my-32 md:px-6 xl:px-0">
        {/* product image div */}

        {currentProduct ? (
          <div className="gap-16 xl:flex ">
            {currentProduct && (
              <div className="flex flex-col gap-2 md:mx-auto md:w-2/3 lg:gap-6 xl:w-1/2">
                <m.div
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl bg-my-gray/20"
                >
                  {currentProduct && (
                    <Image
                      src={
                        currentImage
                          ? urlFor(currentImage).url()
                          : urlFor(currentProduct?.mainImage).url()
                      }
                      height={600}
                      width={600}
                      alt={currentProduct!.title}
                      className="h-full max-h-[300px] w-full object-contain shadow-sm md:max-h-[400px] xl:max-h-[500px]"
                    />
                  )}
                </m.div>
                {currentProduct?.extraPhotos && (
                  <ExtraPhotos
                    setCurrentImage={setCurrentImage}
                    currentImage={currentImage}
                    photos={currentProduct?.extraPhotos.concat(
                      currentProduct?.mainImage
                    )}
                  />
                )}

                <m.div
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div
                    className={`relative h-64 overflow-y-hidden rounded-md border p-4 pb-8 transition-all duration-1000 xl:p-8 xl:pb-14 ${
                      moreText && "h-full"
                    }`}
                  >
                    <PortableText
                      value={currentProduct?.body}
                      components={RichTextComponents}
                    />
                    <div
                      onClick={() => setMoreText((prev) => !prev)}
                      className="absolute -bottom-2 left-0 flex h-12 w-full justify-center rounded-t-md bg-white/20 py-4 backdrop-blur-sm"
                    >
                      <span className="inline-flex cursor-pointer items-center gap-2 font-playFair text-lg font-semibold">
                        {moreText ? (
                          <>
                            Pokaz mniej...
                            <BsChevronDown className="rotate-180 transition-all duration-500" />
                          </>
                        ) : (
                          <>
                            Pokaz więcej...
                            <BsChevronDown />
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </m.div>
              </div>
            )}

            {/* Product info div */}
            {currentProduct && (
              <div className="md:mx-auto md:w-2/3 xl:w-1/2">
                <m.div
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="py-6 xl:pb-10 xl:pt-0"
                >
                  <h2 className="text-xl font-bold md:text-3xl">
                    {currentProduct?.title}
                  </h2>
                  <p className="text-xs text-my-m-gray md:text-sm xl:text-base">
                    {currentProduct?.description}
                  </p>
                </m.div>
                {/* reviews */}
                <hr />
                {/* cena */}
                <m.h3
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="py-6 text-2xl font-semibold xl:py-10"
                >
                  {currentProduct?.newPrice
                    ? currentProduct?.newPrice
                    : currentProduct?.price}
                  {" zł"}
                  {currentProduct?.newPrice && (
                    <span className="ml-1 text-sm text-[#555] line-through">
                      {currentProduct?.price} zł
                    </span>
                  )}
                </m.h3>
                <hr />

                {/* buttony */}
                {currentProduct?.availability ? (
                  <m.div
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="flex justify-between gap-6 py-6 xl:gap-8 xl:py-10"
                  >
                    <button
                      onClick={() => {
                        openCart();
                        increaseCartQuantity(
                          currentProduct._id,
                          currentProduct
                        );
                        toast.success(
                          `${currentProduct?.title} dodano do koszyka`
                        );
                      }}
                      className="flex-1 rounded-full bg-my-yellow py-4 text-sm font-semibold hover:bg-yellow-500 md:text-base"
                    >
                      Kup Teraz
                    </button>
                    <button
                      onClick={() => {
                        increaseCartQuantity(
                          currentProduct._id,
                          currentProduct
                        );
                        toast.success(
                          `${currentProduct?.title} dodano do koszyka`
                        );
                      }}
                      className="flex-1 rounded-full border border-my-yellow bg-white py-4 text-sm font-semibold text-my-yellow md:text-base"
                    >
                      {!quantity
                        ? "Dodaj do Koszyka"
                        : `W koszyku: ${quantity}`}
                    </button>
                  </m.div>
                ) : (
                  <m.div
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="py-6 xl:py-10"
                  >
                    <button className="flex-1 cursor-not-allowed rounded-full border border-my-red bg-white px-4 py-4 text-sm font-semibold text-my-red md:text-base">
                      Produkt tymczasowo niedostepny
                    </button>
                  </m.div>
                )}

                {/* Delivery info */}
                <m.div
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="rounded-lg border "
                >
                  {/* free delivery */}
                  <div className="flex items-center gap-2 border-b p-4">
                    <TbTruckDelivery className="text-2xl text-my-red" />
                    <div>
                      <h5 className="text-base font-semibold md:text-lg">
                        Darmowa dostawa
                      </h5>
                      <p className="text-xs md:text-sm">
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
                      <h5 className="text-base font-semibold md:text-lg">
                        Podlega zwrotowi
                      </h5>
                      <p className="text-xs md:text-sm">
                        Darmowe zwroty przez 30 dni.{" "}
                        <Link href="/details" className="underline">
                          Szczegóły
                        </Link>
                      </p>
                    </div>
                  </div>
                </m.div>
              </div>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </AnimatePresence>
  );
}

export async function generateStaticParams() {
  const query = groq`*[_type == "product"]{slug{current}}`;

  const products = await client.fetch(query);

  return products.map((product: Product) => ({
    productId: product.slug.current,
  }));
}
