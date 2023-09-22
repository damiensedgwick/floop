import { getBlogFactoryPosts } from "@/lib/blog-factory";
import BlogPostCardPreview from "@/components/blog-post-card-preview";

export default async function Posts() {
  const posts = await getBlogFactoryPosts();

  if (!posts.length) {
    return (
      <div>
        <h1>No Posts Found</h1>
      </div>
    );
  }

  return (
    <>
      {posts
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
    </>
  );
}
