import { RetouchPrice, RetouchService, RetouchVariant } from "@prisma/client";
import { FC } from "react";
import Formats from "./Formats";
import Resolutions from "./Resolutions";
import Sizes from "./Sizes";
import Name from "./Name";
import Dressing from "./Dressing";
import FormInput from "@/components/Forms/FormInput";

const Details: FC<{
  service: RetouchService;
  variant: RetouchVariant;
  price: RetouchPrice;
}> = ({ service, variant, price }) => {
  return (
    <form>
      <input type={"hidden"} name={"serviceId"} value={service.id} />
      <input type={"hidden"} name={"variantId"} value={variant.id} />
      <input type={"hidden"} name={"priceId"} value={price.id} />

      <Sizes />
      <Formats />
      <Resolutions />
      <Name />
      <Dressing />
      <FormInput
        id={"comment"}
        label={<h4 className={"font-bold"}>Примечание к заказу</h4>}
        name={"comment"}
      />
      <button type={"submit"}>submit</button>
      <br />
      <br />
      <p>Услуга - {service.title}</p>
      <p>Вариант - {variant.title}</p>
      <p>Цена - {price.title}</p>
    </form>
  );
};
export default Details;
