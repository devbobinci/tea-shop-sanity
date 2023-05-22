import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity.client";

const builder = imageUrlBuilder(client);

export default function urlFor(source: any) {
  return builder.image(source);
}
