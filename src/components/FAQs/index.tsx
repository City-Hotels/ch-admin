"use client";

import FAQs from "./ModalFaq";
import Modal from "../Modal/Modal";
import FAQQuestions from "./FaqQuestions";
import PopupToast from "./ToastLikePopup";
import NotificationPopup from "./NotificationPopup";
import { useState } from "react";

function OpenButton({ open }: any) {
  return (
    <button
      className="text-white bg-orange-500 py-2 px-4 mt-5 rounded-full ml-10"
      onClick={() => open((s: boolean) => !s)}
    >
      Open
    </button>
  );
}

function Tester() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <OpenButton open={setOpenModal} />
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        className=" w-[85%] min-h-[70%] md:w-[70%] lg:w-[50%] rounded-md p-[2rem]"
      >
        <FAQs />
      </Modal>
    </>
  );
}

export default Tester;

// export default NotificationPopup;

// export default FAQQuestions;

// export default PopupToast;
