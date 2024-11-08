import {
  Dispatch,
  DragEventHandler,
  FC,
  SetStateAction,
  useRef,
  useState,
} from "react";

const DragDrop: FC<{
  accept?: string | string[];
  hidden?: boolean;
  select: Dispatch<SetStateAction<File | null>>;
}> = ({ accept, hidden, select }) => {
  const [isDrag, setDrag] = useState<boolean>(false);

  const [preview, setPreview] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

  const handleDrag: DragEventHandler<HTMLDivElement> = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (ev.type === "dragenter" || ev.type === "dragover") {
      setDrag(true);
    } else if (ev.type === "dragleave") {
      setDrag(false);
    }
  };

  const handleFile = (file?: File) => {
    if (!file) {
      setPreview(null);
      setFilename(null);
      select(null);
      return;
    }
    if (accept) {
      if (typeof accept === "string") {
        if (accept !== file.type) {
          alert("Неверный тип файла");
          select(null);
          return;
        }
      } else {
        if (!accept.includes(file.type)) {
          alert("Неверный тип файла");
          select(null);
          return;
        }
      }
    }

    if (file.type.match(/image\/*/gi)) {
      setPreview(URL.createObjectURL(file));
    } else {
      setFilename(file.name);
    }
    select(file);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={
        "border border-foreground relative flex justify-center items-center cursor-pointer bg-no-repeat bg-center bg-contain min-h-32" +
        (hidden ? " hidden" : "")
      }
      onClick={() => {
        inputRef.current?.click();
      }}
      onDragEnter={handleDrag}
      style={{ backgroundImage: preview ? `url('${preview}')` : undefined }}
    >
      {/* {preview && <img src={preview} className={""} />} */}

      <input
        type={"file"}
        name={"retouchFile"}
        hidden
        ref={inputRef}
        accept={
          typeof accept === "string" || !accept
            ? accept
            : (accept as string[]).join(",")
        }
        onChange={(ev) => {
          if (ev.target.files) {
            handleFile(ev.target.files[0]);
          }
        }}
      />
      {filename ? (
        <span className={"text-center"}>{filename}</span>
      ) : (
        !preview && (
          <span className={"text-center"}>
            Нажмите для выбора файла <br />
            или <br />
            переместите файл сюда
          </span>
        )
      )}
      {isDrag && (
        <div
          className={
            "absolute w-full h-full top-0 left-0 bg-foreground text-white flex justify-center items-center"
          }
          onDrop={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            setDrag(false);
            console.log("drop", ev.dataTransfer.files);
            if (ev.dataTransfer.files) {
              handleFile(ev.dataTransfer.files[0]);
            }
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
        >
          Оставьте файл здесь
        </div>
      )}
    </div>
  );
};

export default DragDrop;
