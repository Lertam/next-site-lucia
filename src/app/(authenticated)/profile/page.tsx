import { getAuth } from "@/features/auth/queries/get-auth";
import ProfileData from "./ProfileData";
import ProfilePhotos from "./ProfilePhotos";
import ProfileStatistic from "./Statistic";
import { UserRole } from "@prisma/client";
import AdminBlock from "./AdminBlock";

const ProfilePage = async () => {
  const { user } = await getAuth();
  return (
    <>
      <h1 className={"text-center font-bold mt-4 uppercase"}>Кабинет</h1>
      <div className={"flex gap-x-4 gap-y-4"}>
        <ProfileData />
        <ProfilePhotos />
        <ProfileStatistic />
      </div>
      {user && user.role === UserRole.ADMIN && <AdminBlock />}
    </>
  );
};

export default ProfilePage;
