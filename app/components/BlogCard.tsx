import urlFor from "@/lib/urlFor";
import { Post } from "@/typings";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: Post;
  big?: boolean;
  postIndex?: number;
};

export default function BlogCard({ post, big, postIndex }: Props) {
  return (
    <Link
      href={`/post/${post?.slug?.current}`}
      className={`group flex flex-col justify-between rounded-xl bg-white shadow-md transition-all hover:shadow-xl md:flex-row ${
        big && "xl:h-full xl:flex-col"
      }`}
    >
      {post && (
        <>
          <div
            className={`w-full rounded-xl md:w-2/5 ${
              big ? "xl:h-full xl:w-full" : "h-64"
            }`}
          >
            <Image
              src={urlFor(post?.image?.asset).url()!}
              height={200}
              width={300}
              alt={post?.title}
              className={`h-full w-full object-cover object-center ${
                big
                  ? "rounded-t-xl rounded-bl-none md:rounded-bl-xl md:rounded-tr-none xl:h-full xl:rounded-bl-none xl:rounded-tr-xl"
                  : "rounded-t-xl rounded-bl-none md:rounded-bl-xl md:rounded-tr-none xl:rounded-t-xl xl:rounded-tr-none"
              }
          `}
            />
          </div>

          <div className={`p-4 md:w-3/5 ${big && "xl:w-full"}`}>
            <h3 className="text-lg font-semibold">{post?.title}</h3>
            <p className="py-4 text-sm text-my-m-gray">{post?.description}</p>
            <button className="text-my-beige group-hover:underline">
              Read More
            </button>
          </div>
        </>
      )}
    </Link>
  );
}
