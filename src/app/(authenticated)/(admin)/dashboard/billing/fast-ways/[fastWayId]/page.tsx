import BackLink from "@/components/Common/BackLink";
import { getPaymentGatewaysSettings } from "../../../../../billing/_queries";
import FastWaysForm from "../_components/FastWaysForm";
import { getFastWay } from "../_queries";

export const metadata = {
  title: "Редактирование кнопки быстрой оплаты",
};

const FastWayEditPage = async ({
  params,
}: {
  params: Promise<{ fastWayId: string }>;
}) => {
  const { fastWayId } = await params;
  const settings = await getPaymentGatewaysSettings();
  const fastWay = await getFastWay(fastWayId);

  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Редактирование кнопки быстрой оплаты
        </h1>
        <BackLink href={"/dashboard/billing/fast-ways"} />
      </div>
      <div className={""}>
        <FastWaysForm settings={settings} fastWay={fastWay} />
      </div>
    </div>
  );
};

export default FastWayEditPage;
