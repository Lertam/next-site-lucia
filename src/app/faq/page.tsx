import { getQuestions } from "../(authenticated)/(admin)/dashboard/faq/_queries";
import Questions from "./Questions";

const FAQPage = async () => {
  const questions = await getQuestions();
  return (
    <div className={"h-full w-full m-auto flex flex-col"}>
      <h1 className={"text-center font-bold uppercase relative my-4"}>
        Вопросы и ответы
      </h1>
      <Questions questions={questions}/>
    </div>
  );
};


export default FAQPage;
