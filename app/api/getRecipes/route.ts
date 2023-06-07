import { NextResponse, NextRequest } from "next/server";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { Recipe } from "@/typings";
const query = groq`*[_type=="recipe"]{..., author->}| order(_createdAt desc)`;

export async function GET(req: NextRequest, res: NextResponse) {
  let recipes: Recipe[] | undefined = [];
  try {
    recipes = await client.fetch(query);
  } catch (error) {
    throw new Error("Nie udalo sie zalatowac postow");
  }

  return NextResponse.json(recipes);
}
