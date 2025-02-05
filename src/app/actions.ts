"use server";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export type RetoucherMeta = {
  id: string;
  name: string;
  avatar: string;
  discount?: number;
};

// const RETOUCHERS: RetoucherMeta[] = [
//   {
//     id: 7406,
//     name: "Кирилл",
//     avatar:
//       "https://obeliski.ru/ymaxiProduct/files/modules/users/avatars/avatar-7406.jpg",
//   },
//   {
//     id: 17441,
//     name: "Илья",
//     avatar:
//       "https://obeliski.ru/ymaxiProduct/files/modules/users/avatars/avatar-17441.jpg",
//   },
//   {
//     id: 17195,
//     name: "Аня",
//     avatar:
//       "https://obeliski.ru/ymaxiProduct/files/modules/users/avatars/avatar-17195.jpg",
//     discount: 20,
//   },
//   {
//     id: 14735,
//     name: "Дмитрий",
//     avatar:
//       "https://obeliski.ru/ymaxiProduct/files/modules/users/avatars/avatar-14735.jpg",
//   },
//   {
//     id: 16249,
//     name: "Настя",
//     avatar:
//       "https://obeliski.ru/ymaxiProduct/files/modules/users/avatars/avatar-16249.jpg",
//   },
//   {
//     id: 15151,
//     name: "Марина",
//     avatar:
//       "https://obeliski.ru/ymaxiProduct/files/modules/users/avatars/avatar-15151.jpg",
//     discount: 20,
//   },
//   {
//     id: 17707,
//     name: "Вика",
//     avatar:
//       "https://obeliski.ru/ymaxiProduct/files/modules/users/avatars/avatar-17707.jpg",
//     discount: 20,
//   },
//   {
//     id: 17051,
//     name: "Дарина",
//     avatar:
//       "https://obeliski.ru/ymaxiProduct/files/modules/users/avatars/avatar-17051.jpg",
//     discount: 20,
//   },
//   {
//     id: 9138,
//     name: "Михаил",
//     avatar:
//       "https://obeliski.ru/ymaxiProduct/files/modules/users/avatars/avatar-9138.jpg",
//   },
//   {
//     id: 15396,
//     name: "Арина",
//     avatar:
//       "https://obeliski.ru/ymaxiProduct/files/modules/users/avatars/avatar-15396.jpg",
//   },
//   {
//     id: 10032,
//     name: "Надежда",
//     avatar:
//       "https://obeliski.ru/ymaxiProduct/files/modules/users/avatars/avatar-10032.jpg",
//   },
//   {
//     id: 17778,
//     name: "Даша",
//     avatar:
//       "https://obeliski.ru/ymaxiProduct/files/modules/users/avatars/avatar-17778.jpg",
//     discount: 20,
//   },
//   {
//     id: 13930,
//     name: "Катя",
//     avatar:
//       "https://obeliski.ru/ymaxiProduct/files/modules/users/avatars/avatar-13930.jpg",
//   },
// ];

export const getRetouchers = async (): Promise<RetoucherMeta[]> => {
  return (
    await prisma.user.findMany({ where: { role: UserRole.RETOUCHER } })
  ).map((usr) => ({
    id: usr.id,
    name: usr.login,
    avatar: usr.image ? usr.image : "no-avatar.jpg",
  }));
  // return RETOUCHERS.filter(() => Math.random() < 0.5).sort(() =>
  //   Math.random() > 0.5 ? -1 : 1
  // );
};
