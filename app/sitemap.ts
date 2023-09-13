import { MetadataRoute } from "next";
// import { getBlogFactoryPosts } from "@/lib/blog-factory";

const URL = "https://feedback-loop.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${URL}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${URL}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${URL}/posts/why-user-feedback-is-important`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${URL}/posts/boosting-customer-satisfaction-and-retention`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${URL}/posts/getting-to-know-floop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}

// export default function sitemap(): MetadataRoute.Sitemap {
//   let posts: MetadataRoute.Sitemap = [];
//
//   getBlogFactoryPosts().then((response) =>
//     response.map((post) => ({
//       url: `${URL}/posts/${post.urlSlug}`,
//       lastModified: new Date().toISOString(),
//     })),
//   );
//
//   const routes: MetadataRoute.Sitemap = ["/", "/posts"].map((route) => ({
//     url: `${URL}${route}`,
//     lastModified: new Date().toISOString(),
//     changeFrequency: "weekly" as const,
//   }));
//
//   return [...posts, ...routes];
// }
