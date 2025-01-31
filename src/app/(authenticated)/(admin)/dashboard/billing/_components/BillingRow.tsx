import { formatCurrency } from "@/lib/utils";
import { PaymentwayNames } from "@/lib/utils/contants";
import { Billing, BillingStatus, PaymentGateways } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
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

  const priceColor = useMemo<string>(
    () => (sum > 0 ? "text-green-700" : "text-red-900"),
    [sum]
  );

  return (
    <tr className={`${bg} p-2`}>
      <td className={"p-1"}>{id}</td>
      <td>{login}</td>
      <td className={`${priceColor} font-bold`}>{formatCurrency(sum)}</td>

      <td>
        {created.toLocaleDateString()} {created.toLocaleTimeString()}
      </td>
      <td>
        <Link href={`/dashboard/billing/${id}`}>
          <Image
            src={image}
            className={"h-4"}
            width={16}
            height={16}
            alt={way ? PaymentwayNames[way] : ""}
          />
        </Link>
      </td>
    </tr>
  );
};

export default BillingRow;
