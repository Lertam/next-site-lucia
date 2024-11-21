import { getRetouchers, RetoucherMeta } from "@/app/actions";
import { FC } from "react";

const Retouchers = async () => {
  const retouchers = await getRetouchers();

  if (!retouchers || retouchers.length === 0) return null;
  return (
    <div className={"mt-4 mb-8 hidden sm:block"}>
      <h6 className={"text-center font-bold"}>Ретушеры онлайн</h6>
      <div className={"flex gap-2 flex-wrap justify-center gap-y-5 mt-5"}>
        {retouchers.map((retoucher) => (
          <Retoucher key={`retoucher${retoucher.id}`} {...retoucher} />
        ))}
      </div>
    </div>
  );
};

const Retoucher: FC<RetoucherMeta> = ({ name, avatar }) => {
  return (
    <div className={"flex flex-col gap-1"}>
      <span
        className={
          "bg-foreground text-white text-center text-xs p-[1px] uppercase font-bold"
        }
        style={{ fontSize: "0.625rem", letterSpacing: 1 }}
      >
        {name}
      </span>
      <img src={avatar} className={"rounded-full border border-foreground"} />
      <button
        className={
          "p-1 bg-foreground text-white uppercase text-xs hover:bg-transparent hover:text-black font-bold"
        }
        style={{ letterSpacing: 1 }}
      >
        Написать
      </button>
    </div>
  );
};

export default Retouchers;
