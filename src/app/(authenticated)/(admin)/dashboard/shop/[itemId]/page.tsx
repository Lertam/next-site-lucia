import BackLink from "@/components/Common/BackLink";
import { getShopItem } from "../_queries";
import { getCategories } from "../categories/_queries";
import EditShopItemForm from "../_components/EditForm";

export const metadata = {
  title: "Редактирование товара",
};

const EditShopItemPage = async ({
  params,
}: {
  params: Promise<{ itemId: number }>;
}) => {
  const { itemId } = await params;
  const shopItem = await getShopItem(itemId);
  const categories = await getCategories();
  if (!shopItem) throw new Error("Cannot find shop item");

  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Редактирование товара
        </h1>
        <BackLink href={"/dashboard/shop"} />
      </div>
      <EditShopItemForm categories={categories} item={shopItem} />
    </div>
  );
};

export default EditShopItemPage;
