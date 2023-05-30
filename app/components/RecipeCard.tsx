"use client";

import Link from "next/link";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { motion as m } from "framer-motion";

type Props = {
  recipe: Recipe;
  recipeIndex: number;
};

export default function RecipeCard({
  recipe: { title, image, _id, author, _createdAt, slug },
  recipeIndex,
}: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: recipeIndex / 3 }}
      className="group rounded-md bg-white shadow-md transition-all hover:shadow-xl"
    >
      <Link href={`/przepis/${slug.current}`}>
        <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-t-md bg-my-beige/20">
          <Image
            src={urlFor(image?.asset).url()!}
            width={500}
            height={500}
            alt="Tea"
            className="h-full w-full rounded-md object-cover transition-all group-hover:scale-105"
          />
        </div>
        <div className="flex items-center justify-between rounded-md bg-white p-4">
          <div className="py-2">
            <h3 className="text-lg font-bold transition-all group-hover:underline xl:text-xl">
              {title}
            </h3>
            <p className="line-clamp-1 text-xs text-my-gray xl:text-base">
              {new Date(_createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-2 md:flex-col">
            <Image
              src={urlFor(author?.image?.asset).url()}
              height={100}
              width={100}
              alt={author?.name}
              className="h-8 w-8 rounded-full object-contain"
            />
            <p className="italic text-my-yellow hover:text-gray-700">
              {author?.name}
            </p>
          </div>
        </div>
      </Link>
    </m.div>
  );
}
