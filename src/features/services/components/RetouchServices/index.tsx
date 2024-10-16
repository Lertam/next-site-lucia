"use client";
import { RetouchPrice, RetouchService } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import RetouchServiceCard from "./Card";
import RetouchPrices from "./Prices";

const RetouchServices: FC<{
  services: RetouchService[];
  getRetouchPrices: (serviceId: string) => Promise<RetouchPrice[]>;
}> = ({ services, getRetouchPrices }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const [prices, setPrices] = useState<RetouchPrice[]>([]);
  useEffect(() => {
    if(selectedNode) {
      const fetchPrices = async () => {
        const pr = await getRetouchPrices(selectedNode);
        setPrices(pr);
      }
      fetchPrices();
    }
  }, [selectedNode, getRetouchPrices])
  return (
    <>
      <div
        className={
          "mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-4 justify-end"
        }
        onClick={() => setSelectedNode(null)}
      >
        {services.map((service) => (
          <RetouchServiceCard
            key={`rsc-${service.id}`}
            {...service}
            selected={selectedNode === service.id}
            select={() => setSelectedNode(service.id)}
          />
        ))}
      </div>
      {selectedNode && <RetouchPrices serviceId={selectedNode} prices={prices} />}
    </>
  );
};

export default RetouchServices;
