"use client";

import PostCard from "@/app/components/PostCard";
import { getPosts } from "@/lib/sanity-db";
import { useState, useEffect } from "react";

import { AiFillCaretDown } from "react-icons/ai";

export default function PostPage() {
  // const posts = await getPosts();
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const posts = await getPosts();
    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log(posts.map((p) => p._createdAt));
  }, [posts]);

  const todaysDate: any = new Date();

  function sortAsc() {
    const newestPosts = posts?.sort((a: Post, b: Post) => {
      return Date.parse(a._createdAt) - Date.parse(b._createdAt);
    });

    setPosts(newestPosts);
  }

  function sortDesc() {
    const oldestPosts = posts?.sort((a: Post, b: Post) => {
      return Date.parse(b._createdAt) - Date.parse(a._createdAt);
    });
    setPosts(oldestPosts);
  }

  return (
    <div className="mx-auto my-24 max-w-7xl px-4 md:px-6 xl:my-32 xl:px-0">
      <div className="flex items-center justify-between">
        <h1 className="my-8 text-center font-playFair text-3xl font-semibold md:text-4xl xl:text-5xl ">
          Posty 📝
        </h1>

        <div className="relative rounded-xl border bg-white px-12 py-4 backdrop-blur-sm">
          {/* Select date */}
          <h2 className="flex cursor-pointer items-center gap-2">
            Sortowanie <AiFillCaretDown />
          </h2>
          <ul className="absolute left-0 top-16 z-[1] w-full flex-col items-center space-y-4 bg-white p-4 shadow-md">
            <li
              onClick={() => sortAsc()}
              className="cursor-pointer hover:text-my-beige"
            >
              Data: najnowsze
            </li>
            <li
              onClick={() => {
                sortDesc();
              }}
              className="cursor-pointer hover:text-my-beige"
            >
              Data: najstarsze
            </li>
          </ul>
        </div>
      </div>

      <div className="grid-cols grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-8">
        {posts?.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            postIndex={posts.indexOf(post)}
          />
        ))}
      </div>
    </div>
  );
}
