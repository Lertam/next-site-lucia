"use client";
import { FC, useActionState } from "react";
import Info from "./Info";
import Access from "./Access";
import Roles from "./Roles";
import { UserRole } from "@prisma/client";
import SubmitButton from "@/components/Forms/SubmitButton";
import { UserAccess } from "@/lib/utils";
import { saveUserSettings } from "../../[userId]/_actions/save-user-settings";

const AdminForm: FC<{
  userId: string;
  meta: { created: Date | null; login: Date | null };
  role: UserRole;
  access: UserAccess;
  label: string;
}> = ({ meta, role, access, label, userId }) => {
  const actionData = useActionState(saveUserSettings, { ok: false });
  return (
    <form
      action={actionData[1]}
      className={
        "mt-4 w-full border h-full mb-4 p-6 border-foreground xl:max-h-80"
      }
    >
      <input name={"userId"} type={"hidden"} value={userId} />
      <div className={"font-bold text-center text-lg"}>Администрирование</div>
      <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-4"}>
        <Info {...meta} />
        <div className={"flex flex-col gap-4 items-stretch"}>
          <span className={"font-bold text-center"}>Ретушь</span>
          <div className={"text-center"}>Метка для ретушера</div>
          <textarea
            name={"label"}
            defaultValue={label}
            className={"w-60 h-20 mx-auto"}
          />
        </div>
        <Access {...access} />
        <Roles role={role} />
      </div>
      <div className={"flex justify-center mt-4"}>
        <SubmitButton />
      </div>
    </form>
  );
};

export default AdminForm;
