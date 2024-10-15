import BalanceBlock from "@/components/Home/BalanceBlock";
import EditorCard from "@/components/Home/EditorCard";
import ProfileCard from "@/components/Home/ProfileCard";
import RetouchCard from "@/components/Home/RetouchCard";
import Retouchers from "@/components/Home/Retouchers";
import ShopCard from "@/components/Home/ShopCard";
import { getAuth } from "@/features/auth/queries/get-auth";

export default async function Home() {
  const { user, session } = await getAuth();
  console.log(user, session)
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <h1 className={"text-center font-bold mt-4 uppercase relative"}>
        Главная
        <BalanceBlock />
      </h1>
      <div
        className={
          "grid grid-col-1 grid-row-4 sm:grid-cols-2 gap-5 h-fit pt-4 sm:grid-rows-2 py-2"
        }
        style={{ flexGrow: 999 }}
      >
        <RetouchCard />
        <ProfileCard />
        <EditorCard />
        <ShopCard />
      </div>
      <Retouchers />
    </div>
  );
}
