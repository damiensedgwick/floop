import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import BookOpen from "@/components/icons/book-open";
import PencilLine from "@/components/icons/pencil-line";

type Props = {
  title: string;
  created: Date;
  url: string;
};

export default function BlogPostCardPreview({ title, created, url }: Props) {
  return (
    <Card className="shadow-md flex flex-col items-stretch justify-between">
      <CardHeader>
        <CardTitle className="leading-7">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between space-x-4">
        <div className="flex text-sm space-x-2 text-muted-foreground">
          <div className="flex items-center">
            <PencilLine className="mr-2 stroke-2 fill-none stroke-muted-foreground h-4 w-4" />
            Published
          </div>
          <div>{format(created, "d MMM yyyy")}</div>
        </div>
        <Link
          href={"/posts/" + url}
          className={buttonVariants({ variant: "purple" })}
        >
          <BookOpen className="mr-2 stroke-2 fill-none stroke-white h-5 w-5" />
          Read
        </Link>
      </CardContent>
    </Card>
  );
}
