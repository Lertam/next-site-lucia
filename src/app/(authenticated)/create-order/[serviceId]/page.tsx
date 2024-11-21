import { getRetouchVariants } from "../../(admin)/dashboard/services/_queries/get-retouch-variants";
import VariantCard from "../_components/VariantCard";

const Variants = async ({
  params: { serviceId },
}: {
  params: { serviceId: string };
}) => {
  const variants = await getRetouchVariants(serviceId);
  return (
    <div className={"mt-4"}>
      <h2>Шаг 2. Выберите вариант оформления</h2>
      <div className={"flex flex-wrap gap-4 justify-center mt-4"}>
        {variants.map((variant) => (
          <VariantCard key={`rv-${variant.id}`} variant={variant} />
        ))}
      </div>
    </div>
  );
};

export default Variants;
