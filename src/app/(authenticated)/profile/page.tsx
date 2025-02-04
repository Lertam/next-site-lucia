import { getAuth } from "@/features/auth/queries/get-auth";
import ProfileData from "./_components/ProfileData";
import ProfilePhotos from "./_components/ProfilePhotos";
import ProfileStatistic from "./_components/Statistic";
import { UserRole } from "@prisma/client";
import AdminBlock from "./_components/AdminBlock";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata:Metadata = {
  title: "Профиль"
}

const ProfilePage = async () => {
  const { user } = await getAuth();
  if(!user) {
    return redirect('/auth/sign-in')
  }
  return (
    <>
      <h1 className={"text-center font-bold mt-4 uppercase"}>Кабинет</h1>
      <div className={"flex gap-4 flex-auto"}>
        <ProfileData />
        <ProfilePhotos />
        <ProfileStatistic />
      </div>
      {/* {user && user.role === UserRole.ADMIN && <AdminBlock />} */}
    </>
  );
};

export default ProfilePage;
