"use client";
import { FC, useEffect, useRef, useState } from "react";
import { saveStandart } from "../../[userId]/_actions";

const RetouchStandard: FC<{ image: string | null; userId: string }> = ({
  image,
  userId,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string>(image ? image : "");

  useEffect(() => {
    if (inputRef.current && editMode) {
      inputRef.current.click();
    }
  }, [editMode]);

  return (
    <div className={"flex flex-col items-center"}>
      <h3>Эталон ретуши профиля</h3>
      {/* TODO Add adaptive to image */}
      {editMode ? (
        <div>
          <input
            hidden
            type={"file"}
            ref={inputRef}
            accept={"image/*"}
            max={1}
            onChange={(ev) => {
              const files = ev.target.files;
              if (files && files.length > 0) {
                const file = files[0];
                const reader = new FileReader();
                reader.onload = () => {
                  setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          {image !== preview && (
            <button
              className={"mt-4"}
              onClick={(ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                const files = inputRef.current?.files;
                if (files) {
                  const file = files.item(0);
                  if (file) {
                    saveStandart(userId, file).then(() => setEditMode(false));
                  }
                }
              }}
            >
              Сохранить
            </button>
          )}
        </div>
      ) : (
        <button onClick={() => setEditMode(true)}>Сменить</button>
      )}
      {preview || image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          // width={150}
          // height={124}
          className={"max-w-36 max-h-32"}
          alt={`Аватар`}
          onClick={() => setEditMode(true)}
        />
      ) : (
        <div
          className={
            "flex flex-col justify-center items-center w-36 h-32 border border-foreground text-sm cursor-pointer"
          }
          onClick={() => setEditMode(true)}
        >
          <span>Выберите файл</span>
        </div>
      )}
    </div>
  );
};

export default RetouchStandard;
