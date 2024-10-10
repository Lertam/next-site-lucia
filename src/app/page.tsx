import BalanceBlock from "@/components/Home/BalanceBlock";
import EditorCard from "@/components/Home/EditorCard";
import ProfileCard from "@/components/Home/ProfileCard";
import RetouchCard from "@/components/Home/RetouchCard";

export default function Home() {
  return (
    <div className={""}>
      <h1 className={"text-center font-bold mt-4 uppercase relative"}>
        Главная
        <BalanceBlock />
      </h1>
      <div className={"grid grid-cols-2 gap-5"}>
        <RetouchCard />
        <ProfileCard />
        <EditorCard />
      </div>
    </div>
  );
}
