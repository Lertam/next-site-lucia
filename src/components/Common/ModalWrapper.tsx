"use client";

import {
  type ElementRef,
  FC,
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

export const ModalContext = React.createContext<RefObject<
  ElementRef<"dialog">
> | null>(null);

const ModalWrapper: FC<PropsWithChildren<{ closeLink?: string }>> = ({
  children,
  closeLink,
}) => {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("show-modal")) {
      dialogRef.current?.showModal();
    }
  }, [searchParams]);

  console.log(dialogRef);
  function onDismiss() {
    console.log("dismis");
    if (closeLink) {
      router.replace(closeLink);
    } else {
      router.back();
    }
  }
  const formstate = useRouter();
  console.log("FS", formstate);

  return createPortal(
    <ModalContext.Provider value={dialogRef}>
      <div className="modal-backdrop w-full h-full">
        <dialog
          ref={dialogRef}
          className={"bg-background p-4 pr-5 pt-5"}
          onClose={onDismiss}
        >
          {children}
          <button onClick={onDismiss} className={"absolute top-1 right-1"}>
            <XMarkIcon className={"w-5 h-5"} />
          </button>
        </dialog>
      </div>
    </ModalContext.Provider>,
    document.getElementById("modal-root")!
  );
};

export default ModalWrapper;
