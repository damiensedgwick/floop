import React from "react";
import { BlogFactoryNextJS } from "@blogfactory/nextjs";

const { PostPage } = new BlogFactoryNextJS(process.env.BLOG_FACTORY_API_KEY!)
  .app;

type Props = { params: { slug: string } };

export default async function Posts(props: Props) {
  return <PostPage {...props} />;
}
