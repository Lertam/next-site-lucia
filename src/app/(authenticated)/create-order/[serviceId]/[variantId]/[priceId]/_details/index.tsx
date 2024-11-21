"use client";
import { RetouchPrice, RetouchService, RetouchVariant } from "@prisma/client";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import DataStep from "./DataStep";
import { useRouter, useSearchParams } from "next/navigation";

const Details: FC<{
  service: RetouchService;
  variant: RetouchVariant;
  price: RetouchPrice;
}> = ({ service, variant, price }) => {
  const [step, _setStep] = useState<number>(0);

  const router = useRouter();

  const setStep = (nextVal: number) => {
    _setStep(nextVal);
    if (nextVal !== 0) router.replace("?step=" + nextVal);
  };

  const params = useSearchParams();
  useEffect(() => {
    const step = Number(params.get("step"));
    if(step < 2) _setStep(step);
  }, [params]);

  const servicesBlock = useMemo<ReactNode>(
    () => (
      <div>
        <h3>Выбранные услуги</h3>
        <div>
          <img src={`/modules/services/images/${variant.image}`} className={"w-32"}/>
          <span>
            {service.title}, {variant.title}, {price.title}
          </span>
        </div>
      </div>
    ),
    []
  );

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        const inputs = (ev.target as HTMLFormElement).querySelectorAll(
          "input:checked,input[type='number'],input[type='text'],input[type='hidden']"
        );
        console.log(inputs);
      }}
      className={"h-full pb-10"}
    >
      <input type={"hidden"} name={"serviceId"} value={service.id} />
      <input type={"hidden"} name={"variantId"} value={variant.id} />
      <input type={"hidden"} name={"priceId"} value={price.id} />

      <DataStep step={step} next={() => setStep(step + 1)} servicesBlock={servicesBlock}/>
    </form>
  );
};
export default Details;
