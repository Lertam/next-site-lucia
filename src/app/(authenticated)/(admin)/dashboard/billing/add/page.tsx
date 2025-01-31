import BackLink from "@/components/Common/BackLink";
import { Metadata } from "next";
import BillingForm from "../_components/BillingForm";

export const metadata: Metadata = {
  title: "Создание ордера",
};

const AddBillingPage = async () => {
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Создание одрера
        </h1>
        <BackLink href={"/dashboard/billing"} />
      </div>
      <div className={"my-4"}>
        <BillingForm />
      </div>
    </div>
  );
};

export default AddBillingPage;
