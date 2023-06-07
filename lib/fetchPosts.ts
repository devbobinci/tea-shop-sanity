import { Post } from "@/typings";

export const fetchPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getPosts`);
  const data = await res.json();

  const posts: Post[] = data;

  return posts;
};
