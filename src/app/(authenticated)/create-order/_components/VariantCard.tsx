import { formatMoney } from "@/lib/utils/format";
import { RetouchVariant } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

const VariantCard: FC<{ variant: RetouchVariant }> = ({ variant }) => {
  return (
    <Link
      href={`/create-order/${variant.serviceId}/${variant.id}`}
      className={
        "flex flex-col p-1 border border-foreground rounded-md cursor-pointer justify-between w-1/2 sm:w-1/4 md:w-1/6 relative"
      }
      title={variant.description}
    >
      <h3 className={"text-sm text-center mb-2"}>{variant.title}</h3>
      <img
        src={`/modules/services/images/${variant.image}`}
        className={"rounded-b-md"}
        alt={variant.title}
      />
      {variant.price > 0 && (
        <span
          className={
            "absolute w-full bottom-4 left-0 bg-foreground text-white text-center p-0 py-0.5"
          }
        >
          +{formatMoney(variant.price)}
        </span>
      )}
    </Link>
  );
};

export default VariantCard;