import { getUserBalance } from "@/app/(authenticated)/profile/Statistic/_query";

const BalanceBlock = async () => {
  const balance = await getUserBalance();
  return (
    <div className={"absolute right-0 top-0 normal-case"}>
      <span>Баланс: {balance} р.</span>
      <button>+</button>
    </div>
  );
};

export default BalanceBlock;
