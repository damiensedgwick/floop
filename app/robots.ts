import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/posts",
        "/posts/why-user-feedback-is-important",
        "/posts/boosting-customer-satisfaction-and-retention",
        "/posts/getting-to-know-floop",
      ],
      disallow: [
        "/auth/sign-in",
        "/auth/callback",
        "/project",
        "/project/issues",
        "/project/profile",
        "/project/ratings",
        "/project/reports",
        "/projects/settings",
        "/projects/suggestions",
        "/projects/team",
      ],
    },
    sitemap: "https://feedback-loop.io/sitemap.xml",
  };
}
