const BalanceBlock = async () => {
  return (
    <div
      className={
        "absolute bottom-5 flex flex-col items-center font-bold gap-y-2"
      }
    >
      <span>Баланс: 1500 р.</span>
      <button className="main-button">Пополнить счет</button>
    </div>
  );
};

export default BalanceBlock;
