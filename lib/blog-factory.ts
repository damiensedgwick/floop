import { cache } from "react";
import { BlogFactoryNextJS } from "@blogfactory/nextjs";

export const getBlogFactoryPosts = cache(async () => {
  const apiKey = String(process.env.BLOG_FACTORY_API_KEY);
  const blogFactory = new BlogFactoryNextJS(apiKey).app;

  const { data } = await blogFactory.listPosts();

  if (!data) {
    return [];
  }

  const posts = data.data.map((post) => ({
    title: post.title,
    urlSlug: post.urlSlug,
    content: post.content,
    created: post.publishedAt,
  }));

  return posts;
});
