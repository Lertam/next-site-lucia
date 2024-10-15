import BackLink from "@/components/Common/BackLink";
import EditServiceForm from "@/features/services/components/EditService";

const EditServicePage = async ({
  params: { serviceId },
}: {
  params: { serviceId: string };
}) => {
  console.log(serviceId);
  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>
        {serviceId === "add" ? "Создание услуги" : "Редактирование услуги"}
      </h1>
      <BackLink />
      <EditServiceForm id={serviceId} />
    </div>
  );
};

export default EditServicePage;
