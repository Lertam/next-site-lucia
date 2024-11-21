import BackLink from "@/components/Common/BackLink";
import BalanceBlock from "@/components/Home/BalanceBlock";
import { FC, PropsWithChildren } from "react";

const CreateOrderLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={"mt-4 relative grow"}>
      <h1 className={"text-center font-bold uppercase"}>Заказ ретуши</h1>
      <BalanceBlock />
      <BackLink />
      {children}
    </div>
  );
};

export default CreateOrderLayout;
