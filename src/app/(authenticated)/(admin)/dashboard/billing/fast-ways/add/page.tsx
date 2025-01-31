import BackLink from "@/components/Common/BackLink";
import { getPaymentGatewaysSettings } from "../../../../../billing/_queries";
import FastWaysForm from "../_components/FastWaysForm";

export const metadata = {
  title: "Создание кнопки быстрой оплаты",
};

const FastWayAddPage = async () => {
  const settings = await getPaymentGatewaysSettings();
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Создание кнопки быстрой оплаты
        </h1>
        <BackLink href={"/dashboard/billing/fast-ways"} />
      </div>
      <div className={""}>
        <FastWaysForm settings={settings} />
      </div>
    </div>
  );
};

export default FastWayAddPage;
