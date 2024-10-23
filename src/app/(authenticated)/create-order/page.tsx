import ServiceCard from "./_components/ServiceCard";
import { getRetouchServicesWithPrices } from "./_queries/retouch-services";

const CreateOrderPage = async () => {
  const services = await getRetouchServicesWithPrices();

  return (
    <div className={"mt-4"}>
      <h2>Шаг 1. Выберите услугу</h2>
      <div className={"mt-4 gap-4 flex flex-wrap justify-center"}>
        {services.map((service) => <ServiceCard key={`sc-${service.id}`} service={service} />)}
      </div>
    </div>
  );
};

export default CreateOrderPage;
