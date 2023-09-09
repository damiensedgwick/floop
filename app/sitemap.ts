import { MetadataRoute } from "next";
import { getBlogFactoryPosts } from "@/lib/blog-factory";

const URL = "https://feedback-loop.io";

export default function sitemap(): MetadataRoute.Sitemap {
  let posts: MetadataRoute.Sitemap = [];

  getBlogFactoryPosts().then((response) =>
    response.map((post) => ({
      url: `${URL}/posts/${post.urlSlug}`,
      lastModified: new Date().toISOString(),
    })),
  );

  const routes: MetadataRoute.Sitemap = ["/", "/posts"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
  }));

  return [...posts, ...routes];
}
