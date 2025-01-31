export const formatCurrency = (amount: number) => {
    return amount.toLocaleString("ru-RU", {currency:"RUB", style:"currency", minimumFractionDigits:0})
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    roundingPriority: "lessPrecision",
  }).format(amount);
};
