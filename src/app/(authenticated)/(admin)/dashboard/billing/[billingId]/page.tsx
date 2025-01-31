import BackLink from "@/components/Common/BackLink";
import { getBilling } from "../_query";
import Head from "next/head";
import BillingForm from "../_components/BillingForm";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ billingId: string }>;
}) => {
  const order = await getBilling((await params).billingId);
  return { title: `Просмотр ордера №${order.id}` };
};

const BillingItemPage = async ({
  params,
}: {
  params: Promise<{ billingId: string }>;
}) => {
  const { billingId } = await params;
  const order = await getBilling(billingId);
  const user = {
    id: order.user.id,
    image: order.user.image,
    login: order.user.login,
  };

  return (
    <>
      <Head>
        <title>Просмотр ордера №{order.id}</title>
      </Head>
      <div className={"h-full w-full m-auto"}>
        <div className={"relative my-4"}>
          <h1 className={"text-center font-bold uppercase relative"}>
            Просмотр одрера №{order.id}
          </h1>
          <BackLink />
        </div>
        <BillingForm order={order} user={user} />
      </div>
    </>
  );
};

export default BillingItemPage;
