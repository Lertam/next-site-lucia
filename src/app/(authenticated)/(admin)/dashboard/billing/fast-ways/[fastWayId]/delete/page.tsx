import { PaymentwayNames } from "@/lib/utils/contants";
import { getFastWay } from "../../_queries";
import { formatCurrency } from "@/lib/utils";
import DeleteButtons from "../../_components/DeleteButtons";

const DeleteFastWay = async ({
  params,
}: {
  params: Promise<{ fastWayId: string }>;
}) => {
  const { fastWayId } = await params;
  const fastWay = await getFastWay(fastWayId);
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Удаление кнопки быстрой оплаты
        </h1>
      </div>
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
    </div>
  );
};

export default DeleteFastWay;
