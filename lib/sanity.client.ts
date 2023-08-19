import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as string;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION as string;
const sanityToken = process.env.SANITY_API_TOKEN as string;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: sanityToken,
});
