import { RetouchPrice } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

const Prices: FC<{ serviceId: string; prices: RetouchPrice[] }> = ({
  serviceId,
  prices,
}) => {
  return (
    <div className={"mt-4 relative"}>
      <h2 className={"text-center font-bold uppercase text-base"}>
        Цены на услуги
      </h2>

      <Link
        href={`/dashboard/services/${serviceId}/prices/add`}
        className={"absolute top-0 right-0"}
      >
        + Создать
      </Link>
      <div className={"mt-4"}>
        {prices.length === 0 && <p className={"text-center mt-4"}>Нет цен</p>}
        {prices.map((price) => (
          <Link
            href={`/dashboard/services/${serviceId}/prices/${price.id}`}
            key={`pr-${price.id}`}
          >
            {price.id} - {price.weight}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Prices;
