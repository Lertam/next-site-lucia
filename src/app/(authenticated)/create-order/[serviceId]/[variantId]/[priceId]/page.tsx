import { getRetouchPrice } from "@/app/(authenticated)/(admin)/dashboard/services/_queries/get-retouch-prices";
import { getRetouchService } from "@/app/(authenticated)/(admin)/dashboard/services/_queries/get-retouch-services";
import { getRetouchVariant } from "@/app/(authenticated)/(admin)/dashboard/services/_queries/get-retouch-variants";
import Details from "./_details";

const Retouchers = async ({
  params: { serviceId, variantId, priceId },
}: {
  params: {
    serviceId: string;
    variantId: string;
    priceId: string;
  };
}) => {
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
