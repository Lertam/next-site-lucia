import { formatMoney } from "@/lib/utils/format";
import { RetouchService } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

const ServiceCard: FC<{
  service: RetouchService & { price: number };
}> = ({ service }) => {
    // TODO Проверить дизайн при разных размерах картинки
  return (
    <Link
      href={`/create-order/${service.id}`}
      className={
        "flex flex-col p-1 border border-foreground rounded-md cursor-pointer justify-between w-1/2 sm:w-1/4 md:w-1/6 relative"
      }
      title={service.description}
    >
      <h3 className={"text-sm text-center mb-2"}>{service.title}</h3>
      <img
        src={`/modules/services/images/${service.image}`}
        className={"rounded-b-md"}
      />
      <span className={"absolute w-full bottom-4 left-0 bg-foreground text-white text-center p-0 py-0.5"}>{formatMoney(service.price)}</span>
    </Link>
  );
};

export default ServiceCard;
