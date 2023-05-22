import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: Post;
  big?: boolean;
};

export default function BlogCard({ post, big }: Props) {
  return (
    <Link
      href={`/post/${post?.slug?.current}`}
      className={`flex flex-col md:flex-row justify-between shadow-md bg-white rounded-xl group ${
        big && "lg:flex-col"
      }`}
    >
      <div
        className={`w-full md:w-1/2  rounded-xl ${
          big ? "h-52 lg:w-full lg:h-80" : "h-60"
        }`}
        // style={{
        //   backgroundImage: `url(${urlFor(post?.image?.asset).url()!})`,
        // }}
      >
        <Image
          src={urlFor(post?.image?.asset).url()!}
          height={200}
          width={300}
          alt={post?.title}
          className={`object-cover w-full h-full ${
            big
              ? "rounded-l-xl lg:rounded-t-xl lg:rounded-bl-none"
              : "rounded-l-xl lg:rounded-t-xl lg:rounded-tr-none"
          }
          `}
        />
      </div>

      <div className={`p-4 lg:w-1/2 ${big && "lg:w-full"}`}>
        <h3 className="font-semibold text-lg">{post?.title}</h3>
        <p className="text-my-m-gray text-sm py-4">{post?.description}</p>
        <button className="text-my-beige group-hover:underline">
          Read More
        </button>
      </div>
    </Link>
  );
}
