import BackLink from "@/components/Common/BackLink";
import { getPaymentGatewaysSettings } from "./_queries";
import SettingsForm from "./_components/SettingsForm";

const PaymentGatewaySettings = async () => {
  const settings = await getPaymentGatewaysSettings();
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Настройка агрегаторов
        </h1>
        <BackLink href={"/dashboard"} />
      </div>
      <div className={"w-80 mx-auto mt-4"}>
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
};

export default PaymentGatewaySettings;
