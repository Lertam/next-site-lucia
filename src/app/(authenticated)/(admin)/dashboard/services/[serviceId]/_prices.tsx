import { FC } from "react";
import { getRetouchPrices } from "../_queries/get-retouch-prices";
import Link from "next/link";

const RetouchPrices: FC<{ serviceId: string }> = async ({ serviceId }) => {
  const prices = await getRetouchPrices(serviceId);
  return (
    <div className={"relative"}>
      <h1 className={"font-bold uppercase"}>Тип и стоимость</h1>
      <Link
        href={`/dashboard/services/${serviceId}/prices/add`}
        className={"absolute top-0 right-0"}
      >
        + Добавить
      </Link>
      {prices.length === 0 && <div className={"text-center"}>Пока нет</div>}
      {prices.map((price) => (
        <div key={`rtp-${price.id}`} className={"grid grid-cols-5 hover:bg-foreground hover:text-white p-2 cursor-default"}>
          <p>{price.title}</p>
          <p>{price.weight}</p>
          <p>{price.price}</p>
          <p>{price.express ? "Срочный" : ""}</p>
          <Link href={`/dashboard/services/${serviceId}/prices/${price.id}`}>Редактировать</Link>
        </div>
      ))}
    </div>
  );
};
export default RetouchPrices;
