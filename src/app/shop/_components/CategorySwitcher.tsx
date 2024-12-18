"use client";

import { ShopCategory } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { useDebouncedCallback } from "use-debounce";

const CategorySwitcher: FC<{ categories: ShopCategory[] }> = ({
  categories,
}) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSwitch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("category", term);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <select
      name={"categoryId"}
      onChange={(ev) => handleSwitch(ev.target.value)}
      className={"rounded p-2"}
    >
      <option value={"all"}>Все категории</option>
      {categories.map((c) => (
        <option key={`ct${c.id}`} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySwitcher;
