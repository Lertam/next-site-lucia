import BackLink from "@/components/Common/BackLink";
import Link from "next/link";

const ShopSettings = () => {
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Управление вопросами и ответами
        </h1>
        <BackLink href={"/dashboard"} />
        <Link href={"/dashboard/faq/add"} className={"absolute right-0 top-0"}>
          + Создать
        </Link>
      </div>
    </div>
  );
};

export default ShopSettings;