import { FC } from "react";
import { getAdminData } from "../../[userId]/_queries";
import AdminForm from "./AdminForm";

const AdminBlock: FC<{ userId: string }> = async ({ userId }) => {
  const data = await getAdminData(userId);
  return <AdminForm {...data} userId={userId} />;
};

export default AdminBlock;
