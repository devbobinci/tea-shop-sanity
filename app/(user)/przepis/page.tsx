"use client";

import { getRecipes } from "@/lib/sanity-db";
import RecipeCard from "@/app/components/RecipeCard";

import { useEffect, useState } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async () => {
    const recipes = await getRecipes();
    setRecipes(recipes!);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="mx-auto my-24 max-w-7xl px-4 md:px-6 xl:my-32 xl:px-0">
      <h1 className="my-8 text-center font-playFair text-3xl font-semibold md:text-4xl xl:text-5xl ">
        Przepisy z matcha 🍵
      </h1>

      <div className="grid-cols grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
        {recipes?.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            recipeIndex={recipes.indexOf(recipe)}
          />
        ))}
      </div>
    </div>
  );
}
