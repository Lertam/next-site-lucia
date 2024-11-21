import { FC, useEffect, useMemo, useState } from "react";
import Name from "./Name";
import Sizes, { Size2D } from "./Sizes";
import Formats from "./Formats";
import Resolutions from "./Resolutions";
import Dressing, { DressingType } from "./Dressing";
import { FormFieldMode } from "..";

const OrderInfoBlock: FC<{ mode: FormFieldMode; next: () => void }> = ({
  mode,
  next,
}) => {
  const [name, setName] = useState<string>("");
  const [size, setSize] = useState<Size2D>({
    width: 20,
    height: 30,
  });
  // TODO Подтягивать данные последнего заказа и уставлять по умолчанию
  const [format, setFormat] = useState<string | undefined>(undefined);

  // TODO Подтягивать данные последнего заказа и уставлять по умолчанию
  const [resolution, setResolution] = useState<string | undefined>(undefined);

  const [dressing, setDressing] = useState<DressingType | undefined>(undefined);

  const [dressingFile, setDressingFile] = useState<File | null>(null);

  useEffect(() => {
    if (dressing !== DressingType.CUSTOM) {
      setDressingFile(null);
    }
  }, [dressing]);

  const [buttonDisabled, buttonText] = useMemo<[boolean, string]>(() => {
    if (!format) return [true, "Укажите формат"];
    if (!resolution) return [true, "Укажите разрешение"];
    if (!dressing) return [true, "Укажите тип переодевания"];
    if (dressing === DressingType.CUSTOM && !dressingFile)
      return [true, "Выберите файл с одеждой"];
    return [false, "Далее"];
  }, [format, resolution, dressing, dressingFile]);

  return (
    <>
      <Name mode={mode} name={name} setName={setName} />
      <Sizes mode={mode} size={size} setSize={setSize} />
      <Formats mode={mode} format={format} setFormat={setFormat} />
      <Resolutions
        mode={mode}
        resolution={resolution}
        setResolution={setResolution}
      />
      <Dressing
        mode={mode}
        value={dressing}
        setValue={setDressing}
        dressingFile={dressingFile}
        setDressingFile={setDressingFile}
      />
      <div
        className={`w-full text-center${
          mode === FormFieldMode.hidden ? " hidden" : ""
        }`}
      >
        <button
          className={
            "bg-foreground text-white px-4 py-2 mt-4 w-full uppercase disabled:opacity-50"
          }
          disabled={buttonDisabled}
          onClick={(ev) => {
            ev.preventDefault();
            next();
          }}
          title={buttonText}
        >
          Далее
        </button>
      </div>
    </>
  );
};

export default OrderInfoBlock;
