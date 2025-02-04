import { getUserBalance } from "@/app/(authenticated)/profile/_queries";
import Link from "next/link";

const BalanceBlock = async () => {
  const balance = await getUserBalance();
  return (
    <div className={"absolute right-0 top-0 normal-case"}>
      <span>Баланс: {balance} р.</span>
      <Link href={"/refund"}>+</Link>
    </div>
  );
};

export default BalanceBlock;
