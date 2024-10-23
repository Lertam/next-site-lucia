import { FC } from "react";

const Sizes: FC = () => {
  return (
    <div className={"mt-4"}>
      <h4 className={"font-bold"}>Размер</h4>
      <div className={"flex gap-4 items-center"}>
        <div>
          <label>Ширина: </label>
          <input
            type={"number"}
            name={"width"}
            defaultValue={20}
            className={"w-14"}
          />
          <span className={"pl-2"}>см</span>
        </div>
        <div>
          <label>Высота: </label>
          <input
            type={"number"}
            name={"height"}
            defaultValue={30}
            className={"w-14"}
          />
          <span className={"pl-2"}>см</span>
        </div>
      </div>
      <div className={"text-gray-600 text-xs mt-2"}>
        Укажите необходимые размеры ширины и высоты готового файла эскиза в
        сантиметрах. Например: 25х30
      </div>
    </div>
  );
};

export default Sizes;
