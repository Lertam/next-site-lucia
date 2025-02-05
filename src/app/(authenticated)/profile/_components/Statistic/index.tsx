import { FC } from "react";
import BalanceBlock from "./BalanceBlock";
import { getUserStatistic } from "../../[userId]/_queries";
import { getAuth } from "@/features/auth/queries/get-auth";
import { redirect } from "next/navigation";

const ProfileStatistic: FC<{ userId: string }> = async ({ userId }) => {
  // TODO Implement
  const { user } = await getAuth();
  if (!user) {
    return redirect("/");
  }
  const stats = await getUserStatistic(userId);
  return (
    <div
      className={
        "border border-black flex flex-col items-center p-6 relative gap-y-5 flex-1"
      }
    >
      <h3>Статистика</h3>
      <span>Кол-во заказов ретуши: {stats.orders}</span>
      <span>Куплено картинок: {stats.images}</span>
      <span>Создано макетов: {stats.sketches}</span>
      <span>Создано проектов: {stats.projects}</span>
      <span>Использовано бонусов: {stats.bonuses}</span>
      <BalanceBlock />
    </div>
  );
};
export default ProfileStatistic;
