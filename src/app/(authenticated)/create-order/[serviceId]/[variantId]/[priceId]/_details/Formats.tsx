import RadioInput, { RadioInputProps } from "@/components/Forms/RadioInput";
import { FC } from "react";

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

const Formats: FC = () => {
  return (
    <div className={"mt-4"}>
      <h4 className={"font-bold"}>Формат</h4>
      <div
        className={"gap-6 mt-4 flex flwx-wrap"}
      >
        {FORMATS.map((f) => (
          <RadioInput key={f.id} {...f} name={"format"} inputProps={{required:true}}/>
        ))}
      </div>
      <div className={"text-gray-600 text-xs mt-2"}>Укажите формат готового эскиза.</div>
    </div>
  );
};

export default Formats;
