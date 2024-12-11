import { Faq } from "@prisma/client";
import { FC } from "react";

const Question: FC<Faq & { isOpen: boolean; close: () => void }> = ({
  question,
  answer,
  isOpen,
  close,
}) => {
  return (
    <div>
      <div
        className={
          "bg-foreground text-white px-8 py-5 font-bold hover:cursor-pointer relative flex justify-between items-center"
        }
        onClick={close}
      >
        <span>{question}</span>
        <div
          className={`w-5 h-5 _absolute transform border-background rotate-45 ${
            isOpen
              ? "border-l-[3px] border-t-[3px]"
              : "border-b-[3px] border-r-[3px]"
          }`}
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: answer }}
        className={`bg-background-light py-4 h-${
          isOpen ? "auto" : "0 hidden"
        } transition-all`}
      />
    </div>
  );
};

export default Question;
