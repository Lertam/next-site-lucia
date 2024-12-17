import { News } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

const NewsCard: FC<News> = ({
  id,
  title,
  image,
  content,
  created,
  published,
}) => {
  return (
    <div
      className={"relative h-80 bg-center bg-contain"}
      style={{
        boxShadow:
          "0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)",
        backgroundImage: `url(/images/news/${
          image && image.length > 0 ? image : "no-image-available.jpg"
        })`,
        backgroundSize: "auto 100%",
      }}
    >
      <div
        className={
          "flex flex-grow self-end items-center justify-stretch p-4 relative h-48"
        }
      >
        <h2
          className={
            "text-white mt-auto text-shadow-lg shadow-gray-600 text-xl"
          }
        >
          {title}
        </h2>
      </div>
      <div className={"absolute bg-background bottom-0 w-full"}>
        <div
          className={"h-20 p-4 truncate text-wrap text-sm"}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <div
          className={`p-2 flex items-start justify-between ${
            published ? "bg-white" : "bg-red-300"
          }`}
        >
          <Link
            href={`/news/${id}`}
            className={
              "text-white bg-foreground uppercase px-4 py-2 font-thin text-sm curso"
            }
          >
            Подробнее
          </Link>
          <span className={"text-[10px] text-gray-500"}>
            {created.toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
