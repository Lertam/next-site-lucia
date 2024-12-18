import { UserRole } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
// import { Argon2id } from "oslo/password";

const prisma: PrismaClient = new PrismaClient();

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateId = (length: number = 15) => {
  const alpabeth = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result: string = "";
  while (result.length < length) {
    result += alpabeth[randomInt(0, alpabeth.length - 1)];
  }
  return result;
};

async function main() {
  // const hashedPassword = await new Argon2id().hash("admin_password");
  await prisma.shopCategory.deleteMany();
  await prisma.shopCategory.createMany({
    data: [
      {
        id: generateId(15),
        name: "Церкви, храмы",
        weight: 105,
      },
      {
        id: generateId(15),
        name: "Пейзажи",
        weight: 100,
      },
      {
        id: generateId(15),
        name: "Ангелы",
        weight: 95,
      },
      {
        id: generateId(15),
        name: "Иконы",
        weight: 90,
      },
      {
        id: generateId(15),
        name: "Кресты",
        weight: 85,
      },
      {
        id: generateId(15),
        name: "Охота, рыбалка, животные",
        weight: 80,
      },
      {
        id: generateId(15),
        name: "Оформление",
        weight: 75,
      },
      {
        id: generateId(15),
        name: "Святые",
        weight: 70,
      },
      {
        id: generateId(15),
        name: "Свечи",
        weight: 65,
      },
      {
        id: generateId(15),
        name: "Цветы",
        weight: 60,
      },
      {
        id: generateId(15),
        name: "Ислам",
        weight: 55,
      },
      {
        id: generateId(15),
        name: "Военная тематика, техника ",
        weight: 50,
      },
      {
        id: generateId(15),
        name: "Символы, ордена",
        weight: 45,
      },
      {
        id: generateId(15),
        name: "Рамки",
        weight: 40,
      },
      {
        id: generateId(15),
        name: "Уголки",
        weight: 35,
      },
      {
        id: generateId(15),
        name: "Разное",
        weight: 30,
      },
      {
        id: generateId(15),
        name: "Фотоовалы",
        weight: 25,
      },
      {
        id: generateId(15),
        name: "Бесплатные",
        weight: 15,
      },
    ],
  });
  // const admin = prisma.user.create({
  //   data: {
  //     id: generateId(15),
  //     login: "lertam",
  //     hashedPassword,
  //     email: "ion.vkid@gmail.com",
  //     role: UserRole.ADMIN,
  //     createdAt: new Date(),
  //   },
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
