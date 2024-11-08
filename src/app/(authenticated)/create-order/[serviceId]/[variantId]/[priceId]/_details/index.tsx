"use client";
import { RetouchPrice, RetouchService, RetouchVariant } from "@prisma/client";
import { FC, useEffect, useState } from "react";
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
    _setStep(step);
  }, [params]);

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

      <DataStep step={step} next={() => setStep(step + 1)} />
    </form>
  );
};
export default Details;
