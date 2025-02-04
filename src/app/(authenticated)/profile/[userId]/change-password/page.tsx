import BackLink from "@/components/Common/BackLink";
import { getAuth } from "@/features/auth/queries/get-auth";
import { UserRole } from "@prisma/client";
import { Metadata } from "next";
import { getUser } from "../_queries";
import ChangePasswordForm from "./ChangePasswordForm";

export const metadata: Metadata = {
  title: "Смена пароля",
};

const ChangeEmailPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;

  const { user } = await getAuth();
  if (!user || (user.id !== userId && user.role !== UserRole.ADMIN)) {
    return <div>You are not allowed to change this user&apos;s email</div>;
  }

  const userToEdit = await getUser(userId);
  if (!userToEdit) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Смена пароля
        </h1>
        <BackLink />
      </div>
      <div className={"flex flex-col max-w-64 mx-auto my-4"}>
        <ChangePasswordForm userId={userToEdit.id} />
      </div>
    </div>
  );
};

export default ChangeEmailPage;
