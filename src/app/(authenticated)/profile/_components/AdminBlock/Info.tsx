import { FC } from "react";

const Info: FC<{ created: Date | null; login: Date | null }> = ({
  created,
  login,
}) => {
  return (
    <div className={"flex flex-col gap-4 items-stretch"}>
      <span className={"font-bold text-center"}>Информация</span>
      <div className={"flex flex-col gap-2"}>
        <div className={"flex gap-2"}>
          <span>Дата регистрации:</span>
          <span className={"font-bold"}>
            {created ? created.toLocaleDateString() : "-"}
          </span>
        </div>
        <div className={"flex gap-2"}>
          <span>Последний вход:</span>
          <span className={"font-bold"}>
            {login ? login.toLocaleDateString() : "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Info;
