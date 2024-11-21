import BackLink from "@/components/Common/BackLink";
import EditServiceForm from "../_components/EditService";

const AddServicePage = async () => {
  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>Создание услуги</h1>
      <BackLink />
      <EditServiceForm />
    </div>
  );
};

export default AddServicePage;
