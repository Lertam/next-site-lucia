import { RetouchVariant } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

const RetouchVariantCard: FC<RetouchVariant> = ({
  id,
  image,
  title,
  serviceId,
  price,
}) => {
  return (
    <div
      className={`flex flex-col items-center border border-foreground rounded-xl max-w-40 overflow-hidden relative`}
    >
      <img src={`/modules/services/images/${image}`} alt={title} />
      <div
        className={
          "p-2 flex flex-col items-center text-center h-full justify-between flex-1"
        }
      >
        <span className={"font-bold"}>{title}</span>
        <Link
          href={`/dashboard/services/${serviceId}/variants/${id}`}
          className={
            "p-2 border shadow-md shadow-foreground text-white bg-foreground border-none mt-4"
          }
        >
          Редактировать
        </Link>
      </div>

      {price > 0 && (
        <div
          className={
            "absolute top-1 z-10 right-1 bg-foreground text-white p-0.5 px-1 rounded-sm"
          }
        >
          +{price}
        </div>
      )}
    </div>
  );
};

export default RetouchVariantCard;
