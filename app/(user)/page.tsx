"use client";

import { Toaster } from "react-hot-toast";
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

import { getProducts } from "@/lib/sanity-db";
import { useEffect, useState } from "react";

export const revalidate = 60;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
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
      <Toaster
        toastOptions={{
          style: {
            zIndex: 200,
          },
        }}
        containerStyle={{
          bottom: 0,
        }}
      />
      {/* @ts-expect-error Server Component */}
      {bannerImage && <HeroBanner bannerImage={bannerImage} />}
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
