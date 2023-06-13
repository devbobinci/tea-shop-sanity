import { useState, useEffect } from "react";

import { Comment, Post } from "@/typings";
import { fetchComments } from "@/lib/fetchComments";

import { motion as m } from "framer-motion";

export const revalidate = 60;

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
  }, [post]);

  return (
    <m.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      {comments.length > 0 && (
        <div className="mx-auto my-10 flex flex-col space-y-3 rounded-md bg-white p-5 shadow-md md:w-[500px] lg:w-2/3 xl:w-full xl:p-10">
          <h3 className="text-4xl">Komentarze</h3>
          <hr className="pb-2" />

          <div className="text-left">
            {comments &&
              comments.map((comment: Comment) => (
                <div key={comment?._id}>
                  <p>
                    <span className="text-yellow-500">{comment?.name}</span>:{" "}
                    <span className=" text-gray-800">{comment?.comment}</span>
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </m.div>
  );
}
