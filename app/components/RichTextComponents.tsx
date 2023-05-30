import Image from "next/image";
import urlFor from "@/lib/urlFor";
import Link from "next/link";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative m-10 mx-auto h-52 w-full">
          <Image
            src={urlFor(value).url()}
            className="inline-block rounded-md object-contain"
            alt="Product Image"
            width={400}
            height={500}
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="featured-product-list mb-5 ml-5 mt-0 w-full list-none space-y-5">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ul className="mt-lg list-decimal">{children}</ul>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="py-8 text-4xl font-bold">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="py-6 text-2xl font-bold">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="py-6 text-xl font-bold text-my-beige">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="py-6 text-lg font-semibold uppercase text-my-beige xl:py-8 xl:text-2xl">
        {children}
      </h4>
    ),

    blockquote: ({ children }: any) => (
      <blockquote className="my-5 border-l-4 py-5 pl-5">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value?.href?.startsWith("/")
        ? "noreferrer noopener"
        : undefined;

      return (
        <Link
          href={value?.href}
          rel={rel}
          className="hover:decoration:black underline decoration-my-yellow"
        >
          {children}
        </Link>
      );
    },
  },
};
