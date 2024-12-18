import BackLink from "@/components/Common/BackLink";
import EditShopItemForm from "../_components/EditForm";
import { getCategories } from "../categories/_queries";

export const metadata = {
  title: "Создание товара",
};

const AddItemPage = async () => {
  const categories = await getCategories();

  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Создание товара
        </h1>
        <BackLink href={"/dashboard/shop"} />
      </div>
      <EditShopItemForm categories={categories} />
    </div>
  );
};

export default AddItemPage;
