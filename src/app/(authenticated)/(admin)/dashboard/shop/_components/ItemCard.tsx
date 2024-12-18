import { PencilIcon } from "@heroicons/react/24/outline";
import { ShopItem } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

const ItemCard: FC<ShopItem> = ({ id, name }) => {
  return (
    <div className={"flex justify-between mt-2 border rounded border-foreground p-4 py-1"}>
      {name}
      <Link href={`/dashboard/shop/${id}`}>
        <PencilIcon className={"w-6 text-foreground"}/>
      </Link>
    </div>
  );
};

export default ItemCard;
