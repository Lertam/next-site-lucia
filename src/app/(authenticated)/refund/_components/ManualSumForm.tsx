"use client";
import { FC, useState } from "react";

const ManualSumForm: FC = () => {
  const [sum, setSum] = useState<number>(0);
  const [step, setStep] = useState<0 | 1>(0);

  if (step === 0) {
    return (
      <div
        className={
          "relative bg-inherit w-fit mx-auto mt-4 flex flex-col items-center"
        }
      >
        <input
          type={"number"}
          placeholder={"Введите сумму"}
          className={
            "placeholder-transparent bg-transparent border-black border-opacity-30 text-center p-3 w-80"
          }
          value={sum}
          onChange={(ev) => {
            const val = Number(ev.target.value);
            if (isNaN(val)) return;
            setSum(val);
          }}
          id={"sum"}
        />
        <label
          htmlFor={"sum"}
          className={
            "absolute -top-2 left-28 text-center text-xs bg-background px-1 text-black text-opacity-60"
          }
        >
          Введите сумму
        </label>
        <span className={"text-xs text-center text-black text-opacity-60 mt-1"}>
          В российских рублях
        </span>
        <button
          className={
            "bg-foreground text-white uppercase w-full py-2 mt-4 rounded text-center disabled:bg-opacity-15 disabled:bg-black disabled:text-black disabled:text-opacity-25"
          }
          disabled={sum === 0}
          onClick={() => setStep(1)}
        >
          Продолжить
        </button>
      </div>
    );
  } else {
    return (
      <form>
        <input type={"hidden"} value={sum} name={"sum"} />
        <div className={"grid grid-cols-3 gap-4"}>
          <span>Robokassa</span>
          <span>Unitpay</span>
        </div>
      </form>
    );
  }
};

export default ManualSumForm;
