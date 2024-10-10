import CardButton from "./CardButton";
import CardWrapper from "./CardWrapper";

const EditorCard = () => {
  return (
    <CardWrapper image={"images/home/Editor.jpg"} title={"Онлайн конструктор"}>
      <div
        className={
          "flex flex-col items-center justify-center gap-2 w-full h-full"
        }
      >
        <CardButton text={"Онлайн редактор"} />
        <CardButton text={"3D конструктор"} />
        <CardButton text={"Подписка"} />
      </div>
    </CardWrapper>
  );
};

export default EditorCard;
