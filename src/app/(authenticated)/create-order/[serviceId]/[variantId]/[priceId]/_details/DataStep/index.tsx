import { FC } from "react";
import Files from "./Files";
import OrderInfoBlock from "./Info";

export enum FormFieldMode {
  input = "input",
  hidden = "hidden",
  view = "view",
}
// Указание файлов, надписей,
const DataStep: FC<{ step: number; next: () => void }> = ({ step, next }) => {
  return (
    <div className={"h-full mt-4 pb-20"} style={{ flexGrow: 999 }}>
      <Files
        mode={step === 1 ? FormFieldMode.hidden : FormFieldMode.input}
        next={next}
      />
      <OrderInfoBlock
        mode={step === 0 ? FormFieldMode.hidden : FormFieldMode.input}
        next={next}
      />
      <p>{step}</p>
    </div>
  );
};

export default DataStep;
