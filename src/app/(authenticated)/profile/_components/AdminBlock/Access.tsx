import FormSwitch from "@/components/Forms/FormSwitch";
import { UserAccess } from "@/lib/utils";
import { FC } from "react";

const Access: FC<UserAccess> = ({ editor, messenger, orders, site }) => {
  return (
    <div className={"flex flex-col gap-4 items-stretch"}>
      <span className={"font-bold text-center"}>Доступы</span>
      <div className={"flex flex-col gap-2 mx-auto"}>
        <FormSwitch
          containerProps={{ className: "m-0" }}
          id={"editor_access"}
          name={"editor_access"}
          label={"Редактор"}
          defaultChecked={editor}
        />
        <FormSwitch
          containerProps={{ className: "m-0" }}
          id={"messenger_access"}
          name={"messenger_access"}
          label={"Сообщения"}
          defaultChecked={messenger}
        />
        <FormSwitch
          containerProps={{ className: "m-0" }}
          id={"orders_access"}
          name={"orders_access"}
          label={"Заказы"}
          defaultChecked={orders}
        />
        <FormSwitch
          containerProps={{ className: "m-0" }}
          id={"site_access"}
          name={"site_access"}
          label={"Сайт"}
          defaultChecked={site}
        />
      </div>
    </div>
  );
};

export default Access;
