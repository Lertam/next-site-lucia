import BackLink from "@/components/Common/BackLink";
import { getAuth } from "@/features/auth/queries/get-auth";
import { UserRole } from "@prisma/client";
import { Metadata } from "next";
import { getTotalUsersPage, getUsers } from "./_queries";
import Pagination from "@/components/Common/Pagination";
import Search from "@/components/Common/Search";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Пользователи",
};

const UsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  const { user: currentUser } = await getAuth();
  if (!currentUser || currentUser.role !== UserRole.ADMIN) {
    return <div>Not authorized</div>;
  }

  const { query, page } = await searchParams;
  console.log('sp', page);
  const users = await getUsers(query, Number(page) || 1);
  const totalUsersPage = await getTotalUsersPage(query);

  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Пользователи
        </h1>
        <BackLink href={"/dashboard"} />
      </div>
      <div className={"w-64 mx-auto"}>
        <Search placeholder={"Логин или пароль"} />
        <div className={"mt-6 flex flex-col gap-2"}>
          {users.map((user) => (
            <div className={"flex justify-between"} key={`usr${user.id}`}>
              <span>{user.login}</span>
              <Link target={"_blank"} href={`/profile/${user.id}`}>
                Профиль
              </Link>
            </div>
          ))}
        </div>
        {totalUsersPage > 1 && (
          <div className={"mx-auto w-full flex justify-center mt-4"}>
            <Pagination totalPages={totalUsersPage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
