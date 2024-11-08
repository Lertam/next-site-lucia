"use client";
import DragDrop from "@/components/Forms/DragDrop";
import RadioInput from "@/components/Forms/RadioInput";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { FormFieldMode } from "..";
import { acceptImageFormats } from "../Files";

export enum DressingType {
  NONE = "none",
  CUSTOM = "custom",
  RETOUCHER = "retoucher",
}
const Dressing: FC<{
  mode: FormFieldMode;
  value: DressingType | undefined;
  setValue: Dispatch<SetStateAction<DressingType | undefined>>;
  dressingFile: File | null;
  setDressingFile: Dispatch<SetStateAction<File | null>>;
}> = ({ mode: formMode, value, setValue, setDressingFile }) => {
  useEffect(() => {
    const onChange = (ev: Event) => {
      setValue((ev.target as HTMLInputElement).value as DressingType);
    };

    const inputs = document.querySelectorAll('input[name="dressing"]');
    inputs.forEach((el) => {
      el.addEventListener("change", onChange);
    });
    return () => {
      inputs.forEach((el) => {
        el.removeEventListener("change", onChange);
      });
    };
  }, [setValue]);

  return (
    <div
      className={`mt-4${formMode === FormFieldMode.hidden ? " hidden" : ""}`}
    >
      <h4 className={"font-bold"}>Переодевание</h4>
      <div className={"gap-6 flex flex-wrap mt-2"}>
        <RadioInput
          inputProps={{
            required: true,
            type: formMode === FormFieldMode.hidden ? "hidden" : "radio",
            onChange: (ev) => {
              if ((ev.target as HTMLInputElement).checked)
                setValue(DressingType.NONE);
            },
          }}
          name={"dressing"}
          value={DressingType.NONE}
          id={"dressingNone"}
          text={"Не переодевать"}
        />
        <RadioInput
          inputProps={{
            required: true,
            type: formMode === FormFieldMode.hidden ? "hidden" : "radio",
            onChange: (ev) => {
              if ((ev.target as HTMLInputElement).checked)
                setValue(DressingType.CUSTOM);
            },
          }}
          name={"dressing"}
          value={DressingType.CUSTOM}
          id={"dressingCustom"}
          text={"Переодеть (прикрепить файл c одеждой) +100 руб."}
        />
        <RadioInput
          inputProps={{
            required: true,
            type: formMode === FormFieldMode.hidden ? "hidden" : "radio",
            onChange: (ev) => {
              if ((ev.target as HTMLInputElement).checked)
                setValue(DressingType.RETOUCHER);
            },
          }}
          name={"dressing"}
          value={DressingType.RETOUCHER}
          id={"dressingRetoucher"}
          text={"Переодеть в наш вариант +200 руб."}
        />
      </div>
      {value === DressingType.CUSTOM && (
        <div className={"mt-4 w-64 m-auto min-h-32"}>
          <DragDrop
            accept={acceptImageFormats}
            select={setDressingFile}
            hidden={formMode === FormFieldMode.hidden}
          />
        </div>
      )}
    </div>
  );
};

export default Dressing;
