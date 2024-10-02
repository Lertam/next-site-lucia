import BalanceBlock from "./BalanceBlock";

const ProfileStatistic = () => {
  // TODO Implement
  return (
    <div
      style={{ flexGrow: 3 }}
      className={
        "border border-black flex flex-col items-center p-6 relative gap-y-5"
      }
    >
      <h3>Статистика</h3>
      <span>Кол-во заказов ретуши: 56</span>
      <span>Куплено картинок: 23</span>
      <span>Создано макетов: 56</span>
      <span>Создано проектов: 12</span>
      <span>Использовано бонусов: 678</span>
      <BalanceBlock />
    </div>
  );
};
export default ProfileStatistic;
