import BackLink from "@/components/Common/BackLink";
import EditServiceForm from "@/features/services/components/EditService";
import { getRetouchService } from "@/features/services/queries/get-retouch-services";
import { RetouchService } from "@prisma/client";

const EditServicePage = async ({
  params: { serviceId },
}: {
  params: { serviceId: string };
}) => {

  let service: RetouchService | undefined;
  if (serviceId !== "add") {
    service = await getRetouchService(serviceId);
  }
  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>
        {serviceId === "add" ? "Создание услуги" : "Редактирование услуги"}
      </h1>
      <BackLink />
      <EditServiceForm id={serviceId} service={service} />
    </div>
  );
};

export default EditServicePage;
