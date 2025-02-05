import { getAuth } from "@/features/auth/queries/get-auth";
import { PencilIcon } from "@heroicons/react/24/outline";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { getUserInfo } from "../../[userId]/_queries";
import { FC } from "react";

const ProfileInfo: FC<{ userId: string }> = async ({ userId }) => {
  const { user } = await getAuth();
  if (!user) return null;
  const data = await getUserInfo(userId);

  return (
    <div className={"flex flex-col gap-4 mt-4 items-center"}>
      <div className={"flex gap-2"}>
        <span>Логин: </span>
        <span className={"font-bold"}>{data.login}</span>
      </div>
      <div className={"flex gap-2 items-center"}>
        <span>Email: </span>
        <span className={"font-bold flex gap-2"}>
          {data.email}
          {user.role === UserRole.ADMIN && (
            <Link
              href={`/profile/${userId}/change-email`}
              className={"flex flex-col items-center justify-center"}
            >
              <PencilIcon className={"w-3 h-3"} />
            </Link>
          )}
        </span>
      </div>
      <div>
        <span>Телефон: </span>
        <span className={"font-bold"}>{data.phone}</span>
      </div>
      <div>
        <Link
          href={`/profile/${userId}/change-password`}
          className={"underline"}
        >
          Смена пароля
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;
