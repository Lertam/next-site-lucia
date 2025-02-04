import BackLink from "@/components/Common/BackLink";
import { RetouchVariant } from "@prisma/client";
import EditRetouchVariantForm from "../../../_components/EditVariant";
import { getRetouchVariant } from "../../../_queries/get-retouch-variants";
import { Metadata } from "next";

// TODO: Генерировать на основании редактирование/создание
export const metadata: Metadata = {
  title: "Создание варианта услуги",
};

const EditRetouchVariantPage = async ({
  params: { variantId, serviceId },
}: {
  params: { variantId: string; serviceId: string };
}) => {
  let variant: RetouchVariant | undefined;
  if (variantId !== "add") {
    variant = await getRetouchVariant(variantId);
  }
  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>
        {variantId === "add"
          ? "Создание варианта услуги"
          : "Редактирование варианта услуги"}
      </h1>
      <BackLink />
      <EditRetouchVariantForm
        serviceId={serviceId}
        variantId={variantId}
        variant={variant}
      />
    </div>
  );
};

export default EditRetouchVariantPage;
