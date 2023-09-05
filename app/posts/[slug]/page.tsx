import { BlogFactoryNextJS } from "@blogfactory/nextjs";
import Link from "next/link";
import GoBackButton from "@/components/go-back-button";
import { buttonVariants } from "@/components/ui/button";

const { PostPage } = new BlogFactoryNextJS(process.env.BLOG_FACTORY_API_KEY!)
  .app;

type Props = { params: { slug: string } };

export default function Page(props: Props) {
  return (
    <div className="mx-auto max-w-3xl py-6 prose px-6 lg:px-0">
      <div className="flex items-center justify-between">
        <GoBackButton />
        <Link
          href="/"
          className={buttonVariants({
            variant: "themed",
            className: "mb-6 no-underline",
          })}
        >
          Home
        </Link>
      </div>

      <PostPage {...props} />

      <Link
        href="/posts"
        className="ml-auto flex items-center rounded-md pt-4 pb-4 text-sm no-underline w-[120px] text-foreground bg-btn-background group hover:bg-btn-background-hover"
      >
        More posts
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </Link>
    </div>
  );
}
