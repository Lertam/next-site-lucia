import BackLink from "@/components/Common/BackLink";
import EditFAQForm from "../_components/EditFAQ";

const AddFAQPage = async () => {
  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>Создание вопроса</h1>
      <BackLink />
      <EditFAQForm />
    </div>
  );
};

export default AddFAQPage;
