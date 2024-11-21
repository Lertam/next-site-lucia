import { FC, ReactNode, useMemo } from "react";
import Files from "./Files";
import OrderInfoBlock from "./Info";

export enum FormFieldMode {
  input = "input",
  hidden = "hidden",
  view = "view",
}

// Указание файлов, надписей,
const DataStep: FC<{
  step: number;
  next: () => void;
  servicesBlock: ReactNode;
}> = ({ step, next, servicesBlock }) => {
  const wrapperClassName = useMemo<string>(() => {
    switch (step) {
      case 2:
        return "grid gap-4 grid-cols-2";
      case 1:
        return "hidden";
      case 0:
      default:
        return "h-[inherit]";
    }
  }, [step]);

  return (
    <div className={"h-full mt-4 pb-20"} style={{ flexGrow: 999 }}>
      <div className={wrapperClassName}>
        {step === 2 && servicesBlock}
        <Files
          mode={
            step === 1
              ? FormFieldMode.hidden
              : step === 0
              ? FormFieldMode.input
              : FormFieldMode.view
          }
          next={next}
        />
      </div>

      <OrderInfoBlock
        mode={step === 0 ? FormFieldMode.hidden : FormFieldMode.input}
        next={next}
      />
      <p>{step}</p>
    </div>
  );
};

export default DataStep;
