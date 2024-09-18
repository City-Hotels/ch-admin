import { useClosePopup } from "@/hooks/useClosePopup";
import {
  cloneElement,
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useRef,
  useState
} from "react";

interface PopupContextProps {
  forTicketPopup: boolean;
  openName: string;
  open: (value: string) => void;
  close: () => void;
  setOpenName: Dispatch<SetStateAction<string>>;
}

const defaultProps = { forTicketPopup: false } as PopupContextProps;

const PopupContext = createContext(defaultProps);

function Popup({
  forTicketPopup = false,
  children
}: {
  forTicketPopup?: boolean;
  children: JSX.Element | JSX.Element[];
}) {
  const [openName, setOpenName] = useState("");
  const defaultPosition = "top-[50%] -left-0";

  function open(name: string) {
    setOpenName(name);
  }

  function close() {
    setOpenName("");
  }

  return (
    <PopupContext.Provider
      value={{ forTicketPopup, openName, open, close, setOpenName }}
    >
      {children}
    </PopupContext.Provider>
  );
}

function PopupWindow({
  children,
  className,
  forTicketPopup = false,
  name
}: {
  children: JSX.Element | JSX.Element[];
  className?: string;
  forTicketPopup?: boolean;
  name?: string;
}) {
  const { openName, close } = useContext(PopupContext);
  const defaultPosition = "top-[50%] -left-0";
  const ref = useRef<HTMLUListElement | null>(null);

  useClosePopup(close, false, ref, openName);

  if (openName !== name || name === "") return null;

  return (
    <ul
      className={`${className} bg-white min-w-[100px] shadow-lg mb-8 absolute ${defaultPosition} z-40 rounded-md`}
      ref={ref}
    >
      {children}
    </ul>
  );
}

function PopupBtn({
  children,
  type,
  onClick
}: {
  children: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}) {
  const { forTicketPopup, close } = useContext(PopupContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        type={type}
        className={`h-full w-full border ${!forTicketPopup ? "p-3" : "p-2"} text-sm text-start border-none hover:bg-white100`}
      >
        {children}
      </button>
    </li>
  );
}

function Open({ children, opens }: { children: JSX.Element; opens: string }) {
  const { open, openName, close, setOpenName } = useContext(PopupContext);

  function onClick() {
    // openName ? close() : open(opens);
    setOpenName((s: string) => (s === opens ? "" : opens));
  }

  return cloneElement(children, { onClick: onClick });
}

Popup.Btn = PopupBtn;
Popup.Open = Open;
Popup.Window = PopupWindow;

export default Popup;
