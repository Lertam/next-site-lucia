import { getAuth } from "@/features/auth/queries/get-auth";
import CardButton from "./CardButton";
import CardWrapper from "./CardWrapper";
import { UserRole } from "@prisma/client";

const ProfilePage = async () => {
  const { user } = await getAuth();
  return (
    <CardWrapper
      image={"/images/home/Profile.jpg"}
      title={"Кабинет пользователя"}
    >
      <div
        className={
          "flex flex-col items-center justify-center gap-2 w-full h-full"
        }
      >
        <CardButton text={"Кабинет"} />
        <CardButton text={"Моя касса"} link={"/billing"} />
        <CardButton text={"Сообщения"} />
        {user && user.role === UserRole.ADMIN && (
          <CardButton text={"Админка"} link={"/dashboard"} />
        )}
      </div>
    </CardWrapper>
  );
};

export default ProfilePage;
