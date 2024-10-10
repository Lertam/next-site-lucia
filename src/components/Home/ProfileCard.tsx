import CardButton from "./CardButton";
import CardWrapper from "./CardWrapper";

const ProfilePage = () => {
  return (
    <CardWrapper
      image={"images/home/Profile.jpg"}
      title={"Кабинет пользователя"}
    >
      <div
        className={
          "flex flex-col items-center justify-center gap-2 w-full h-full"
        }
      >
        <CardButton text={"Кабинет"} />
        <CardButton text={"Моя касса"} />
        <CardButton text={"Сообщения"} />
      </div>
    </CardWrapper>
  );
};

export default ProfilePage;
