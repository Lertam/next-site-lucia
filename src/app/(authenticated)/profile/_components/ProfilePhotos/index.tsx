import { FC } from "react";
import ProfileImage from "./ProfileImage";
import RetouchStandard from "./RetouchStandard";
import { getAuth } from "@/features/auth/queries/get-auth";
import { redirect } from "next/navigation";
import { getUserPhotos } from "../../[userId]/_queries";

const ProfilePhotos: FC<{ userId: string }> = async ({ userId }) => {
  const { user } = await getAuth();
  if (!user) {
    return redirect("/");
  }
  const { profile, standart } = await getUserPhotos(userId);
  return (
    <div className={"border border-black flex flex-col py-3 px-8"}>
      <ProfileImage image={profile} userId={userId} />
      <RetouchStandard image={standart} userId={userId} />
    </div>
  );
};

export default ProfilePhotos;
