import { NextResponse, NextRequest } from "next/server";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { Post } from "@/typings";
const query = groq`*[_type=="post"]{...}| order(_createdAt desc)`;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const posts: Post[] | undefined = await client.fetch(query);
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    throw new Error("Could not get posts");
  }
}
