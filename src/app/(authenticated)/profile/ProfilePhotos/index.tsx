import ProfileImage from "./ProfileImage";
import RetouchStandard from "./RetouchStandard";

const ProfilePhotos = () => {
  return (
    <div
      className={"border border-black flex flex-col p-3"}
      style={{ flexGrow: 1 }}
    >
      <ProfileImage />
      <RetouchStandard />
    </div>
  );
};

export default ProfilePhotos;
