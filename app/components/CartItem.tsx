"use client";

import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";

import { useShoppingCart } from "../context/StateContext";
import { formatCurrency } from "../utilities/formatCurrency";

import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineMinus } from "@react-icons/all-files/ai/AiOutlineMinus";
import { Product } from "@/typings";

type CartItemProps = {
  products: Product[];
  itemId: number;
  item: {
    id: number;
    quantity: number;
  };
};

export default function CartItem({ itemId, item, products }: CartItemProps) {
  const {
    removeFromCart,
    decreaseCartQuantity,
    increaseCartQuantity,
    getItemQuantity,
    closeCart,
  } = useShoppingCart();

  if (itemId === null || itemId === undefined) return null;
  const product = products.find((product) => product._id === itemId);
  const quantity = getItemQuantity(product?._id!);

  const cartItemProduct = {
    ...item,
    ...product!,
  };

  return (
    <div className="relative my-8 flex items-center justify-between gap-4 xl:gap-8">
      <Link
        onClick={closeCart}
        href={`/product/${cartItemProduct?.slug?.current}`}
        className="flex items-center justify-center gap-4 rounded-md bg-white/20"
      >
        {cartItemProduct?.mainImage && (
          <Image
            src={urlFor(cartItemProduct?.mainImage?.asset).url()!}
            width={150}
            height={100}
            className="h-16 w-16 object-contain md:h-32 md:w-32"
            alt={cartItemProduct?.title!}
          />
        )}

        <div className="group flex flex-1 flex-col justify-between lg:flex-row lg:items-center">
          <div className="">
            {/* title */}
            <div className="flex items-center gap-2">
              <h3 className="line-clamp-1 text-base font-semibold group-hover:underline md:line-clamp-3 md:text-xl">
                {cartItemProduct?.title}
              </h3>
              <div className="text-sm xl:text-base">
                {item?.quantity > 1 && (
                  <span className="inline-block">
                    x{cartItemProduct?.quantity}
                  </span>
                )}
              </div>
            </div>
            <div className="text-xs text-my-d-gray xl:text-sm">
              {cartItemProduct.newPrice
                ? formatCurrency(cartItemProduct?.newPrice!)
                : formatCurrency(cartItemProduct?.price!)}
            </div>
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-0 md:flex-row md:items-center md:gap-2">
        <p className="my-2 flex h-fit w-fit items-center gap-4 rounded-full bg-white/20 px-4 py-2 shadow-md lg:mx-2 lg:my-0  2xl:flex-row">
          <span
            onClick={() =>
              decreaseCartQuantity(cartItemProduct?._id!, cartItemProduct)
            }
            className="minus cursor-pointer text-base font-semibold text-red-500 hover:scale-125 xl:text-lg"
          >
            <AiOutlineMinus />
          </span>
          <span className="num text-base font-semibold xl:text-lg">
            {quantity}
          </span>
          <span
            onClick={() =>
              increaseCartQuantity(cartItemProduct?._id!, cartItemProduct)
            }
            className="plus cursor-pointer text-base font-semibold text-emerald-500 hover:scale-125 xl:text-lg"
          >
            <AiOutlinePlus />
          </span>
        </p>

        <div className="flex items-center gap-2">
          <div className="text-base font-semibold xl:text-lg">
            {cartItemProduct.newPrice
              ? formatCurrency(
                  cartItemProduct?.newPrice! * cartItemProduct?.quantity!
                )
              : formatCurrency(
                  cartItemProduct?.price! * cartItemProduct?.quantity!
                )}
          </div>

          <button
            className="right-0 top-0 h-10 w-8 rounded-md text-2xl text-my-red lg:static lg:translate-y-0"
            onClick={() => removeFromCart(itemId)}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
