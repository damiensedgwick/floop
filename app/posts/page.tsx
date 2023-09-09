import Link from "next/link";
import BlogPostCardPreview from "@/components/blog-post-card-preview";
import GoBackButton from "@/components/go-back-button";
import { buttonVariants } from "@/components/ui/button";
import { getBlogFactoryPosts } from "@/lib/blog-factory";

export default async function PostsPage() {
  const posts = await getBlogFactoryPosts();

  if (!posts.length) {
    return (
      <div>
        <h1>No Posts Found</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <GoBackButton />
        <Link
          href="/"
          className={buttonVariants({
            variant: "default",
            className: "mb-6 no-underline",
          })}
        >
          Home
        </Link>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {posts
          .slice(0, 3)
          .sort(
            (a, b) =>
              new Date(b.created).getTime() - new Date(a.created).getTime(),
          )
          .map((post) => (
            <BlogPostCardPreview
              key={post.title}
              title={post.title}
              created={post.created}
              url={post.urlSlug}
            />
          ))}
      </ul>
    </div>
  );
}
