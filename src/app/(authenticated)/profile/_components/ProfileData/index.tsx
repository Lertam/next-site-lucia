import { FC } from "react";
import ProfileInfo from "./Info";

const ProfileData:FC<{userId?: string}> = ({userId}) => {
  // TODO Implament edit mode

  return (
    <div
      className={"border border-black flex flex-col items-center flex-1 p-6"}
    >
      <div className={"flex"}>
        <h3>Данные профиля</h3>
      </div>
      <ProfileInfo userId={userId}/>
    </div>
  );
};

export default ProfileData;
