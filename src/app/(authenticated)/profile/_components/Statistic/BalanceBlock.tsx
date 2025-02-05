import Link from "next/link";
import { getUserBalance } from "../../_queries";
import { formatCurrency } from "@/lib/utils";

const BalanceBlock = async () => {
  const balance = await getUserBalance();
  return (
    <div
      className={
        "absolute bottom-5 flex flex-col items-center font-bold gap-y-2"
      }
    >
      <span>Баланс: {formatCurrency(balance)}</span>
      <Link href={"/refund"} className="main-button">
        Пополнить счет
      </Link>
    </div>
  );
};

export default BalanceBlock;
