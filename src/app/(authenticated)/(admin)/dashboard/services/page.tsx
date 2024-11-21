import BackLink from "@/components/Common/BackLink";
import { getRetouchServices } from "@/app/(authenticated)/(admin)/dashboard/services/_queries/get-retouch-services";
import Link from "next/link";
import RetouchServiceCard from "./_components/ServiceCard";

const ServicesPage = async () => {
  const services = await getRetouchServices();
  return (
    <div className={"mt-4 relative"}>
      <h1 className={"text-center font-bold uppercase"}>Настройка услуг</h1>
      <BackLink href={"/dashboard"} />
      <Link
        href={"/dashboard/services/add"}
        className={"absolute right-0 top-0"}
      >
        + Создать
      </Link>
      <div
        className={
          "mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-4 justify-end"
        }
      >
        {services.map((service) => (
          <RetouchServiceCard key={`rsc-${service.id}`} {...service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
