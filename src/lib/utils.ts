import { prisma } from "@/lib/prisma";
import { generateId } from "lucia";

export const formatCurrency = (amount: number) => {
  // return amount.toLocaleString("ru-RU", {currency: "", style:"currency", minimumFractionDigits:0})
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    // roundingPriority: "lessPrecision",
    minimumFractionDigits: 0,
    currencyDisplay: "symbol",
    // currencySign: "accounting"
  })
    .format(amount)
    .replace("₽", "руб.");
};

export type UserAccess = {
  editor: boolean;
  messenger: boolean;
  orders: boolean;
  site: boolean;
};

export const getUserAccess = async (userId: string): Promise<UserAccess> => {
  const row = await prisma.config.findUnique({
    where: { key: `access-${userId}` },
  });
  if (!row) {
    // Создаем запись
    const defaultUserAccess: UserAccess = {
      editor: true,
      messenger: true,
      orders: true,
      site: true,
    };
    await prisma.config.create({
      data: {
        id: generateId(15),
        key: `access-${userId}`,
        value: defaultUserAccess,
      },
    });
    console.log("default");
    return defaultUserAccess;
  } else {
    console.log(row.value);
    return row.value as UserAccess;
  }
};
