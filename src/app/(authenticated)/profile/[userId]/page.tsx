import { getAuth } from "@/features/auth/queries/get-auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import ProfileData from "../_components/ProfileData";
import ProfilePhotos from "../_components/ProfilePhotos";
import ProfileStatistic from "../_components/Statistic";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { user } = await getAuth();
  if (!user || user.role !== UserRole.ADMIN) {
    return redirect("/");
  }
  const { userId } = await params;

  return (
    <>
      <h1 className={"text-center font-bold mt-4 uppercase"}>Кабинет</h1>
      <div className={"flex gap-4 flex-auto"}>
        <ProfileData userId={userId} />
        <ProfilePhotos />
        <ProfileStatistic />
      </div>
      {/* {user && user.role === UserRole.ADMIN && <AdminBlock />} */}
    </>
  );
};

export default ProfilePage;
