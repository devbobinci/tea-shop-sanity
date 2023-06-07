"use client";

import Image from "next/image";
import Link from "next/link";

import urlFor from "@/lib/urlFor";
import Marquee from "react-fast-marquee";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { fetchRecipes } from "@/lib/fetchRecipes";
import { Recipe } from "@/typings";

export default function Recipes() {
  const { ref: container, inView: containerVisible } = useInView({
    delay: 500,
    triggerOnce: true,
  });

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const getRecipes = async () => {
    const recipes = await fetchRecipes();
    setRecipes(recipes!);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div
      ref={container}
      className={`mx-auto my-20 max-w-7xl overflow-x-hidden px-4 transition-all duration-1000 md:px-6 xl:px-0 ${
        containerVisible ? "opacity-1 block" : "appearance-none opacity-0"
      }`}
    >
      <h2 className="mb-6 text-center font-playFair text-2xl font-bold md:text-3xl lg:text-4xl">
        Przepisy na desery z matcha
      </h2>
      <div className="relative">
        <div className="absolute -left-1 top-0 z-[2] h-full w-10 rounded-r-xl bg-white/20 backdrop-blur-sm md:w-16"></div>
        <div className="absolute -right-1 top-0 z-[2] h-full w-10 rounded-l-xl bg-white/20 backdrop-blur-sm md:w-16"></div>
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
