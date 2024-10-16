import BackLink from "@/components/Common/BackLink";
import EditRetouchPriceForm from "@/features/services/components/RetouchServices/Prices/EditPrice";
import { getRetouchPrice } from "@/features/services/queries/get-retouch-prices";
import { RetouchPrice } from "@prisma/client";

const EditRetouchPricePage = async ({
  params: { priceId, serviceId },
}: {
  params: { priceId: string; serviceId: string };
}) => {
  let price: RetouchPrice | undefined;
  if (priceId !== "add") {
    price = await getRetouchPrice(priceId);
  }
  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>
        {priceId === "add" ? "Создание цены" : "Редактирование цены"}
      </h1>
      <BackLink />
      <EditRetouchPriceForm
        serviceId={serviceId}
        priceId={priceId}
        price={price}
      />
    </div>
  );
};

export default EditRetouchPricePage;
