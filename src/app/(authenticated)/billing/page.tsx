import BackLink from "@/components/Common/BackLink";
import BalanceBlock from "@/components/Home/BalanceBlock";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BillingRow from "./_components/BillingRow";

export const metadata = {
  title: "Моя касса",
};

const getBillings = async () => {
  "use server";
  return prisma.billing.findMany({
    orderBy: {
      id: "desc",
    },
  });
};

const BillingPage = async () => {
  const billings = await getBillings();
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Моя касса
          <BalanceBlock />
        </h1>
        <BackLink href={"/"} />
      </div>
      <div className={"grid grid-cols-3"}>
        <div>
          <button
            className={"bg-foreground text-white py-1 px-2 w-auto uppercase"}
          >
            Обновить
          </button>
        </div>
        <span className={"text-center"}>Период запроса c ___ по ___</span>
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
