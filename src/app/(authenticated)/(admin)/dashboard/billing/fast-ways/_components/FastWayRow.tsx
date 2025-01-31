import { FastWay } from "@prisma/client";
import { FC } from "react";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "@/lib/utils";
import { PaymentwayNames } from "@/lib/utils/contants";

const FastWayRow: FC<FastWay> = ({ id, weight, sum, way }) => {
  return (
    <div key={`fw-${id}`} className={"flex justify-between"}>
      <span className={"w-32"}>{PaymentwayNames[way]}</span>
      <div className={"grid grid-cols-2 w-40"}>
        <span className={"mr-5"}>{formatCurrency(sum)}</span>
        <span>Вес - {weight}</span>
      </div>
      <div className={"flex gap-4"}>
        <Link href={`/dashboard/billing/fast-ways/${id}?show-modal`}>
          <PencilIcon className={"w-5 h-5"} />
        </Link>
        <Link href={`/dashboard/billing/fast-ways/${id}/delete?show-modal`}>
          <TrashIcon className={"w-5 h-5"} />
        </Link>
      </div>
    </div>
  );
};

export default FastWayRow;
