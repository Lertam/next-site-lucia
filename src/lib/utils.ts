export const formatCurrency = (amount: number) => {
    // return amount.toLocaleString("ru-RU", {currency: "", style:"currency", minimumFractionDigits:0})
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    // roundingPriority: "lessPrecision",
    minimumFractionDigits: 0,
    currencyDisplay: "symbol",
    // currencySign: "accounting"
  }).format(amount).replace('₽', 'руб.');
};
