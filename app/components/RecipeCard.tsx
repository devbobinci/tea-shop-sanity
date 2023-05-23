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
      className="group rounded-md bg-white shadow-md"
    >
      <Link href={`/przepis/${slug.current}`}>
        <div className="relative flex h-72 items-center justify-center rounded-t-md bg-my-beige/20">
          <Image
            src={urlFor(image?.asset).url()!}
            width={200}
            height={200}
            alt="Tea"
            className="h-60 w-60 rounded-md object-contain pt-4 transition-all group-hover:h-64 group-hover:w-64"
          />
        </div>
        <div className="rounded-md bg-white p-4">
          <div className="py-2">
            <h3 className="text-lg font-bold transition-all group-hover:underline xl:text-xl">
              {title}
            </h3>
            <p className="line-clamp-1 text-xs text-my-gray xl:text-base">
              {/* {new Date(_createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })} */}
            </p>
          </div>
        </div>
      </Link>
    </m.div>
  );
}
