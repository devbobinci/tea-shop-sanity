import { NextResponse, NextRequest } from "next/server";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { Post } from "@/typings";
const query = groq`*[_type=="post"]{...}| order(_createdAt desc)`;

export async function GET(req: NextRequest, res: NextResponse) {
  let posts: Post[] | undefined = [];
  try {
    posts = await client.fetch(query);
  } catch (error) {
    throw new Error("Nie udalo sie zalatowac postow");
  }

  return NextResponse.json(posts);
}
