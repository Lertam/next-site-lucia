import { getAuth } from "@/features/auth/queries/get-auth";
import Image from "next/image";

const ProfileImage = async () => {
  const { user } = await getAuth();
  if (!user) return null;

  return (
    <div className={"flex flex-col items-center"}>
      <h3>Фото профиля</h3>
      {/* TODO Add adaptive to image */}
      <Image
        src={"/profile.jpg"}
        width={150}
        height={124}
        alt={`Аватар ${user.login}`}
      />
    </div>
  );
};

export default ProfileImage;
