import FastWaysForm from "../../_components/FastWaysForm";
import { getPaymentGatewaysSettings } from "../../../../../../billing/_queries";
import Modal from "@/components/Common/ModalWrapper";

export const metadata = {
  title: "Создание кнопки быстрой оплаты",
};

const FastWayAddModal = async () => {
  const settings = await getPaymentGatewaysSettings();
  return (
    <Modal>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Создание кнопки быстрой оплаты
        </h1>
      </div>
      <div className={""}>
        <FastWaysForm settings={settings} />
      </div>
    </Modal>
  );
};

export default FastWayAddModal;
