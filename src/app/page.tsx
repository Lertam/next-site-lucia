import BalanceBlock from "@/components/Home/BalanceBlock";
import EditorCard from "@/components/Home/EditorCard";
import ProfileCard from "@/components/Home/ProfileCard";
import RetouchCard from "@/components/Home/RetouchCard";
import ShopCard from "@/components/Home/ShopCard";

export default function Home() {
  return (
    <div className={"h-full w-full m-auto"}>
      <h1 className={"text-center font-bold mt-4 uppercase relative"}>
        Главная
        <BalanceBlock />
      </h1>
      <div className={"grid grid-cols-2 gap-5 h-full pb-16 pt-4 grid-rows-2"}>
        <RetouchCard />
        <ProfileCard />
        <EditorCard />
        <ShopCard />
      </div>
    </div>
  );
}
