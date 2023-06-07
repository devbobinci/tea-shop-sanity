"use client";

import {
  Benefits,
  BlogArticles,
  BrandReview,
  Footer,
  HeroBanner,
  MainProduct,
  PopularProducts,
  Recipes,
} from "../components";

import { fetchProducts } from "@/lib/fetchProducts";
import { useEffect, useState } from "react";
import { Product } from "@/typings";

export const revalidate = 60;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const products = await fetchProducts();
    setProducts(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const bannerImage = products.find((product) => product.bannerImage === true);
  const featuredProduct = products.find(
    (product) => product.featuredProduct === true
  );
  const selectedProducts = products
    .filter((product) => product.featuredProduct === false)
    .slice(0, 4);

  return (
    <div className="xl:mt-16">
      {/* @ts-expect-error Server Component */}
      <HeroBanner bannerImage={bannerImage} />
      {selectedProducts && <PopularProducts products={selectedProducts} />}
      <Benefits />
      <BrandReview />
      {featuredProduct && <MainProduct product={featuredProduct!} />}
      <Recipes />
      <BlogArticles />
      <Footer />
    </div>
  );
}
