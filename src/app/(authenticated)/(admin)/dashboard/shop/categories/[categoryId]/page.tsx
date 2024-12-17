import BackLink from "@/components/Common/BackLink";
import EditShopCategoryForm from "../_categories/EditShopCategoryForm";
import { getCategory } from "../_queries";

export const metadata = {
  title: "Редактирование категории",
};

const EditShopCategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;
  const category = await getCategory(categoryId);
  if (!category) {
    throw new Error("Cannot find category");
  }
  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>
        Редактирование категории
      </h1>
      <BackLink />
      <EditShopCategoryForm category={category}/>
    </div>
  );
};

export default EditShopCategoryPage;
