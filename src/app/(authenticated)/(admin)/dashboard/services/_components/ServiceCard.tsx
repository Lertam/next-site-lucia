"use client";
import { RetouchService } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

const RetouchServiceCard: FC<RetouchService & { selected?: boolean }> = ({
  id,
  image,
  title,
  selected,
}) => {
  const router = useRouter();

  return (
    <div
      className={`flex flex-col items-center border border-foreground rounded-xl overflow-hidden${
        selected ? " shadow-xl shadow-foreground" : " cursor-pointer"
      }`}
      onClick={() => {
        if (!selected) router.push(`/dashboard/services/${id}`);
      }}
    >
      <img src={`/modules/services/images/${image}`} alt={title} />
      <div className={"p-2 flex flex-col items-center text-center"}>
        <span className={"font-bold"}>{title}</span>
        {!selected && (
          <Link
            href={`/dashboard/services/${id}/edit`}
            className={
              "p-2 border shadow-md shadow-foreground text-white bg-foreground border-none mt-4"
            }
          >
            Редактировать
          </Link>
        )}
      </div>
    </div>
  );
};

export default RetouchServiceCard;
