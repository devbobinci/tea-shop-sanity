import Image from "next/image";
import Link from "next/link";

import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
import urlFor from "@/lib/urlFor";
import Marquee from "react-fast-marquee";

export default async function Recipes() {
  const recipes = await getRecipes();

  return (
    <div className="mx-auto my-20 max-w-7xl px-4 md:px-6 xl:px-0">
      <h2 className="mb-6 text-center font-playFair text-2xl font-bold md:text-3xl lg:text-4xl">
        Recipes with matcha green teas
      </h2>
      <div className="relative">
        <div className="absolute left-0 top-0 z-[2] h-full w-10 rounded-r-xl bg-white/20 backdrop-blur-sm md:w-16"></div>
        <div className="absolute right-0 top-0 z-[2] h-full w-10 rounded-l-xl bg-white/20 backdrop-blur-sm md:w-16"></div>
        <Marquee direction="right" autoFill pauseOnHover>
          <div className="flex w-full gap-4 rounded-md px-4 lg:gap-8">
            {recipes &&
              recipes.map((recipe: Recipe) => (
                <Link
                  href={`/przepis/${recipe?.slug?.current}`}
                  key={recipe?._id}
                  className="group mb-6 w-52 rounded-md bg-white shadow-md"
                >
                  <div className="h-48 w-52 overflow-hidden">
                    <Image
                      src={urlFor(recipe?.image?.asset).url()}
                      height={200}
                      width={200}
                      alt={recipe?.title}
                      className="h-full w-full rounded-t-md object-cover transition-all group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="line-clamp-2 text-xl font-semibold group-hover:underline">
                      {recipe.title}
                    </h4>
                    <p className="text-my-m-gray">
                      {new Date(recipe._createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}
async function getRecipes() {
  const query = groq`*[_type=="recipe"]{...}| order(_createdAt desc)`;
  const recipes = await client.fetch(query);

  return recipes;
}
