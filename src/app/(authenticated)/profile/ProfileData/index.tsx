// "use client";
// import { useState } from "react";
import ProfileInfo from "./Info";

const ProfileData = () => {
  // TODO Implament edit mode
  // const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <div
      style={{ flexGrow: 3 }}
      className={"border border-black flex flex-col items-center"}
    >
      <div className={"flex"}>
        <h3>Данные профиля</h3>
        {/* {editMode ? (
          <button
            className={"ml-2 text-xs text-gray-500"}
            onClick={() => setEditMode(false)}
          >
            Отмена
          </button>
        ) : (
          <button
            className={"ml-2 text-xs text-gray-500"}
            onClick={() => setEditMode(true)}
          >
            Редактировать
          </button>
        )}
      </div>
      {!editMode && <ProfileInfo />} */}
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ProfileData;
