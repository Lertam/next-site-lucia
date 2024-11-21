import RadioInput, { RadioInputProps } from "@/components/Forms/RadioInput";
import { Dispatch, FC, SetStateAction } from "react";
import { FormFieldMode } from "..";

const FORMATS: Omit<RadioInputProps, "name">[] = [
  {
    id: "formatBmp1",
    value: "bmp1",
    text: "BMP (1 бит)",
  },
  {
    id: "formatBmp8",
    value: "bmp8",
    text: "BMP (8 бит)",
  },
  {
    id: "formatJpegGray",
    value: "jpegGray",
    text: "JPEG (серый)",
  },
  {
    id: "formatJpegColor",
    value: "jpegColor",
    text: "JPEG (RGB)",
  },
  {
    id: "formatPsd",
    value: "psd",
    text: "PSD",
  },
  {
    id: "formatPng",
    value: "png",
    text: "PNG (прозрачный фон)",
  },
];

const Formats: FC<{
  mode: FormFieldMode;
  format: string | undefined;
  setFormat: Dispatch<SetStateAction<string | undefined>>;
}> = ({ mode, format, setFormat }) => {
  return (
    <div className={`mt-4${mode === FormFieldMode.hidden ? " hidden" : ""}`}>
      <h4 className={"font-bold"}>Формат</h4>
      <div className={"gap-6 mt-4 flex flwx-wrap"}>
        {FORMATS.map((f) => (
          <RadioInput
            key={f.id}
            {...f}
            name={"format"}
            inputProps={{
              required: true,
              type: mode === FormFieldMode.hidden ? "hidden" : "radio",
              onChange: (ev) => {
                if ((ev.target as HTMLInputElement).checked) setFormat(f.value);
              },
              value: format,
            }}
          />
        ))}
      </div>
      <div className={"text-gray-600 text-xs mt-2"}>
        Укажите формат готового эскиза.
      </div>
    </div>
  );
};

export default Formats;
