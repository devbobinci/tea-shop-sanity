"use client";

import { ProductCard } from "@/app/components";
import { fetchProducts } from "@/lib/fetchProducts";

import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "@react-icons/all-files/ai/AiFillCaretDown";

import { AnimatePresence, motion as m } from "framer-motion";
import { Product } from "@/typings";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [filterOption, setFilterOption] = useState<string>("");
  const [sortContainer, setSortContainer] = useState(false);

  const getProducts = async () => {
    const products = await fetchProducts();
    setProducts(products);
    setFiltered(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (filterOption === "desc") {
      const filtered = products.sort((a: Product, b: Product) => {
        return b.price - a.price;
      });

      setFiltered(filtered);
    } else if (filterOption === "asc") {
      const filtered = products.sort((a: Product, b: Product) => {
        return a.price - b.price;
      });
      setFiltered(filtered);
    }
    setSortContainer(false);
  }, [filterOption, filtered]);

  return (
    <div className="mx-auto my-24 max-w-7xl px-6 md:px-8 xl:my-32 xl:px-0">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <m.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="my-8 text-center font-playFair text-3xl font-semibold md:text-4xl xl:text-5xl "
        >
          Nasze produkty 🍵
        </m.h1>

        <div
          onClick={() => setSortContainer(true)}
          className="md:text-md relative cursor-pointer select-none rounded-xl border bg-white px-6 py-2 text-sm md:px-12 md:py-4"
        >
          {/* Select sorting */}
          <h2 className="flex items-center gap-2">
            {!filterOption && "Sortowanie"}
            {filterOption === "asc" && <>Sortowanie rosnąco</>}
            {filterOption === "desc" && <>Sortowanie malejąco</>}
            {sortContainer ? (
              <AiFillCaretDown className="rotate-180 transition-all" />
            ) : (
              <AiFillCaretDown className="transition-all" />
            )}
          </h2>
          {sortContainer && (
            <m.ul
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute left-0 top-16 z-10 w-full select-none flex-col items-center space-y-4 rounded-md border bg-white p-4 shadow-md"
            >
              <m.li
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                onClick={() => setFilterOption("desc")}
                className="cursor-pointer hover:text-my-beige"
              >
                Cena malejąco
              </m.li>
              <m.li
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.2 }}
                onClick={() => setFilterOption("asc")}
                className="cursor-pointer hover:text-my-beige"
              >
                Cena rosnąco
              </m.li>
            </m.ul>
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
