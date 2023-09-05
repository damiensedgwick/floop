import { BlogFactoryNextJS } from "@blogfactory/nextjs";
import BlogPostCardPreview from "@/components/blog-post-card-preview";

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

  const posts = data.data.slice(0, 3).map((post) => ({
    title: post.title,
    urlSlug: post.urlSlug,
    content: post.content,
    created: post.publishedAt,
  }));

  return (
    <div className="py-24 sm:py-32" id="recent-posts">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base font-semibold leading-7 text-teal-600">
            From the blog
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Learn and understand why customer feedback is so important
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCardPreview
              title={post.title}
              created={post.created}
              url={post.urlSlug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
