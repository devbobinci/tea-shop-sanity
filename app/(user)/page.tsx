import { Toaster } from "react-hot-toast";
import {
  Benefits,
  BlogArticles,
  BrandReview,
  // CustomersReview,
  Footer,
  HeroBanner,
  MainProduct,
  PopularProducts,
  Recipes,
} from "../components";

import { getProducts } from "@/lib/sanity-db";

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();
  const bannerImage = products.find((product) => product.bannerImage === true);
  const featuredProduct = products.find(
    (product) => product.featuredProduct === true
  );
  const selectedProducts = products
    .filter((product) => product.featuredProduct === false)
    .slice(0, 4);

  return (
    <div className="xl:mt-16">
      <Toaster />
      {/* Navbar & InfoBanner = Layout.tsx */}
      {/* @ts-expect-error Server Component */}
      <HeroBanner bannerImage={bannerImage} />
      {/* @ts-expect-error Server Component */}
      <PopularProducts products={selectedProducts} />
      <Benefits />
      <BrandReview />
      <MainProduct product={featuredProduct!} />
      {/* @ts-expect-error Server Component */}
      <Recipes />
      {/* @ts-expect-error Server Component */}
      <BlogArticles />
      <Footer />
    </div>
  );
}
