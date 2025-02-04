"use client";
import { FC, useEffect, useRef, useState } from "react";
import { saveAvatar } from "../../[userId]/_actions";

const ProfileImage: FC<{ userId: string; image: string }> = ({
  userId,
  image,
}) => {
  // TODO Проверить права на смену почты, картинок и т.п.
  const [editMode, setEditMode] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string>(image);

  useEffect(() => {
    if (inputRef.current && editMode) {
      inputRef.current.click();
    }
  }, [editMode]);

  return (
    <div className={"flex flex-col items-center"}>
      <h3>Фото профиля</h3>
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
                    saveAvatar(userId, file).then(() => setEditMode(false));
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={preview}
        // width={150}
        // height={124}
        className={"max-w-36 max-h-32"}
        alt={`Аватар`}
        onClick={() => setEditMode(true)}
      />
    </div>
  );
};

export default ProfileImage;
