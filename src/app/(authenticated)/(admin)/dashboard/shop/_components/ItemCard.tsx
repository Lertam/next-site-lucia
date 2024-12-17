import { ShopItem } from "@prisma/client";
import { FC } from "react";

const ItemCard: FC<ShopItem> = ({ preview, name }) => {
  return (
    <div>
      <img src={`/modules/shop/previews/${preview}`} />
      {name}
    </div>
  );
};

export default ItemCard;