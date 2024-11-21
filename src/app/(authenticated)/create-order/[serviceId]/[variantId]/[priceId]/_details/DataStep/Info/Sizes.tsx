import { Dispatch, FC, SetStateAction } from "react";
import { FormFieldMode } from "..";

export type Size2D = { width: number; height: number };

const Sizes: FC<{
  mode: FormFieldMode;
  size: Size2D;
  setSize: Dispatch<SetStateAction<Size2D>>;
}> = ({ mode, size, setSize }) => {
  return (
    <div className={`mt-4${mode === FormFieldMode.hidden ? " hidden" : ""}`}>
      <h4 className={"font-bold"}>Размер</h4>
      <div className={"flex gap-4 items-center"}>
        <div>
          <label>Ширина: </label>
          <input
            type={mode === FormFieldMode.hidden ? "hidden" : "number"}
            name={"width"}
            value={size.width}
            onChange={(e) =>
              setSize((s) => ({ ...s, width: Number(e.target.value) }))
            }
            className={"w-14"}
            required
          />
          <span className={"pl-2"}>см</span>
        </div>
        <div>
          <label>Высота: </label>
          <input
            type={mode === FormFieldMode.hidden ? "hidden" : "number"}
            name={"height"}
            value={size.height}
            onChange={(e) =>
              setSize((s) => ({ ...s, height: Number(e.target.value) }))
            }
            className={"w-14"}
            required
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
