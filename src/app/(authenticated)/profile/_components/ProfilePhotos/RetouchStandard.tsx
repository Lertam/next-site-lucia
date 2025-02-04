import Image from "next/image";
import { FC } from "react";

const RetouchStandard: FC<{ image: string }> = ({ image }) => {
  return (
    <div className={"flex flex-col items-center"}>
      <h3 className={"my-4"}>Эталон ретуши</h3>
      <Image src={image} width={150} height={100} alt={"Эталон ретуши"} />
    </div>
  );
};

export default RetouchStandard;
