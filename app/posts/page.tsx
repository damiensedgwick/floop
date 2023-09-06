import { BlogFactoryNextJS } from "@blogfactory/nextjs";
import Link from "next/link";
import BlogPostCardPreview from "@/components/blog-post-card-preview";
import GoBackButton from "@/components/go-back-button";
import { buttonVariants } from "@/components/ui/button";

export default async function PostsPage() {
  const apiKey = String(process.env.BLOG_FACTORY_API_KEY);
  const blogFactory = new BlogFactoryNextJS(apiKey).app;

  const { data } = await blogFactory.listPosts();

  if (!data) {
    return (
      <div>
        <h1>No Posts Found</h1>
      </div>
    );
  }

  const posts = data.data.slice(0, 3).map((post) => ({
    title: post.title,
    urlSlug: post.urlSlug,
    content: post.content,
    created: post.publishedAt,
  }));

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
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
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
