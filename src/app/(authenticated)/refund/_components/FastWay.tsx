import { formatCurrency } from "@/lib/utils";
import { PaymentwayNames } from "@/lib/utils/contants";
import { FastWay, PaymentGateways } from "@prisma/client";
import { FC, useMemo } from "react";
import { createBilling } from "../_actions";

const FastWayBlock: FC<FastWay> = ({ sum, way }) => {
  const img = useMemo<string>(() => {
    switch (way) {
      case PaymentGateways.ROBOKASSA:
        return "/images/payments/ways/robokassa_mini.png";
      case PaymentGateways.UNITPAY:
        return "/images/payments/ways/unitpay_mini.png";
      case PaymentGateways.YOOMONEY:
        return "/images/payments/ways/yoomoney.png";
      case PaymentGateways.WALLET_ONE:
        return "/images/payments/ways/w1_logo.png";
      default:
        return "";
    }
  }, [way]);
  return (
    <button
      className={"flex gap-4 items-center bg-white rounded px-4 py-2"}
      onClick={() => createBilling(way, sum)}
    >
      <img
        src={img}
        className={"h-[30px]"}
        height={30}
        alt={`Пополнить через ${PaymentwayNames[way]} на сумму ${formatCurrency(
          sum
        )}`}
      />
      <div className={"flex flex-col gap-1"}>
        <span>{PaymentwayNames[way]}</span>
        <span className={"text-red-800 font-bold w-full text-center"}>
          {formatCurrency(sum)}
        </span>
      </div>
    </button>
  );
};

export default FastWayBlock;
