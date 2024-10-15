import { FC } from "react";

const Prices: FC<{ serviceId: string }> = ({ serviceId }) => {
  return (
    <div className={"mt-4 relative"}>
      <h2 className={"text-center font-bold uppercase text-base"}>Цены на услуги</h2>
    </div>
  );
};

export default Prices;
