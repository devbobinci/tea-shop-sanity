import { getFeaturedPosts } from "@/lib/sanity-db";
import BlogCard from "./BlogCard";

export default async function BlogArticles() {
  const posts = await getFeaturedPosts();

  return (
    <div className="mx-auto my-6 max-w-7xl px-4 md:px-6 xl:my-16 xl:px-0">
      <div className="flex justify-between py-2">
        <h2 className="mb-4 text-lg font-bold uppercase md:text-3xl">
          Najnowsze wpisy na blogu 📝
        </h2>
        <button className="hidden text-sm font-bold underline md:inline-block">
          Zobacz Wszystkie
        </button>
      </div>
      {/* Products */}
      <div className="grid grid-cols-1 gap-6 xl:h-[500px] xl:grid-cols-2">
        {posts && (
          <>
            <div className="flex-col justify-between gap-4 space-y-4 md:flex md:space-y-0">
              <BlogCard key={posts[0]._id} post={posts[0]} />
              <BlogCard key={posts[1]._id} post={posts[1]} />
            </div>
            <div className="">
              <BlogCard key={posts[2]._id} post={posts[2]} big={true} />
            </div>
          </>
        )}
      </div>

      <button className="py-4 text-sm font-bold underline md:hidden">
        Zobacz Wszystkie
      </button>
    </div>
  );
}
