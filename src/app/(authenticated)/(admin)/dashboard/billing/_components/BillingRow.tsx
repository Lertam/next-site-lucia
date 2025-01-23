import { formatCurrency } from "@/lib/utils";
import { Billing, BillingStatus, PaymentGateways } from "@prisma/client";
import { FC, useMemo } from "react";

const BillingRow: FC<
  Billing & {
    user: {
      login: string;
    };
  }
> = ({ id, sum, way, user: { login }, created, shopItemId, status }) => {
  const image = useMemo<string>(() => {
    switch (way) {
      case PaymentGateways.ROBOKASSA:
        return "/images/payments/ways/robokassa_mini.png";
      case PaymentGateways.UNITPAY:
        return "/images/payments/ways/unitpay_mini.png";
      case PaymentGateways.WALLET_ONE:
        return "/images/payments/ways/w1_logo.png";
      default:
        if (shopItemId) {
          return "image";
        } else {
          return "retouch";
        }
    }
  }, [way, shopItemId]);

  const bg = useMemo<string>(() => {
    switch (status) {
      case BillingStatus.READY:
        return "bg-green-300";
      case BillingStatus.DELETED:
        return "bg-red-300";
      default:
        return "bg-transparent";
    }
  }, [status]);
  return (
    <tr className={`${bg} p-2`}>
      <td className={"p-1"}>{id}</td>
      <td>{login}</td>
      <td>{formatCurrency(sum)}</td>
      <td>
        <img src={image} className={"h-4"} />
      </td>
      <td>
        {created.toLocaleDateString()} {created.toLocaleTimeString()}
      </td>
    </tr>
  );
};

export default BillingRow;
