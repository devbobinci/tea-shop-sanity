import { Recipe } from "@/typings";

export const fetchRecipes = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getRecipes`);
  const data = await res.json();

  const recipes: Recipe[] = data;

  return recipes;
};
