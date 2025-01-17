import { getFastWay } from "../../_queries";
import FastWaysForm from "../../_components/FastWaysForm";
import { getPaymentGatewaysSettings } from "../../../gateways/_queries";
import Modal from "@/components/Common/ModalWrapper";

export const ModalFastWayForm = async ({
  params,
}: {
  params: Promise<{ fastWayId: string }>;
}) => {
  const { fastWayId } = await params;
  const fastWay = await getFastWay(fastWayId);

  const settings = await getPaymentGatewaysSettings();

  return (
    <Modal>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Редактирование
        </h1>
      </div>
      <div className={""}>
        <FastWaysForm settings={settings} fastWay={fastWay} />
      </div>
    </Modal>
  );
};

export default ModalFastWayForm;
