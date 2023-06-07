import { NextResponse, NextRequest } from "next/server";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { Product } from "@/typings";
const query = groq`*[_type=='product']{...}`;

export async function GET(req: NextRequest, res: NextResponse) {
  let products: Product[];

  try {
    products = await client.fetch(query);
  } catch (error: any) {
    throw new Error("Can't get single product data from db", error);
  }

  return NextResponse.json(products);
}
