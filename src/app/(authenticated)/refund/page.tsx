import BackLink from "@/components/Common/BackLink";
import ManualSumForm from "./_components/ManualSumForm";
import { getFastWayPaymentSettings, getPaymentGatewaysSettings } from "../billing/_queries";

export const metadata = {
  title: "Пополнение счета",
};

const RefundPage = async () => {
  const settings = await getPaymentGatewaysSettings();
  const fastWays = await getFastWayPaymentSettings();
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Пополнить счет
        </h1>
        <BackLink href={"/"} />
      </div>
      <ManualSumForm paymentSettings={settings} fastWays={fastWays} />
    </div>
  );
};

export default RefundPage;
