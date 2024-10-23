import { FC } from "react";

const Name: FC = () => {
  return (
    <div className={"mt-4"}>
      <h4 className={"font-bold"}>Название заказа</h4>
      <input name={"name"} className={"w-full"} maxLength={24} required />
      <div className={"text-xs text-gray-600 mt-2"}>
        Для быстрого поиска по заказам, назовите этот заказ. Например:{" "}
        <span className={"font-bold"}>Иванов И.И.</span> или{" "}
        <span className={"font-bold"}>Мой заказ 12</span>. Это упростит Вам
        поиск среди большого количества заказов! Не более 24 символов.
      </div>
    </div>
  );
};

export default Name;
