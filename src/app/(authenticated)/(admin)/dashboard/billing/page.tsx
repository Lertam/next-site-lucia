import BackLink from "@/components/Common/BackLink";
import { getBillings } from "./_query";
import DatePanel from "./_components/DatePane";
import BillingRow from "./_components/BillingRow";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Касса админа",
};

const refetchBillings = async () => {
  "use server";
  revalidatePath("/dashboard/billing");
};

const BillingPage = async (props: {
  searchParams?: Promise<{ startDate: Date; endDate: Date }>;
}) => {
  const { searchParams } = await props;
  const dayMonthAgo = new Date();
  dayMonthAgo.setMonth(dayMonthAgo.getMonth() - 1);

  const startDate = (await searchParams)?.startDate || dayMonthAgo;
  const endDate = (await searchParams)?.endDate || new Date();

  const orders = await getBillings(startDate.toString(), endDate.toString());

  // TODO Потестировать смену даты
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Касса админа
        </h1>
        <BackLink href={"/dashboard"} />
      </div>
      <div className={"flex items-center justify-between"}>
        <button className={"main-button"} onClick={refetchBillings}>
          Обновить
        </button>
        <DatePanel />
        <Link href={"/dashboard/billing/add"} className={"main-button"}>
          Создать
        </Link>
      </div>
      <table className={"mt-10 gborder-gray-800 gap-2 border-spacing-4"}>
        <tbody>
          {orders.map((order) => (
            <BillingRow key={`blngrw-${order.id}`} {...order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingPage;
