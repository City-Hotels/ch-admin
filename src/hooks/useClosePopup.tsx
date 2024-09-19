import { MutableRefObject, useEffect, useRef } from "react";

export function useClosePopup(
  close: () => void,
  listenCapturing: boolean,
  ref: MutableRefObject<HTMLUListElement | null>,
  openName: string
) {
  useEffect(
    function () {
      if (!openName) return;

      function handleClose(e: any) {
        if (ref.current && !ref.current?.contains(e.target)) close();
        console.log("called");
      }

      //   if (openName)
      document.addEventListener("click", handleClose, listenCapturing);
      console.log("called 2");

      return function () {
        document.removeEventListener("click", handleClose, listenCapturing);
      };
    },
    [listenCapturing, ref, openName, close]
  );

  return { ref };
}
