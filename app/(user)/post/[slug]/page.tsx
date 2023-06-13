"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";
import { fetchPosts } from "@/lib/fetchPosts";
import urlFor from "@/lib/urlFor";

import { RichTextComponents } from "@/app/components/RichTextComponents";
import { PortableText } from "@portabletext/react";

import { motion as m, AnimatePresence } from "framer-motion";

import { Post } from "@/typings";
import CommentsForm from "@/app/components/CommentsForm";
import Comments from "@/app/components/Comments";
import { ClipLoader } from "react-spinners";
import Loader from "@/app/components/Loader";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export default function BlogPage({ params: { slug } }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);

  const [submitted, setSubmitted] = useState(false);

  const getPosts = async () => {
    const posts = await fetchPosts();
    setPosts(posts!);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const post = posts?.find((post) => post?.slug?.current === slug);

  const filteredPosts = posts?.filter(
    (p) => p?.slug?.current !== post?.slug?.current
  );

  return (
    <AnimatePresence>
      <div className="relative mx-auto my-24 max-w-7xl px-6 md:px-8 xl:my-32 xl:px-0">
        {post ? (
          <div className="justify-between gap-16 xl:flex">
            <m.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mx-auto text-center md:w-[500px] lg:w-2/3 xl:ml-0 xl:w-2/3"
            >
              {post?.image && (
                <Image
                  src={urlFor(post?.image?.asset).url()!}
                  height={500}
                  width={500}
                  alt={post?.title!}
                  className="inline-block w-full rounded-xl md:my-8"
                />
              )}

              <m.div
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-center xl:text-left"
              >
                <h2 className="text-2xl font-bold xl:text-3xl">
                  {post?.title}
                </h2>
                <p className="text-sm text-my-m-gray xl:text-base">
                  {new Date(post?._createdAt!).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              </m.div>

              <div className="mx-auto text-center md:w-[500px] lg:w-2/3 xl:w-full xl:text-left">
                <m.p
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="py-8 xl:pt-0"
                >
                  {post?.description}
                </m.p>
                <hr />
                <m.div
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <PortableText
                    value={post?.body!}
                    components={RichTextComponents}
                  />
                </m.div>
              </div>

              <div className="hidden xl:block">
                {post && (
                  <CommentsForm
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                    postId={post?._id!}
                  />
                )}
              </div>

              <div className="hidden xl:block">
                {post && <Comments post={post!} />}
              </div>
            </m.div>

            <div className="block xl:hidden">
              {post && (
                <CommentsForm
                  submitted={submitted}
                  setSubmitted={setSubmitted}
                  postId={post?._id!}
                />
              )}
            </div>

            <div className="block xl:hidden">
              {post && <Comments post={post!} />}
            </div>
            {/* Powiazane posty */}
            <m.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="top-20 mx-auto h-full md:w-[500px] lg:w-2/3 xl:sticky xl:w-1/5"
            >
              <h2 className="my-8 text-2xl font-bold">Powiązane Posty 📪</h2>
              <div className="flex justify-between gap-2 md:flex xl:flex-col xl:space-y-8">
                {filteredPosts &&
                  filteredPosts?.map((post) => (
                    <Link
                      href={`/post/${post?.slug?.current}`}
                      key={post?._id}
                      className="group flex w-1/3 flex-col gap-4 rounded-md bg-white p-4 shadow-md hover:shadow-lg xl:w-full xl:p-8"
                    >
                      <Image
                        src={urlFor(post?.image.asset).url()}
                        width={200}
                        height={200}
                        alt={post?.title}
                        className="h-40 w-full rounded-md object-cover"
                      />
                      <div>
                        <h3 className="font-semibold group-hover:underline">
                          {post.title}
                        </h3>
                        <p className="line-clamp-2 text-my-m-gray">
                          {post.description}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </m.div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </AnimatePresence>
  );
}

export async function generateStaticParams() {
  const query = groq`*[_type == "post"]{slug{current}}`;

  const posts = await client.fetch(query);

  return posts.map((post: Post) => ({
    slug: post.slug.current,
  }));
}
