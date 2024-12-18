"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Sorting = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSorting = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("sorting", term);
    } else {
      params.delete("sorting");
    }
    replace(`${pathname}?${params.toString()}`);
    console.log(term);
  }, 300);

  return (
    <select
      name={"sorting"}
      className={"p-2 rounded"}
      onChange={(ev) => handleSorting(ev.target.value)}
    >
      <option value={"popular"}>По популярности</option>
      <option value={"id_desc"}>Сначала новые</option>
      <option value={"id_asc"}>Сначала старые</option>
      <option value={"price_asc"}>По цене ▲</option>
      <option value={"price_desc"}>По цене ▼</option>
    </select>
  );
};

export default Sorting;
