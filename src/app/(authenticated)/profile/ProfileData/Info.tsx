import { getAuth } from "@/features/auth/queries/get-auth";

const ProfileInfo = async () => {
  const { user } = await getAuth();
  if (!user) return null;

  return (
    <>
      <span>Логин: {user.login}</span>
      <span>Email: {user.email}</span>
      <span>Телефон:</span>
      <span>Пароль: *********</span>
    </>
  );
};

export default ProfileInfo;
