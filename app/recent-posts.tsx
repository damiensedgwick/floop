import { BlogFactoryNextJS } from "@blogfactory/nextjs";
import BlogPostCardPreview from "@/components/blog-post-card-preview";
import Link from "next/link";

export default async function RecentPosts() {
  const apiKey = String(process.env.BLOG_FACTORY_API_KEY);
  const blogFactory = new BlogFactoryNextJS(apiKey).app;

  const { data } = await blogFactory.listPosts();

  if (!data) {
    return (
      <div>
        <p>No posts found!</p>
      </div>
    );
  }

  const posts = data.data
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 3)
    .map((post) => ({
      title: post.title,
      urlSlug: post.urlSlug,
      content: post.content,
      created: post.publishedAt,
    }));

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base font-semibold leading-7 text-mint">
            From the blog
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Learn and understand why customer feedback is so important
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCardPreview
              key={post.title}
              title={post.title}
              created={post.created}
              url={post.urlSlug}
            />
          ))}
        </div>
        <Link
          href="/posts"
          className="mt-2 ml-auto flex items-center rounded-md pt-4 pb-4 text-sm no-underline w-[120px] text-foreground bg-btn-background group hover:bg-btn-background-hover"
        >
          More posts
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
