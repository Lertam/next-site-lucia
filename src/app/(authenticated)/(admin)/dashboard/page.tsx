import Link from "next/link";

const ProtectedDashboardPage = () => {
  return (
    <>
      <h1 className={"text-center font-bold mt-4 uppercase"}>
        Панель управления
      </h1>
      <div className={"grid grid-cols-2 gap-4 mt-4"}>
        <div>
          <h1 className={"font-bold"}>Услуги</h1>
          <Link href={"/dashboard/services"}>Услуги и цены</Link>
        </div>
        <div>
          <h1 className={"font-bold"}>Новости</h1>

          <div className={"flex flex-col"}>
            <Link href={"/dashboard/news"}>Все новости</Link>
            <Link href={"/dashboard/news/surveys"}>Опросы</Link>
          </div>
        </div>

        <div>
          <h1 className={"font-bold"}>Магазин</h1>

          <div className={"flex flex-col"}>
            <Link href={"/dashboard/shop/categories"}>Категории</Link>
            <Link href={"/dashboard/shop"}>Картинки</Link>
          </div>
        </div>

        <div>
          <h1 className={"font-bold"}>Касса</h1>

          <div className={"flex flex-col"}>
            <Link href={"/dashboard/billing/gateways"}>Агрегаторы</Link>
          </div>
        </div>

        <div>
          <h1 className={"font-bold"}>Остальное</h1>

          <div className={"flex flex-col"}>
            <Link href={"/dashboard/faq"}>Вопросы и ответы</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedDashboardPage;
