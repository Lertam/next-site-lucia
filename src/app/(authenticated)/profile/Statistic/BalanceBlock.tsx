import Link from "next/link";
import { getUserBalance } from "./_query";

const BalanceBlock = async () => {
  const balance = await getUserBalance();
  return (
    <div
      className={
        "absolute bottom-5 flex flex-col items-center font-bold gap-y-2"
      }
    >
      <span>Баланс: {balance} р.</span>
      <Link href={"/refund"} className="main-button">
        Пополнить счет
      </Link>
    </div>
  );
};

export default BalanceBlock;
