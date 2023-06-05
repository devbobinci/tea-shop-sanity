"use client";

import { ProductCard } from "@/app/components";
import { fetchProdcts } from "@/lib/fetchProducts";

import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

import { AnimatePresence, motion as m } from "framer-motion";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [filterOption, setFilterOption] = useState<string>("");
  const [sortContainer, setSortContainer] = useState(false);

  const fetchProducts = async () => {
    const products = await fetchProdcts();
    setProducts(products);
    setFiltered(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (filterOption === "asc") {
      const filtered = products.sort((a: Product, b: Product) => {
        return b.price - a.price;
      });
      setFiltered(filtered);
    } else if (filterOption === "desc") {
      const filtered = products.sort((a: Product, b: Product) => {
        return a.price - b.price;
      });
      setFiltered(filtered);
    }
  }, [filterOption]);

  return (
    <div className="mx-auto my-24 max-w-7xl px-4 md:px-6 xl:my-32 xl:px-0">
      <div className="flex items-center justify-between">
        <h1 className="my-8 text-center font-playFair text-3xl font-semibold md:text-4xl xl:text-5xl ">
          Nasze produkty 🍵
        </h1>

        <div
          onClick={() => setSortContainer((prev) => !prev)}
          className="relative cursor-pointer select-none rounded-xl border bg-white px-12 py-4 backdrop-blur-sm"
        >
          {/* Select sorting */}
          <h2 className="flex items-center gap-2">
            {!filterOption && "Sortowanie"}
            {filterOption === "desc" && <>Sortowanie rosnąco</>}
            {filterOption === "asc" && <>Sortowanie malejąco</>}
            {sortContainer ? (
              <AiFillCaretDown className="rotate-180 transition-all" />
            ) : (
              <AiFillCaretDown className="transition-all" />
            )}
          </h2>
          {sortContainer && (
            <ul className="absolute left-0 top-16 z-10 w-full select-none flex-col items-center space-y-4 rounded-md border bg-white p-4 shadow-md">
              <li
                onClick={() => setFilterOption("asc")}
                className="cursor-pointer hover:text-my-beige"
              >
                Cena malejąco
              </li>
              <li
                onClick={() => setFilterOption("desc")}
                className="cursor-pointer hover:text-my-beige"
              >
                Cena rosnąco
              </li>
            </ul>
          )}
        </div>
      </div>

      <m.div className="grid-cols my-16 grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
        {filtered?.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            productIndex={products.indexOf(product)}
          />
        ))}
      </m.div>
    </div>
  );
}
