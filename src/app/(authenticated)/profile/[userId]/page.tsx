import { getAuth } from "@/features/auth/queries/get-auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import ProfileData from "../_components/ProfileData";
import ProfilePhotos from "../_components/ProfilePhotos";
import ProfileStatistic from "../_components/Statistic";
import { Metadata } from "next";
import { getUser } from "./_queries";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}): Promise<Metadata> => {
  const user = await getUser((await params).userId);
  return { title: `Профиль ${user?.login}` };
};

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
        <ProfilePhotos userId={userId} />
        <ProfileStatistic userId={userId} />
      </div>
      {/* {user && user.role === UserRole.ADMIN && <AdminBlock />} */}
    </>
  );
};

export default ProfilePage;
