"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { groq } from "next-sanity";
import urlFor from "@/lib/urlFor";
import { client } from "@/lib/sanity.client";
import { fetchRecipes } from "@/lib/fetchRecipes";

import { RichTextComponents } from "@/app/components/RichTextComponents";
import { Recipes } from "@/app/components";

import { PortableText } from "@portabletext/react";
import { AnimatePresence, motion as m } from "framer-motion";
import { Product, Recipe } from "@/typings";
import Loader from "@/app/components/Loader";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export default async function RecipePage({ params: { slug } }: Props) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const getRecipes = async () => {
    const recipes = await fetchRecipes();
    setRecipes(recipes!);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const recipe = recipes?.find((recipe) => recipe?.slug?.current === slug);

  return (
    <AnimatePresence>
      <div className="mx-auto my-24 max-w-7xl px-6 md:px-8 lg:my-32 xl:px-0">
        {recipe ? (
          <div>
            {recipe && (
              <div className="mx-auto md:w-2/3 xl:w-full">
                <div className="gap-16 xl:flex">
                  <m.div
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="xl:w-1/2"
                  >
                    <Image
                      src={urlFor(recipe?.image?.asset).url()}
                      width={600}
                      height={600}
                      alt={recipe?.title!}
                      className="h-80 w-full rounded-md object-cover lg:h-[420px] xl:h-[500px]"
                    />

                    <m.div
                      initial={{ y: -15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="my-8"
                    >
                      <h2 className=" font-playFair text-2xl font-bold">
                        {recipe?.title}
                      </h2>
                      <m.div
                        initial={{ y: -15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="flex items-center gap-2 xl:gap-4"
                      >
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
                      </m.div>
                    </m.div>
                  </m.div>

                  <m.div
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.45 }}
                    className="my-8 xl:my-0 xl:w-1/2"
                  >
                    <h2 className="font-italic text-3xl font-semibold">
                      Przepis na {recipe?.title}
                    </h2>

                    <m.div
                      initial={{ y: -15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <PortableText
                        value={recipe?.body!}
                        components={RichTextComponents}
                      />
                    </m.div>
                  </m.div>
                </div>
              </div>
            )}
            <m.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {recipe && <Recipes />}
            </m.div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </AnimatePresence>
  );
}

export async function generateStaticParams() {
  const query = groq`*[_type == "recipe"]{slug{current}}`;
  const products = await client.fetch(query);

  return products.map((product: Product) => ({
    slug: product.slug.current,
  }));
}
