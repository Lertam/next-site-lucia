import Image from "next/image";
import { FC, useState } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export type UserType = { id: string; image: string | null; login: string };

const UserSelect: FC<{ error?: string[]; user?: UserType }> = ({
  error,
  user: orderUser,
}) => {
  const [val, setVal] = useState<string>("");
  const [term] = useDebounce<string>(val, 300);

  const { data, isLoading } = useSWR<
    Array<{ id: string; login: string; image: string }>
  >("/dashboard/billing/user-search?term=" + term, fetcher);

  const [user, setUser] = useState<null | UserType>(
    orderUser ? orderUser : null
  );

  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <div className={"mb-4"}>
      <h2 className={"mb-2 text-lg font-normal"}>Пользователь</h2>
      {user && <input type={"hidden"} value={user.id} name={"userId"} />}
      <UserBlock
        user={user}
        toggleEditMode={() => setEditMode((mode) => !mode)}
      />
      {editMode && (
        <div className={"mt-4"}>
          <input
            defaultValue={val}
            onChange={(ev) => setVal(ev.target.value)}
            className={"outline-none w-full"}
            placeholder={"Логин"}
          />
          {isLoading && term.length > 0 && <span>Loading</span>}
          {data && val.length > 0 && (
            <div className={"border border-foreground rounded"}>
              {data.length == 0 ? (
                <span>Ничего не найдено</span>
              ) : (
                <div>
                  {val.length > 0 &&
                    data.map((user) => (
                      <UserRow
                        {...user}
                        key={user.id}
                        select={() => {
                          setVal("");
                          setUser(user);
                          setEditMode(false);
                        }}
                      />
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {error && <span className={"text-red-500 text-sm"}>{error[0]}</span>}
    </div>
  );
};

const UserRow: FC<{
  id: string;
  image: string;
  login: string;
  select: () => void;
}> = ({ login, select }) => {
  return (
    <div
      className={
        "hover:cursor-pointer hover:bg-foreground hover:text-white p-2"
      }
      onClick={select}
    >
      {login}
    </div>
  );
};

const UserBlock: FC<{
  user: null | UserType;
  toggleEditMode: () => void;
}> = ({ user, toggleEditMode }) => {
  if (!user) {
    return (
      <div
        className={
          "flex items-center hover:cursor-pointer border-foreground border rounded"
        }
        onClick={toggleEditMode}
      >
        <div
          className={
            "w-10 h-10 rounded-full border border-foreground m-3 flex flex-col justify-center items-center"
          }
        >
          <span className={"font-bold text-4xl text-foreground"}>+</span>
        </div>
        <div className={"ml-2"}>Выбрать</div>
      </div>
    );
  }
  return (
    <div
      className={
        "flex items-center hover:cursor-pointer border border-foreground rounded"
      }
      onClick={toggleEditMode}
    >
      <Image
        src={`/modules/user/${user.image ? user.image : "no-avatar.jpg"}`}
        className={"w-10 h-10 rounded-full m-3"}
        width={40}
        height={40}
        alt={`Аватар ${user.login}`}
      />
      <div className={"ml-2 overflow-hidden"}>{user.login}</div>
    </div>
  );
};

export default UserSelect;
