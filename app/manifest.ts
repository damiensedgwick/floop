import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Floop",
    short_name: "Floop",
    description:
      "Floop enables your users to submit ratings, issues and suggestions for your product and then presents them to you in a way that is easy to understand!",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [],
  };
}
