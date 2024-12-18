import BackLink from "@/components/Common/BackLink";
import { prisma } from "@/lib/prisma";
import CategorySwitcher from "../(authenticated)/(admin)/dashboard/shop/_components/CategorySwitcher";
import Search from "@/components/Common/Search";
import Sorting from "./_components/Sorting";
import { getShopItems } from "./_queries";

const getCategories = async () => {
  "use server";
  return prisma.shopCategory.findMany({ orderBy: { weight: "desc" } });
};

export const metadata = {
  title: "Магазин картинок",
};

const ShopPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    category: string;
    sorting: "popular" | "id_asc" | "id_desc" | "price_asc" | "price_desc";
    query: string;
  }>;
}) => {
  const categories = await getCategories();

  const { category, query, sorting, page } = await searchParams;
  const currentPage = Number(page);

  const items = await getShopItems(category, sorting, query, currentPage);
  return (
    <div className={"h-full w-full m-auto flex flex-col mt-4 relative"}>
      <h1 className={"text-center font-bold uppercase relative"}>
        Магазин картинок
      </h1>
      <BackLink />
      <div className={"mt-4 grid grid-cols-3 gap-4"}>
        <CategorySwitcher categories={categories} />
        <Sorting />
        <Search placeholder={"Название или ID"} />
      </div>
      <div className={"mt-4 grid grid-cols-8 gap-4"}>
        {items.map((item) => (
          <div key={`img${item.id}`}>
            <img
              key={item.id}
              src={`/modules/shop/previews/${item.preview}`}
              alt={item.name}
            />
            <span>{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
