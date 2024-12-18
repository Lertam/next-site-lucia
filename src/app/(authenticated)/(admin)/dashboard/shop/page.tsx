import BackLink from "@/components/Common/BackLink";
import Link from "next/link";
import { getShopItems, getShopItemsCount } from "./_queries";
import Search from "@/components/Common/Search";
import CategorySwitcher from "@/app/shop/_components/CategorySwitcher";
import { getCategories } from "./categories/_queries";
import Pagination from "@/components/Common/Pagination";
import ItemCard from "./_components/ItemCard";

const ShopSettings = async (props: {
  searchParams?: Promise<{ query?: string; page?: string; category?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const category = searchParams?.category || "all";
  const currentPage = Number(searchParams?.page) || 1;

  const items = await getShopItems(currentPage, query, category);
  const totalPages = await getShopItemsCount(query, category);

  const categories = await getCategories();

  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Управление товарами
        </h1>
        <BackLink href={"/dashboard"} />
        <Link href={"/dashboard/shop/add"} className={"absolute right-0 top-0"}>
          + Создать
        </Link>
      </div>
      <div className={"flex gap-10"}>
        <CategorySwitcher categories={categories} />
        <Search placeholder={"Поиск"} />
      </div>
      <div className={"mt-4"}>
        {items.map((item) => (
          <ItemCard key={`shptm${item.id}`} {...item} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className={"mx-auto"}>
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default ShopSettings;
