import DragDrop from "@/components/Forms/DragDrop";
import { FC, useMemo, useState } from "react";
import { FormFieldMode } from ".";

export const acceptImageFormats = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/psd",
  "image/bmp",
];

const FilesStep: FC<{
  next: () => void;
  mode: FormFieldMode;
}> = ({ mode, next }) => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file3, setFile3] = useState<File | null>(null);
  const [file4, setFile4] = useState<File | null>(null);

  const hasAnyOfFiles = useMemo<boolean>(
    () => !!file1 || !!file2 || !!file3 || !!file4,
    [file1, file2, file3, file4]
  );
  return (
    <>
      <div
        className={`grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 h-full md:h-1/2${
          mode === FormFieldMode.hidden ? " hidden" : ""
        }`}
      >
        <DragDrop
          hidden={mode === FormFieldMode.hidden}
          select={setFile1}
          accept={acceptImageFormats}
        />
        <DragDrop
          hidden={mode === FormFieldMode.hidden}
          select={setFile2}
          accept={acceptImageFormats}
        />
        <DragDrop
          hidden={mode === FormFieldMode.hidden}
          select={setFile3}
          accept={acceptImageFormats}
        />
        <DragDrop
          hidden={mode === FormFieldMode.hidden}
          select={setFile4}
          accept={acceptImageFormats}
        />
      </div>
      <div
        className={`w-full text-center${
          mode === FormFieldMode.hidden ? " hidden" : ""
        }`}
      >
        <button
          className={
            "bg-foreground text-white px-4 py-2 mt-4 w-full uppercase disabled:opacity-50"
          }
          disabled={!hasAnyOfFiles}
          onClick={() => {
            next();
          }}
          title={hasAnyOfFiles ? "Далее" : "Не выбрано ни одного файла"}
        >
          Далее
        </button>
      </div>
    </>
  );
};

export default FilesStep;
