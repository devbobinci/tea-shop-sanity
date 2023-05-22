import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

type Props = {
  params: {
    slug: string;
  };
};

export default function page({ params: { slug } }: Props) {
  return <div>{slug} - page</div>;
}

export async function generateStaticParams() {
  const query = groq`*[_type == "product"]{slug{current}}`;
  const products = await client.fetch(query);

  return products.map((product: Product) => ({
    slug: product.slug.current,
  }));
}
