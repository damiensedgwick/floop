import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenIcon, PencilIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  title: string;
  created: Date;
  url: string;
};

export default function BlogPostCardPreview({ title, created, url }: Props) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="leading-7">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between space-x-4">
        <div className="flex text-sm space-x-2 text-muted-foreground">
          <div className="flex items-center">
            <PencilIcon className="mr-2" width={20} height={20} />
            Published
          </div>
          <div>{format(created, "d MMM yyyy")}</div>
        </div>
        <Link
          href={"/posts/" + url}
          className={buttonVariants({ variant: "purple" })}
        >
          <BookOpenIcon className="mr-3" width={20} height={20} />
          Read
        </Link>
      </CardContent>
    </Card>
  );
}
