import BackLink from "@/components/Common/BackLink";
import RetouchServices from "@/features/services/components/RetouchServices";
import { getRetouchPrices } from "@/features/services/queries/get-retouch-prices";
import { getRetouchServices } from "@/features/services/queries/get-retouch-services";
import Link from "next/link";

const ServicesPage = async () => {
  const services = await getRetouchServices();
  return (
    <div className={"mt-4 relative"}>
      <h1 className={"text-center font-bold uppercase"}>Настройка услуг</h1>
      <BackLink />
      <Link
        href={"/dashboard/services/add"}
        className={"absolute right-0 top-0"}
      >
        + Создать
      </Link>
      {services.length === 0 && <p className={"text-center mt-4"}>Нет услуг</p>}
      <RetouchServices services={services} getRetouchPrices={getRetouchPrices} />
    </div>
  );
};

export default ServicesPage;
