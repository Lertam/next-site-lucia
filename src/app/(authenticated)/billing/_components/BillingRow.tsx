import { Billing, BillingStatus } from "@prisma/client";
import { FC } from "react";

const mapStatus = (status: BillingStatus): string => {
  switch (status) {
    case BillingStatus.WAIT:
      return "В обработке";
    case BillingStatus.READY:
      return "Готово";
    case BillingStatus.DELETED:
      return "Удален";
    default:
      return "Неизвестно";
  }
};

const BillingRow: FC<Billing> = ({ id, sum, status, comment }) => {
  let className = "";
  switch (status) {
    case BillingStatus.READY:
      className = "bg-green-300 bg-opacity-25";
      break;
    case BillingStatus.DELETED:
      className = "bg-red-300 bg-opacity-25";
      break;
  }

  return (
    <>
      <div
        className={"py-3 text-center border-b-2 border-gray-400 " + className}
      >
        {id}
      </div>

      <div
        className={"py-3 text-center border-b-2 border-gray-400 " + className}
      >
        {sum}
      </div>
      <div
        className={"py-3 text-center border-b-2 border-gray-400 " + className}
      >
        {mapStatus(status)}
      </div>
      <div
        className={
          "py-3 text-center border-b-2 border-gray-400 truncate " + className
        }
      >
        {comment}
      </div>
      <div
        className={"py-3 text-center border-b-2 border-gray-400 " + className}
      >
        -
      </div>
    </>
  );
};

export default BillingRow;
