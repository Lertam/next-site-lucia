import BackLink from "@/components/Common/BackLink";
import { getRetouchService } from "@/app/(authenticated)/(admin)/dashboard/services/_queries/get-retouch-services";
import EditServiceForm from "../../_components/EditService";

const EditServicePage = async ({
  params: { serviceId },
}: {
  params: { serviceId: string };
}) => {
  const service = await getRetouchService(serviceId);

  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>
        {serviceId === "add" ? "Создание услуги" : "Редактирование услуги"}
      </h1>
      <BackLink />
      <EditServiceForm service={service} />
    </div>
  );
};

export default EditServicePage;
