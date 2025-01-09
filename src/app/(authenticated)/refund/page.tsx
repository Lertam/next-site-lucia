import BackLink from "@/components/Common/BackLink";
import ManualSumForm from "./_components/ManualSumForm";

export const metadata = {
  title: "Пополнение счета",
};

const RefundPage = () => {
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <div className={"relative my-4"}>
        <h1 className={"text-center font-bold uppercase relative"}>
          Пополнить счет
        </h1>
        <BackLink href={"/"} />
      </div>
      <ManualSumForm />
    </div>
  );
};

export default RefundPage;
