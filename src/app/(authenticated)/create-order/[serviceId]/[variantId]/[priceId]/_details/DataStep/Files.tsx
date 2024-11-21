import DragDrop from "@/components/Forms/DragDrop";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    console.log("Mount");
    return () => {
      console.log("Unmount");
    };
  }, []);

  const FinalBlock = useMemo<ReactNode>(() => {
    console.log(file1);
    if (mode !== FormFieldMode.view) return <span>no</span>;
    const previews = [file1, file2, file3, file4]
      .filter((file) => !!file)
      .map((file) => {
        if (file.type.match(/image\/*/gi)) {
          return URL.createObjectURL(file);
        } else {
          return "https://obeliski.ru/ymaxiProduct/billing2/php/modules/retouch/images/arhive.png";
        }
      });
    return (
      <div>
        <h3>Прикрепленные файлы</h3>
        <div className={`grid grid-cols-${previews.length} gap-4 w-96 h-32`}>
          {previews.map((preview, ind) => (
            <div
              className={
                "border flex justify-center bg-center bg-contain bg-no-repeat"
              }
              key={`p${ind}`}
              style={{ backgroundImage: `url(${preview})` }}
            />
          ))}
        </div>
      </div>
    );
  }, [file1, file2, file3, file4, mode]);

  return (
    <>
      <div
        className={`grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 h-full md:h-1/2${
          mode !== FormFieldMode.input ? " hidden" : ""
        }`}
      >
        <DragDrop
          hidden={mode !== FormFieldMode.input}
          select={setFile1}
          accept={acceptImageFormats}
        />
        <DragDrop
          hidden={mode !== FormFieldMode.input}
          select={setFile2}
          accept={acceptImageFormats}
        />
        <DragDrop
          hidden={mode !== FormFieldMode.input}
          select={setFile3}
          accept={acceptImageFormats}
        />
        <DragDrop
          hidden={mode !== FormFieldMode.input}
          select={setFile4}
          accept={acceptImageFormats}
        />
      </div>
      <div
        className={`w-full text-center${
          mode !== FormFieldMode.input ? " hidden" : ""
        }`}
      >
        <button
          className={
            "bg-foreground text-white px-4 py-2 mt-4 w-full uppercase disabled:opacity-50"
          }
          disabled={!hasAnyOfFiles}
          onClick={(ev) => {
            ev.preventDefault();
            next();
          }}
          title={hasAnyOfFiles ? "Далее" : "Не выбрано ни одного файла"}
        >
          Далее
        </button>
      </div>
      {FinalBlock}
    </>
  );
};

export default FilesStep;
