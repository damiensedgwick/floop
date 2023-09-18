import { MetadataRoute } from "next";

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
