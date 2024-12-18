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
      <button className="main-button">Пополнить счет</button>
    </div>
  );
};

export default BalanceBlock;
