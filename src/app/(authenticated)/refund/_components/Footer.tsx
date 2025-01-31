const Footer = () => {
  return (
    <div className={"mx-auto mt-10"}>
      <div className={"flex flex-wrap gap-2"}>
        <img src={"/images/payments/providers/BeelineRUB.png"} className={"h-[60px]"}  />
        <img src={"/images/payments/providers/GooglePay.jfif"} className={"h-[60px]"}  />
        <img src={"/images/payments/providers/MegafonRUB.png"} className={"h-[60px]"}  />
        <img src={"/images/payments/providers/MtsRUB.png"} className={"h-[60px]"}  />
        <img src={"/images/payments/providers/Tele2RUB.png"} className={"h-[60px]"}  />
        <img src={"/images/payments/providers/Samsung_Pay-Logo.wine.png"} className={"h-[60px]"}  />
        <img src={"/images/payments/providers/YandexMoneyRuB.png"} className={"h-[60px]"}  />
      </div>
      <div className={"flex flex-wrap mt-4 gap-2"}>
        <img src={"/images/payments/providers/applePay.png"} className={"h-[60px]"}  />
        <img src={"/images/payments/providers/visa.png"} className={"h-[60px]"}  />
        <img src={"/images/payments/providers/mastercard.png"} className={"h-[60px]"}  />
        <img src={"/images/payments/providers/mir.png"} className={"h-[60px]"}  />
        <img src={"/images/payments/providers/sbp_mini.png"} className={"h-[60px]"}  />
      </div>
    </div>
  );
};

export default Footer;
