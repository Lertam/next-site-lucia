import BackLink from "@/components/Common/BackLink";
import Link from "next/link";
import { getFastWays } from "./_queries";
import FastWayRow from "./_components/FastWayRow";

export const metadata = {
  title: "Настройка кнопок быстрой оплаты",
};

export const dynamic = "force-dynamic";

const FastWaysSettings = async () => {
  const fastWays = await getFastWays();
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Настройка кнопок быстрой оплаты
        </h1>
        <BackLink href={"/dashboard"} />
        <Link
          href={"/dashboard/billing/fast-ways/add?show-modal"}
          className={"absolute right-0 top-0"}
        >
          + Создать
        </Link>
      </div>
      {fastWays.length === 0 && (
        <span className={"mt-10 mx-auto"}>Пока нет кнопок быстрой оплаты</span>
      )}
      <div className={"gap-y-2 flex flex-col"}>
        {fastWays.map((fastWay) => (
          <FastWayRow key={fastWay.id} {...fastWay} />
        ))}
      </div>
    </div>
  );
};

export default FastWaysSettings;
