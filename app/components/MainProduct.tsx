"use client";

import urlFor from "@/lib/urlFor";
import Image from "next/image";
import { useShoppingCart } from "../context/StateContext";
import { RichTextComponents } from "./RichTextComponents";

import { PortableText } from "@portabletext/react";
import { useInView } from "react-intersection-observer";
import { BiCart } from "@react-icons/all-files/bi/BiCart";
import { BsChevronRight } from "@react-icons/all-files/bs/BsChevronRight";
import { Product } from "@/typings";

type Props = {
  product: Product;
};

export default function MainProduct({ product }: Props) {
  const { ref: container, inView: containerVisible } = useInView({
    triggerOnce: true,
    delay: 500,
  });

  const { increaseCartQuantity, getItemQuantity, openCart } = useShoppingCart();

  const quantity = getItemQuantity(product?._id);

  return (
    <div
      ref={container}
      className={`mx-auto my-16 flex max-w-7xl flex-col items-center gap-6 px-4 transition-all duration-1000 md:flex-row md:justify-between md:gap-8 md:px-6 xl:p-0 ${
        containerVisible ? "opacity-1 block" : "appearance-none opacity-0"
      }`}
    >
      <div className="md:w-1/2">
        <Image
          src={urlFor(product?.mainImage?.asset).url()}
          alt={product?.title}
          width={300}
          height={400}
          className="w-full xl:w-5/6"
        />
      </div>

      <div className="flex flex-col items-center md:block md:w-1/2">
        <h2 className="font-playFair text-2xl font-bold md:text-3xl lg:text-3xl">
          {product.title}
        </h2>
        <div className="my-4 space-y-4 text-center md:text-left">
          <p className="text-my-m-gray">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            natus.
          </p>
          <p className="text-my-m-gray">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
            obcaecati esse voluptates nulla pariatur eligendi minus reiciendis
            neque blanditiis consequatur.
          </p>
        </div>

        <PortableText value={product?.body} components={RichTextComponents} />

        <h3 className="py-2 text-2xl font-semibold">
          {product?.newPrice ? product?.newPrice : product?.price}
          {" zł"}
          {product?.newPrice && (
            <span className="ml-1 text-sm text-[#555] line-through">
              {product?.price} zł
            </span>
          )}
        </h3>

        <button
          onClick={() => {
            increaseCartQuantity(product._id, product);
            openCart();
          }}
          className="my-6 flex items-center gap-2 rounded-md bg-my-yellow px-4 py-2 text-sm font-semibold transition-all hover:scale-110 lg:px-6 lg:py-3 lg:text-base"
        >
          {quantity >= 1 ? (
            <span className="flex items-center gap-2">
              W Koszyku {`(${quantity})`} <BiCart className="text-xl" />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Kup Teraz <BsChevronRight />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
