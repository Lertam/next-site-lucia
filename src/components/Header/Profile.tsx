import Image from "next/image";
import ProfileImage from "./profile.jpg";
import { FC } from "react";
import Link from "next/link";
import { getAuth } from "@/features/auth/queries/get-auth";

const Profile = async () => {
  const { user } = await getAuth();
  if (!user) return <LoginCircle />;

  return (
    <Link href={"/profile"}>
      <Image
        src={ProfileImage}
        width={98}
        height={98}
        alt={user.email ? `Профиль ${user.email}` : "Profile"}
        className={"rounded-full"}
      />
    </Link>
  );
};

export const LoginCircle: FC = () => {
  return (
    <Link
      className={
        "w-[98px] h-[98px] border-white border rounded-full flex flex-col justify-center align-middle"
      }
      href={"/auth/signin"}
    >
      <span className={"h-min text-center uppercase"}>Войти</span>
    </Link>
  );
};

export default Profile;
