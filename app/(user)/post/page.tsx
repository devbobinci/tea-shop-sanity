"use client";

import PostCard from "@/app/components/PostCard";
import { fetchPosts } from "@/lib/fetchPosts";
import { useState, useEffect } from "react";

import { AiFillCaretDown } from "@react-icons/all-files/ai/AiFillCaretDown";

import { motion as m } from "framer-motion";
import { Post } from "@/typings";

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [filterOption, setFilterOption] = useState<string>("");
  const [sortContainer, setSortContainer] = useState(false);

  const getPosts = async () => {
    const posts = await fetchPosts();
    setPosts(posts);
    setFilteredPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (filterOption === "desc") {
      const filtered = posts.sort((a: Post, b: Post) => {
        return (
          new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
        );
      });

      setFilteredPosts(filtered);
    } else if (filterOption === "asc") {
      const filtered = posts.sort((a: Post, b: Post) => {
        return (
          new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime()
        );
      });
      setFilteredPosts(filtered);
    }
    setSortContainer(false);
  }, [filterOption, filteredPosts]);

  return (
    <div className="mx-auto my-24 max-w-7xl px-6 md:px-8 lg:my-32 xl:px-0">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <m.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="my-4 text-center font-playFair text-3xl font-semibold md:my-8 md:text-4xl xl:text-5xl "
        >
          Posty 📝
        </m.h1>

        <div
          onClick={() => setSortContainer(true)}
          className="md:text-md relative mb-8 cursor-pointer select-none rounded-xl border bg-white px-6 py-2 text-sm md:mb-0 md:px-12 md:py-4"
        >
          {/* Select sorting */}
          <h2 className="flex items-center gap-2">
            {!filterOption && "Sortowanie"}
            {filterOption === "asc" && <>Posty: od najstarszych</>}
            {filterOption === "desc" && <>Posty: od najnowszych</>}
            {sortContainer ? (
              <AiFillCaretDown className="rotate-180 transition-all" />
            ) : (
              <AiFillCaretDown className="transition-all" />
            )}
          </h2>
          {sortContainer && (
            <m.ul
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute left-0 top-16 z-10 w-full select-none flex-col items-center space-y-4 rounded-md border bg-white p-4 shadow-md"
            >
              <m.li
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                onClick={() => setFilterOption("desc")}
                className="cursor-pointer hover:text-my-beige"
              >
                Najnowsze posty
              </m.li>
              <m.li
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.2 }}
                onClick={() => setFilterOption("asc")}
                className="cursor-pointer hover:text-my-beige"
              >
                Najstarsze posty
              </m.li>
            </m.ul>
          )}
        </div>
      </div>

      <m.div className="grid-cols grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-8">
        {filteredPosts?.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            postIndex={posts.indexOf(post)}
          />
        ))}
      </m.div>
    </div>
  );
}
