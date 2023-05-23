import { ProductCard } from "@/app/components";
import { getProducts } from "@/lib/sanity-db";
import React from "react";

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="mx-auto my-24 max-w-7xl px-4 md:px-6 xl:my-32 xl:px-0">
      <h1 className="my-8 text-center font-playFair text-3xl font-semibold md:text-4xl xl:text-5xl ">
        Nasze produkty 🍵
      </h1>

      <div className="grid-cols grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
        {products?.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            productIndex={products.indexOf(product)}
          />
        ))}
      </div>
    </div>
  );
}