import { NextResponse, NextRequest } from "next/server";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { Product } from "@/typings";
const query = groq`*[_type=='product']{...}`;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const products: Product[] = await client.fetch(query);
    return NextResponse.json(products);
  } catch (error: any) {
    console.log(error);
    throw new Error("Could not get product data", error);
  }
}
