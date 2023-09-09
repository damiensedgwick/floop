import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/posts"],
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
