"use client";

import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";

import { motion as m } from "framer-motion";
import { Post } from "@/typings";

type Props = {
  post: Post;
  big?: boolean;
  postIndex?: number;
};

export default function PostCard({ post, big, postIndex }: Props) {
  return (
    <m.div layout>
      <Link href={`/post/${post?.slug?.current}`}>
        <m.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: postIndex! / 3 }}
          className="group flex h-full flex-col justify-between rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:flex-row"
        >
          <div className="w-full rounded-xl md:w-1/2">
            <Image
              src={urlFor(post?.image?.asset).url()!}
              height={200}
              width={300}
              alt={post?.title}
              className="h-full w-full rounded-t-xl rounded-bl-none object-cover object-center md:rounded-bl-xl md:rounded-tr-none xl:rounded-t-xl xl:rounded-tr-none"
            />
          </div>

          <div className="p-4 md:w-3/5">
            <h3 className="text-lg font-semibold">{post?.title}</h3>
            <p className="py-4 text-sm text-my-m-gray">{post?.description}</p>
            <button className="text-my-beige group-hover:underline">
              Read More
            </button>
            <p className="md:text-md text-xs opacity-30">
              {new Date(post?._createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        </m.div>
      </Link>
    </m.div>
  );
}
