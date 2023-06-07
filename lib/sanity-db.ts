import { Post, Product } from "@/typings";
import { groq } from "next-sanity";
import { client } from "./sanity.client";

export async function getFeaturedPosts() {
  const query = groq`*[_type=="post"][0...3]{...}| order(_createdAt desc)`;

  let posts: Post[];

  try {
    posts = await client.fetch(query);
  } catch (error) {
    throw new Error("Nie udalo sie zaladowac postow");
  }

  return posts;
}

export async function getSingleProduct(productId: string) {
  const productQuery = groq`*[_type == "product" && slug.current == '${productId}'][0]`;
  let product: Product;
  try {
    product = await client.fetch(productQuery);
  } catch (error: any) {
    throw new Error("Can't get single product data from db", error);
  }
  return product;
}
