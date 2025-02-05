import RadioInput from "@/components/Forms/RadioInput";
import { UserRole } from "@prisma/client";
import { FC } from "react";

const Roles: FC<{ role: UserRole }> = ({ role }) => {
  return (
    <div className={"flex flex-col gap-4 items-stretch"}>
      <span className={"font-bold text-center"}>Роли</span>
      <div className={"flex flex-col items-center"}>
        <div className={"flex flex-col gap-4"}>
          <RadioInput
            id={`role_${UserRole.ADMIN}`}
            name={"role"}
            value={UserRole.ADMIN}
            text={"Администратор"}
            inputProps={{ defaultChecked: role === UserRole.ADMIN }}
          />
          <RadioInput
            id={`role_${UserRole.RETOUCHER}`}
            name={"role"}
            value={UserRole.RETOUCHER}
            text={"Ретушер"}
            inputProps={{ defaultChecked: role === UserRole.RETOUCHER }}
          />
          <RadioInput
            id={`role_${UserRole.USER}`}
            name={"role"}
            value={UserRole.USER}
            text={"Пользователь"}
            inputProps={{ defaultChecked: role === UserRole.USER }}
          />
        </div>
      </div>
    </div>
  );
};

export default Roles;
