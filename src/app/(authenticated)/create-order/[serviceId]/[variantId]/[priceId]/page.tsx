import { getRetouchPrice } from "@/app/(authenticated)/(admin)/dashboard/services/_queries/get-retouch-prices";
import { getRetouchService } from "@/app/(authenticated)/(admin)/dashboard/services/_queries/get-retouch-services";
import { getRetouchVariant } from "@/app/(authenticated)/(admin)/dashboard/services/_queries/get-retouch-variants";
import Details from "./_details";
import { redirect } from "next/navigation";

const Retouchers = async ({
  params: { serviceId, variantId, priceId },
  searchParams: { step },
}: {
  params: {
    serviceId: string;
    variantId: string;
    priceId: string;
  };
  searchParams: { step?: string };
}) => {
  if (step) {
    // TODO Прикрыть прямую загрузку страниц типа ?step=2
    // redirect(`/create-order/${serviceId}/${variantId}/${priceId}`);
  }
  const service = await getRetouchService(serviceId);
  const variant = await getRetouchVariant(variantId);
  const price = await getRetouchPrice(priceId);

  return (
    <div className={"mt-4 h-full pb-10"}>
      <h2>Шаг 4. Детали</h2>
      <Details service={service} variant={variant} price={price} />
    </div>
  );
};

export default Retouchers;
