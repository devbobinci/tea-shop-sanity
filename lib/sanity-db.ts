import { request } from "http";
import { groq } from "next-sanity";
import { client } from "./sanity.client";

export async function getBannerImage() {
  const query = groq`*[_type=="bannerImage" && current == true]{image{asset}}`;
  const bannerImage = await client.fetch(query);

  return bannerImage;
}

export async function getPosts() {
  const query = groq`*[_type=="post"][0...3]{...}| order(_createdAt desc)`;
  const posts = await client.fetch(query);

  return posts;
}

export async function getProducts() {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/getProducts`
  // );

  // let data: Product[];

  // try {
  //   data = await res.json();
  // } catch (error: any) {
  //   throw new Error("Can't get all products from db", error);
  // }

  // return data;

  const query = groq`*[_type=='product']{...}`;
  let products: Product[];

  try {
    products = await client.fetch(query);
  } catch (error: any) {
    throw new Error("Can't get single product data from db", error);
  }

  return products;
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
