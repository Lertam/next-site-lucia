"use client";

import DateInput from "@/components/Forms/DateInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DatePanel = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const dayMonthAgo = new Date();
  dayMonthAgo.setMonth(dayMonthAgo.getMonth() - 1);

  const handleDateChange = (key: "startDate" | "endDate", date: string) => {
    const params = new URLSearchParams(searchParams);
    switch (key) {
      case "startDate":
        if (date) {
          params.set("startDate", date);
        } else {
          params.delete("startDate");
        }
        break;
      case "endDate":
        if (date) {
          params.set("endDate", date);
        } else {
          params.delete("endDate");
        }
        break;
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={"flex justify-center"}>
      Период запроса с
      <DateInput
        onChange={(val) => handleDateChange("startDate", val)}
        defaultValue={
          searchParams.get("startDate")?.toString() ||
          dayMonthAgo.toISOString().substring(0, 10)
        }
      />
      по
      <DateInput
        // containerProps={{ className: "ml-10" }}
        onChange={(val) => handleDateChange("endDate", val)}
        defaultValue={searchParams.get("endDate")?.toString() || new Date().toISOString().substring(0, 10)}
      />
    </div>
  );
};
export default DatePanel;
