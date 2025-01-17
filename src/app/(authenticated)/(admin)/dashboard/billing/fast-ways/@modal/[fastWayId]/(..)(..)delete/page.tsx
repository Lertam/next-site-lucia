import { PaymentwayNames } from "@/lib/utils/contants";
import { formatCurrency } from "@/lib/utils";
import { getFastWay } from "../../../_queries";
import DeleteButtons from "../../../_components/DeleteButtons";

// TODO Realise and debug
const DeleteFastWayModal = async ({
  params,
}: {
  params: Promise<{ fastWayId: string }>;
}) => {
  const { fastWayId } = await params;
  const fastWay = await getFastWay(fastWayId);
  return (
    <div className={"w-80 mx-auto mt-10 flex flex-col items-center"}>
      <span className={"text-center text-lg"}>
        Вы уверены, что хотите удалить?
      </span>
      <div className={"grid grid-cols-2  gap-4 mt-5"}>
        <span>Агрегатор</span>
        <span>{PaymentwayNames[fastWay.way]}</span>
        <span>Сумма</span>
        <span>{formatCurrency(fastWay.sum)}</span>
        <span>Вес</span>
        <span>{fastWay.weight}</span>
      </div>
      <DeleteButtons id={fastWay.id} />
    </div>
  );
};

export default DeleteFastWayModal;
