import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

export default async function PopularProducts({ products }: Props) {
  return (
    <div className="mx-auto mt-12 max-w-7xl px-4 md:px-6 xl:px-0">
      <div className="flex justify-between py-2">
        <h2 className="mb-4 text-lg font-bold uppercase md:text-3xl">
          Najchętniej wybierane 🚀
        </h2>
        <button className="hidden text-sm font-bold underline md:inline-block">
          Zobacz Wszystkie
        </button>
      </div>
      {/* Products */}
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
        {products &&
          products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>

      <button className="py-4 text-sm font-bold underline md:hidden">
        Zobacz Wszystkie
      </button>
    </div>
  );
}
