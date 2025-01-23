import BackLink from "@/components/Common/BackLink";
import { getBillings } from "./_query";
import DatePanel from "./_components/DatePane";
import BillingRow from "./_components/BillingRow";

const BillingPage = async (props: {
  searchParams?: Promise<{ startDate: Date; endDate: Date }>;
}) => {
  const { searchParams } = await props;
  const dayMonthAgo = new Date();
  dayMonthAgo.setMonth(dayMonthAgo.getMonth() - 1);

  const startDate = (await searchParams)?.startDate || dayMonthAgo;
  const endDate = (await searchParams)?.endDate || new Date();

  const orders = await getBillings(startDate, endDate);
  // TODO Потестировать смену даты
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Касса админа
        </h1>
        <BackLink href={"/dashboard"} />
      </div>
      <DatePanel />
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
