import { getRetouchPrices } from "@/app/(authenticated)/(admin)/dashboard/services/_queries/get-retouch-prices";
import { getRetouchVariant } from "@/app/(authenticated)/(admin)/dashboard/services/_queries/get-retouch-variants";
import { formatMoney } from "@/lib/utils/format";
import Link from "next/link";

const Mode = async ({
  params: { serviceId, variantId },
}: {
  params: { serviceId: string; variantId: string };
}) => {
  const prices = await getRetouchPrices(serviceId);
  const variant = await getRetouchVariant(variantId);

  return (
    <div className={"mt-4"}>
      <h2>Шаг 3. Выберите режим заказа</h2>
      <div className={"gap-4 mt-4 flex justify-evenly flex-wrap mb-20"}>
        {prices.map((price) => (
          <Link
            href={`/create-order/${serviceId}/${variantId}/${price.id}`}
            key={`rp-${price.id}`}
            className={
              "p-2 px-4 border border-foreground rounded-lg text-center"
            }
          >
            <div className={"font-bold mb-2"}>{price.title}</div>
            <div>{formatMoney(price.price + variant.price)}.</div>
          </Link>
        ))}
      </div>
      <div>
        {prices.map((price) => (
          <p key={`rpdesc-${price.id}`}>
            <span className={"font-bold"}>{price.title}</span> - {price.description}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Mode;
