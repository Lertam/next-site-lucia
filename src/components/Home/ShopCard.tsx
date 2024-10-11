import CardButton from "./CardButton";
import CardWrapper from "./CardWrapper";

const ShopCard = () => {
  return (
    <CardWrapper
      image={"/images/home/Shop.jpg"}
      title={"Картинки для гравировки"}
    >
      <div
        className={
          "flex flex-col items-center justify-center gap-2 w-full h-full"
        }
      >
        <CardButton text={"Магазин картинок"} />
        <CardButton text={"Мои картинки"} />
        <CardButton text={"Популярное"} />
      </div>
    </CardWrapper>
  );
};

export default ShopCard;
