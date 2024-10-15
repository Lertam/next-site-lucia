import { RetouchService } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

const RetouchServiceCard: FC<
  RetouchService & { select: () => void; selected: boolean }
> = ({ id, image, title, selected, select }) => {
  return (
    <div
      className={`flex flex-col items-center border border-foreground rounded-xl cursor-pointer${
        selected ? " shadow-xl shadow-foreground" : ""
      }`}
      onClick={(ev) => {
        ev.stopPropagation();
        select();
      }}
    >
      <img src={`/modules/services/images/${image}`} />
      <div className={"p-2 flex flex-col items-center text-center"}>
        <span className={"font-bold"}>{title}</span>
        <Link
          href={`/dashboard/services/${id}`}
          className={
            "p-2 border shadow-md shadow-foreground text-white bg-foreground border-none mt-4"
          }
        >
          Редактировать
        </Link>
      </div>
    </div>
  );
};

export default RetouchServiceCard;
