import Link from "next/link";
import { FC } from "react";
import { getRetouchVariants } from "../_queries/get-retouch-variants";
import RetouchVariantCard from "../_components/VariantCard";

const RetouchVariants: FC<{ serviceId: string }> = async ({ serviceId }) => {
  const variants = await getRetouchVariants(serviceId);
  return (
    <div className={"relative mt-10 mb-4"}>
      <h1 className={"font-bold uppercase mb-4"}>Варианты оформления</h1>
      <Link
        href={`/dashboard/services/${serviceId}/variants/add`}
        className={"absolute top-0 right-0"}
      >
        + Добавить
      </Link>
      {variants.length === 0 && <div className={"text-center"}>Пока нет</div>}
      <div className={"flex flex-wrap gap-4"}>
        {variants.map((variant) => (
          <RetouchVariantCard {...variant} key={`rvc-${variant.id}`} />
        ))}
      </div>
    </div>
  );
};

export default RetouchVariants;
