import BackLink from "@/components/Common/BackLink";
import EditNewsForm from "../_components/EditNewsItem";

const AddNewsPage = async () => {
  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>Создание новости</h1>
      <BackLink />
      <EditNewsForm />
    </div>
  );
};

export default AddNewsPage;
