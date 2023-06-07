"use client";

import { fetchRecipes } from "@/lib/fetchRecipes";
import RecipeCard from "@/app/components/RecipeCard";

import { useEffect, useState } from "react";
import { Recipe } from "@/typings";

export const revalidate = 60;

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const getRecipes = async () => {
    const recipes = await fetchRecipes();
    setRecipes(recipes!);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="mx-auto my-24 max-w-7xl px-6 md:px-8 lg:my-32 xl:px-0">
      <h1 className="my-8 text-center font-playFair text-3xl font-semibold md:text-4xl xl:text-5xl ">
        Przepisy z matcha 🍵
      </h1>

      <div className="grid-cols grid gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
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
