import { NextResponse, NextRequest } from "next/server";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
const query = groq`*[_type=='product']{...}`;

export async function GET(req: NextRequest, res: NextResponse) {
  const products: Product[] = await client.fetch(query);

  return NextResponse.json(products);
}
