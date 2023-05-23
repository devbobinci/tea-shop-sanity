import Image from "next/image";
import { groq } from "next-sanity";

import urlFor from "@/lib/urlFor";
import { client } from "@/lib/sanity.client";
import { getRecipes } from "@/lib/sanity-db";

import { PortableText } from "@portabletext/react";

import { RichTextComponents } from "@/app/components/RichTextComponents";
import { Recipes } from "@/app/components";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export default async function RecipePage({ params: { slug } }: Props) {
  const recipes = await getRecipes();
  const recipe = recipes?.find((recipe) => recipe?.slug?.current === slug);

  return (
    <div className="mx-auto my-24 max-w-7xl px-4 md:px-6 xl:my-32 xl:px-0">
      {recipe && (
        <div className="mx-auto md:w-2/3 xl:w-full">
          <div className="gap-16 xl:flex">
            <div className=" xl:w-1/2">
              <Image
                src={urlFor(recipe?.image?.asset).url()}
                width={600}
                height={600}
                alt={recipe?.title!}
                className="h-80 w-full rounded-md object-cover lg:h-[420px] xl:h-[500px]"
              />

              <div className="my-8">
                <h2 className=" font-playFair text-2xl font-bold">
                  {recipe?.title}
                </h2>
                <div className="flex items-center gap-2 xl:gap-4">
                  <p className="text-sm italic  text-my-m-gray xl:text-base">
                    {new Date(recipe?.datePublished!).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }
                    )}
                  </p>
                  {recipe?.author && (
                    <div className="flex items-center gap-2">
                      <Image
                        src={urlFor(recipe?.author?.image?.asset).url()}
                        height={50}
                        width={50}
                        alt={recipe?.author?.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <p className="font-playFair text-sm text-my-yellow">
                        {recipe?.author?.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="my-8 xl:my-0 xl:w-1/2">
              <h2 className="text-2xl font-semibold">
                Przepis na {recipe?.title}
              </h2>

              <PortableText
                value={recipe?.body!}
                components={RichTextComponents}
              />
            </div>
          </div>
        </div>
      )}
      {/* @ts-expect-error Server Component */}
      {recipe && <Recipes />}
    </div>
  );
}

export async function generateStaticParams() {
  const query = groq`*[_type == "recipe"]{slug{current}}`;
  const products = await client.fetch(query);

  return products.map((product: Product) => ({
    slug: product.slug.current,
  }));
}
