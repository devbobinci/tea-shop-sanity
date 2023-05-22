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
} from "./components";

export default function Home() {
  return (
    <div className="xl:mt-16">
      {/* Navbar & InfoBanner = Layout.tsx */}
      {/* @ts-expect-error Server Component */}
      <HeroBanner />
      {/* @ts-expect-error Server Component */}
      <PopularProducts />
      <Benefits />
      <BrandReview />
      <MainProduct />
      {/* @ts-expect-error Server Component */}
      <Recipes />
      {/* @ts-expect-error Server Component */}
      <BlogArticles />
      <Footer />
    </div>
  );
}
