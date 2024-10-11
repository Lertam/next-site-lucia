import { NewsType } from "@/app/news/page";
import { FC } from "react";

const NewsCard: FC<NewsType> = ({ id, title, image, description }) => {
  return (
    <div
      className={"relative h-80"}
      style={{
        boxShadow:
          "0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)",
        backgroundImage: `url(${image})`,
        backgroundSize: "auto 100%",
      }}
    >
      <div
        className={"flex flex-grow self-end items-center justify-stretch p-4"}
      >
        <h2 className={"text-white"}>{title}</h2>
      </div>
      <div className={"absolute bg-background bottom-0 w-full"}>
        <div className={"h-20 p-4"}>Description</div>
        <div className={"bg-white p-2"}>
          <button>Подробнее</button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
