import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { News } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

const NewsItem: FC<News> = ({ id, title, published }) => {
  return (
    <div
      className={
        "flex justify-between items-center border border-black p-4 first:border-t py-1" +
        (published ? "" : " bg-red-300")
      }
    >
      <span className={"trancate"}>{title}</span>
      <div className={"flex gap-4 items-center"}>
        <Link
          href={`/dashboard/news/${id}`}
        >
          <PencilSquareIcon className={"w-6 text-foreground"} />
        </Link>
      </div>
    </div>
  );
};

export default NewsItem;
