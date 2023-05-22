import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { getPosts } from "@/lib/sanity-db";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import product from "@/schemas/product";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/app/components/RichTextComponents";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

export default async function BlogPage({ params: { slug } }: Props) {
  const posts = await getPosts();
  const post = posts?.find((post) => post?.slug?.current === slug);

  const filteredPosts = posts?.filter(
    (p) => p?.slug?.current !== post?.slug?.current
  );

  return (
    <div className="relative mx-auto my-24 max-w-7xl justify-between gap-16 px-4 md:px-6 xl:flex xl:px-0">
      <div className="mx-auto text-center md:w-[500px] xl:ml-0 xl:w-2/3">
        <Image
          src={urlFor(post?.image?.asset).url()!}
          height={500}
          width={500}
          alt={post?.title!}
          className="inline-block w-full rounded-xl md:my-8"
        />

        <div className="text-center xl:text-left">
          <h2 className="text-2xl font-bold xl:text-3xl">{post?.title}</h2>
          <p className="text-sm text-my-m-gray xl:text-base">
            {new Date(post?._createdAt!).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
        </div>

        <div className="mx-auto text-center md:w-[500px] xl:w-full xl:text-left">
          <p className="py-8 xl:pt-0">{post?.description}</p>
          <hr />
          <PortableText value={post?.body!} components={RichTextComponents} />
        </div>
      </div>

      {/* Powiazane posty */}
      <div className="relative mx-auto h-full md:w-[500px] xl:w-1/5">
        <h2 className="my-8 text-2xl font-bold">Powiązane Posty 📪</h2>
        <div className="gap-2 md:flex xl:flex-col xl:space-y-8">
          {filteredPosts &&
            filteredPosts?.map((post) => (
              <Link
                href={`/post/${post?.slug?.current}`}
                key={post?._id}
                className="group flex flex-col gap-4 rounded-md bg-white p-4 shadow-md hover:shadow-lg xl:p-8"
              >
                <Image
                  src={urlFor(post?.image.asset).url()}
                  width={200}
                  height={200}
                  alt={post?.title}
                  className="h-40 w-full rounded-md object-cover"
                />
                <div>
                  <h3 className="font-semibold group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-my-m-gray">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const query = groq`*[_type == "product"]{slug{current}}`;

  const products = await client.fetch(query);

  return products.map((product: Product) => ({
    slug: product.slug.current,
  }));
}
