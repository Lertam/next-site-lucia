import BackLink from "@/components/Common/BackLink";
import EditSurveyForm from "../_components/EditSurveyForm";

export const metadata = {
  title:"Создание опроса",
}

const AddSurveyPage = async () => {
  return (
    <div className={"relative mt-4"}>
      <h1 className={"text-center font-bold uppercase"}>Создание опроса</h1>
      <BackLink />
      <EditSurveyForm />
    </div>
  );
};

export default AddSurveyPage;
