import CardWrapper from "./CardWrapper";
import CardButton from "./CardButton";

const RetouchCard = () => {
  return (
    <CardWrapper
      image={"images/home/Retouch.jpg"}
      title={"Ретушь для гравировки"}
    >
      <div
        className={
          "flex flex-col items-center justify-center gap-2 w-full h-full"
        }
      >
        <CardButton text={"Заказать ретушь"} />
        <CardButton text={"Мои заказы"} />
        <CardButton text={"Правила"} />
      </div>
    </CardWrapper>
  );
};

export default RetouchCard;
