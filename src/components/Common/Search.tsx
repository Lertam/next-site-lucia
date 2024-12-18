"use client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FC, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search: FC<{ placeholder: string }> = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    console.log(term);
  }, 300);

  const inputRef = useRef<HTMLInputElement>(null);
  const query = searchParams.get("query") || "";
  return (
    <div className={"relative flex flex-1 flex-shrink-0"}>
      <label htmlFor={"search"} className={"sr-only"}>
        Поиск
      </label>
      <input
        className={
          "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm putline-2 placeholder:text-gray-500"
        }
        ref={inputRef}
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon
        className={
          "absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray peer-focus:text-gray-900"
        }
      />
      {query.length > 0 && (
        <button
          className={"absolute right-2 top-2"}
          onClick={(ev) => {
            ev.preventDefault();
            if (inputRef.current) inputRef.current.value = "";
            handleSearch("");
          }}
        >
          <XMarkIcon className={"w-6 text-foreground"} />
        </button>
      )}
    </div>
  );
};

export default Search;
