import Link from "next/link";

const ProtectedDashboardPage = () => {
  return (
    <>
      <h1 className={"text-center font-bold mt-4 uppercase"}>
        Панель управления
      </h1>
      <div>
        <h1 className={"font-bold"}>Услуги</h1>
        <Link href={"/dashboard/services"}>Услуги и цены</Link>
      </div>
      <div>
        <h1 className={"font-bold"}>Остальное</h1>

        <Link href={"/dashboard/faq"}>Вопросы и ответы</Link>
      </div>
    </>
  );
};

export default ProtectedDashboardPage;
