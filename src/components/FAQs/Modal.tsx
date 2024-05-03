import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import Img from "../Image/Image";

// THIS PART HAS TO DO WITH THE MODAL WINDOW IMPLEMENTATION
interface ModalChildrenProp {
  children: JSX.Element | JSX.Element[];
}

interface ModalContextValueProps {
  modalIsOpen: boolean;
  close: () => void;
  open: (modalIsOpen: boolean) => void;
}

const defaultContext = {
  modalIsOpen: false,
  close: () => {},
  open: (modalIsOpen: boolean) => {}
} as ModalContextValueProps;

const ModalContext = createContext(defaultContext);

// PARENT COMPONENT(the modal component itself which handles the state of the window i.e open and close)
function Modal({ children }: ModalChildrenProp) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const close = () => setModalIsOpen(false);
  const open = () => setModalIsOpen(true);

  return (
    <ModalContext.Provider value={{ modalIsOpen, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

interface ChildrenElementProps {
  children: JSX.Element;
}

interface WindowProps extends ChildrenElementProps {
  type: string;
}

// main modal window, takes in the children and type prop. children prop being the actual content needed in the modal and the type prop sets the padding on the window itself, defaults to "padded", any other type causes the passed in element to fill up the entire window.
function Window({ children, type = "padded" }: WindowProps): React.ReactNode {
  const modalWindow = useRef<HTMLDivElement | null>(null);

  const { close, modalIsOpen } =
    useContext<ModalContextValueProps>(ModalContext);

  useEffect(
    // closes the modal when the overlay/anywhere outside the modal window is clicked
    function () {
      function handler(e: any) {
        if (modalWindow.current && !modalWindow?.current.contains(e.target)) {
          close();
        }
      }

      document.addEventListener("click", handler, true);

      return () => document.removeEventListener("click", handler, true);
    },
    [close]
  );

  if (!modalIsOpen) return null;

  // create portal(NOT compulsory) but used to ensure the modal stays ontop of every other element always, regardless of where it's used across the app and doesn't get affected by a parent element overflow set to hidden.

  return createPortal(
    <div className="w-full h-full top-0 left-0 fixed bg-black/50 backdrop-blur-[3px]">
      <div
        className={` ${type === "padded" ? "p-[2rem]" : ""} bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[85%] min-h-[70%] md:w-[70%] lg:w-[50%] rounded-md`}
        ref={modalWindow}
      >
        <button
          className="font-bold text-black absolute top-[2.25rem] right-[5%]"
          onClick={close}
        >
          <Img
            path="/images/icon/icon-close.png"
            name="close"
            alt="close-icon"
            className="h-5 w-5"
          />
        </button>

        {/* this way the passed in element(which is the main content of the modal window) also gets access to the "close" function, which can be used to close the modal when an action is completed i.e if needed */}
        {cloneElement(children, { close })}
      </div>
    </div>,
    document.body
  );
}

// this takes as argument("children" prop) the button that opens the modal, the button passed in accepts an "open" prop which opens the modal when used in the onClick event

function Open({ children }: ChildrenElementProps) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { open });
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
