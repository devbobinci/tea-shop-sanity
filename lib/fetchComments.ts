import { Comment } from "@/typings";

export const fetchComments = async (postId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getComments?postId=${postId}`
  );

  const data = await res.json();

  const comments: Comment[] = data.comments;

  return comments;
};
