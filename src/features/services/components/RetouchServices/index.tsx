"use client";
import { RetouchService } from "@prisma/client";
import { FC, useState } from "react";
import RetouchServiceCard from "./Card";
import RetouchPrices from "./Prices";

const RetouchServices: FC<{ services: RetouchService[] }> = ({ services }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
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
      {selectedNode && <RetouchPrices serviceId={selectedNode} />}
    </>
  );
};

export default RetouchServices;
