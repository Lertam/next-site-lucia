import BackLink from "@/components/Common/BackLink";
import BalanceBlock from "@/components/Home/BalanceBlock";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BillingRow from "./_components/BillingRow";
import { revalidatePath } from "next/cache";
import { getAuth } from "@/features/auth/queries/get-auth";
import DatePanel from "../(admin)/dashboard/billing/_components/DatePane";

export const metadata = {
  title: "Моя касса",
};

const getBillings = async (_startDate: string, _endDate: string) => {
  "use server";
  const { user } = await getAuth();
  if (!user) throw new Error("user not logged");

  const startDate = new Date(_startDate);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(_endDate);
  endDate.setHours(23, 59, 59, 999);

  return prisma.billing.findMany({
    where: {
      created: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
    orderBy: {
      id: "desc",
    },
  });
};

const refetchBillings = async () => {
  "use server";
  revalidatePath("/billing");
};

const BillingPage = async (
  props: Promise<{
    searchParams?: Promise<{ startDate: Date; endDate: Date }>;
  }>
) => {
  const { searchParams } = await props;
  const dayMonthAgo = new Date();
  dayMonthAgo.setMonth(dayMonthAgo.getMonth() - 1);

  const startDate = (await searchParams)?.startDate || dayMonthAgo;
  const endDate = (await searchParams)?.endDate || new Date();

  const billings = await getBillings(startDate.toString(), endDate.toString());

  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Моя касса
          <BalanceBlock />
        </h1>
        <BackLink href={"/"} />
      </div>
      <div className={"flex justify-between"}>
        <div>
          <button
            className={"bg-foreground text-white py-1 px-2 w-auto uppercase"}
            onClick={refetchBillings}
          >
            Обновить
          </button>
        </div>
        <DatePanel />
        <div>
          <Link
            href={"/refund"}
            className={
              "bg-foreground text-white py-1 px-2 w-auto uppercase float-right"
            }
          >
            Пополнить счет
          </Link>
        </div>
      </div>
      <div className={"mt-4 grid grid-cols-5"}>
        <div className={"bg-foreground text-white py-3 text-center"}>
          № счета
        </div>
        <div className={"bg-foreground text-white py-3 text-center"}>Сумма</div>
        <div className={"bg-foreground text-white py-3 text-center"}>
          Статус
        </div>
        <div className={"bg-foreground text-white py-3 text-center"}>
          Описание
        </div>
        <div className={"bg-foreground text-white py-3 text-center"}>Тип</div>
        {billings.map((billing) => (
          <BillingRow key={`blng-${billing.id}`} {...billing} />
        ))}
      </div>
    </div>
  );
};

export default BillingPage;
