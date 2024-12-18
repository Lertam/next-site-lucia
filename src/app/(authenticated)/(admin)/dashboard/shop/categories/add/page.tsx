import BackLink from "@/components/Common/BackLink";
import EditShopCategoryForm from "../_categories/EditShopCategoryForm";

export const metadata = {
  title: "Создание категории",
};

const AddNewsPage = async () => {
  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>Создание категории</h1>
      <BackLink />
      <EditShopCategoryForm />
    </div>
  );
};

export default AddNewsPage;
