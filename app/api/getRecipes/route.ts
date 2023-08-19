import { NextResponse, NextRequest } from "next/server";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { Recipe } from "@/typings";
const query = groq`*[_type=="recipe"]{..., author->}| order(_createdAt desc)`;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const recipes: Recipe[] | undefined = await client.fetch(query);
    return NextResponse.json(recipes);
  } catch (error) {
    console.log(error);
    throw new Error("Could not fetch all recipes");
  }
}
