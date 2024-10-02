import Image from "next/image";

const RetouchStandard = () => {
  return (
    <div className={"flex flex-col items-center"}>
      <h3>Эталон ретуши</h3>
      <Image
        src={"/retouch-standard.jpg"}
        width={150}
        height={100}
        alt={"Эталон ретуши"}
      />
    </div>
  );
};

export default RetouchStandard;
