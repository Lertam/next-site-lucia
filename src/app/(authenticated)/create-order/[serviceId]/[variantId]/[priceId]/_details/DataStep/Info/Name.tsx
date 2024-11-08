import { Dispatch, FC, SetStateAction } from "react";
import { FormFieldMode } from "..";

const Name: FC<{
  mode: FormFieldMode;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}> = ({ mode, name, setName }) => {
  return (
    <div className={`mt-4${mode === FormFieldMode.hidden ? " hidden" : ""}`}>
      <h4 className={"font-bold"}>Название заказа</h4>
      <input
        name={"name"}
        className={"w-full"}
        maxLength={24}
        type={mode === FormFieldMode.hidden ? "hidden" : "text"}
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
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
