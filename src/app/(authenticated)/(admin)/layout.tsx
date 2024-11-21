import { getAuth } from "@/features/auth/queries/get-auth";
import { UserRole } from "@prisma/client";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = await getAuth();

  if (user?.role !== UserRole.ADMIN) {
    return <h1 className={"text-center text-3xl"}>Доступ запрещен</h1>
  }
  return <>{children}</>;
}
