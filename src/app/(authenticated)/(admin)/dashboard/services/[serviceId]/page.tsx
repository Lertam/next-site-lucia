import BackLink from "@/components/Common/BackLink";
import { getRetouchService } from "../_queries/get-retouch-services";
import RetouchServiceCard from "../_components/ServiceCard";
import Prices from "./_prices";
import RetouchVariants from "./_variants";

export default async function ServicePage({
  params: { serviceId },
}: {
  params: { serviceId: string };
}) {
  const service = await getRetouchService(serviceId);
  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>Настройка услуги</h1>
      <BackLink href={'/dashboard/services'} />
      <div className={"flex flex-col md:flex-row mt-4 gap-4"}>
        <div className={"w-full sm:w-40"}>
          <RetouchServiceCard {...service} selected />
        </div>
        <div className={"grid grid-cols-1"} style={{ flexGrow: 999 }}>
          <Prices serviceId={serviceId} />
          <RetouchVariants serviceId={serviceId} />
        </div>
      </div>
    </div>
  );
}
