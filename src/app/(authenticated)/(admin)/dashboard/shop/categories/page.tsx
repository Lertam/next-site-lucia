import BackLink from "@/components/Common/BackLink";
import Link from "next/link";
import { getCategories } from "./_queries";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const ShopCategoriesSettings = async () => {
  const categories = await getCategories();
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Управление категориями магазина
        </h1>
        <BackLink href={"/dashboard"} />
        <Link
          href={"/dashboard/shop/categories/add"}
          className={"absolute right-0 top-0"}
        >
          + Создать
        </Link>
      </div>
      {categories?.map((c) => (
        <div
          key={`cat${c.id}`}
          className={
            "flex justify-between p-1 border mt-2 border-foreground rounded items-center"
          }
        >
          <span>{c.name}</span>
          <div className={"flex gap-4 items-center"}>
            <span>{c.weight}</span>
            <Link href={`/dashboard/shop/categories/${c.id}`}>
              <PencilSquareIcon className={'w-6 text-foreground'}/>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopCategoriesSettings;
