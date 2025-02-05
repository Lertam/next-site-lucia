import { FC } from "react";
import { getAdminData } from "../../[userId]/_queries";
import FormSwitch from "@/components/Forms/FormSwitch";
import Info from "./Info";

const AdminBlock: FC<{ userId: string }> = async ({ userId }) => {
  const { meta } = await getAdminData(userId);
  return (
    <div
      className={
        "mt-4 w-full border h-full mb-4 p-6 border-foreground xl:max-h-80"
      }
    >
      <div className={"font-bold text-center text-lg"}>Администрирование</div>
      <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-4"}>
        <Info {...meta} />
        <div className={"flex flex-col gap-4 items-stretch"}>
          <span className={"font-bold text-center"}>Ретушь</span>
          <div className={"text-center"}>Метка для ретушера</div>
        </div>
        <div className={"flex flex-col gap-4 items-stretch"}>
          <span className={"font-bold text-center"}>Доступы</span>
          <div className={"flex flex-col gap-2 mx-auto"}>
            <FormSwitch
              containerProps={{ className: "m-0" }}
              id={"editor_access"}
              name={"editor_access"}
              label={"Редактор"}
            />
            <FormSwitch
              containerProps={{ className: "m-0" }}
              id={"messenger_access"}
              name={"messenger_access"}
              label={"Сообщения"}
            />
            <FormSwitch
              containerProps={{ className: "m-0" }}
              id={"orders_access"}
              name={"orders_access"}
              label={"Заказы"}
            />
            <FormSwitch
              containerProps={{ className: "m-0" }}
              id={"site_access"}
              name={"site_access"}
              label={"Сайт"}
            />
          </div>
        </div>
        <div className={"flex flex-col gap-4 items-stretch"}>
          <span className={"font-bold text-center"}>Роли</span>
        </div>
      </div>
    </div>
  );
};

export default AdminBlock;
