import { useState, useEffect } from "react";

import { Comment, Post } from "@/typings";
import { fetchComments } from "@/lib/fetchComments";

import { motion as m } from "framer-motion";

type Props = {
  post: Post;
};

export default function Comments({ post }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);

  const getComments = async () => {
    const comments = await fetchComments((post?._id).toString());
    setComments(comments);
  };

  useEffect(() => {
    post && getComments();
  }, []);

  return (
    <m.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="mx-auto my-10 flex max-w-2xl flex-col space-y-2 rounded-md p-10 shadow-md"
    >
      <h3 className="text-4xl">Komentarze</h3>
      <hr className="pb-2" />

      {comments &&
        comments.length > 0 &&
        comments.map((comment: Comment) => (
          <div key={comment?._id}>
            <p>
              <span className="text-yellow-500">{comment?.name}</span>:{" "}
              {comment?.comment}
            </p>
          </div>
        ))}
    </m.div>
  );
}
