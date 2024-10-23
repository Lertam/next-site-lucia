"use client";
import FileInput from "@/components/Forms/FileInput";
import RadioInput from "@/components/Forms/RadioInput";
import { FC, useEffect, useRef, useState } from "react";

const Dressing: FC = () => {
  const [mode, setMode] = useState<"none" | "custom" | "retoucher">("none");

  const noneRef = useRef<HTMLInputElement>(null);
  const customRef = useRef<HTMLInputElement>(null);
  const retouchersRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onChange = (ev: Event) => {
      setMode(
        (ev.target as HTMLInputElement).value as "none" | "custom" | "retoucher"
      );
    };

    const inputs = document.querySelectorAll('input[name="dressing"]');
    inputs.forEach((el) => {
      console.log("add", el);
      el.addEventListener("change", onChange);
    });
    return () => {
      inputs.forEach((el) => {
        el.removeEventListener("change", onChange);
      });
    };
  }, []);

  return (
    <div className={"mt-4"}>
      <h4 className={"font-bold"}>Переодевание</h4>
      <div className={"gap-6 flex flex-wrap mt-2"}>
        <RadioInput
          inputProps={{ required: true }}
          name={"dressing"}
          value={"none"}
          id={"dressingNone"}
          text={"Не переодевать"}
          ref={noneRef}
        />
        <RadioInput
          inputProps={{ required: true }}
          name={"dressing"}
          value={"custom"}
          id={"dressingCustom"}
          text={"Переодеть (прикрепить файл c одеждой) +100 руб."}
          ref={customRef}
        />
        <RadioInput
          inputProps={{ required: true }}
          name={"dressing"}
          value={"retoucher"}
          id={"dressingRetoucher"}
          text={"Переодеть в наш вариант +200 руб."}
          ref={retouchersRef}
        />
      </div>
      {mode === "custom" && (
        <div className={"mt-4"}>
          <FileInput
            inputProps={{ required: true }}
            id={"dressingFile"}
            label={<h4 className={"font-bold"}>Файл с одеждой</h4>}
            name={"dressingFile"}
          />
        </div>
      )}
    </div>
  );
};

export default Dressing;
