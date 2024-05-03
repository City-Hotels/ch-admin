"use client";

import FAQs from "./ModalFaq";
import Modal from "./Modal";
import FAQQuestions from "./FaqQuestions";
import PopupToast from "./ToastLikePopup";
import NotificationPopup from "./NotificationPopup";

// this is just a test open button, in real use case it's to be passed as the "children" prop of the "Modal.Open" element
function OpenButton({ open }: any) {
  return (
    <button
      className="text-white bg-orange-500 py-2 px-4 mt-5 rounded-full ml-10"
      onClick={open}
    >
      Open
    </button>
  );
}

// Test to demonstrate how the Modal component can be used
function Tester() {
  return (
    <>
      <Modal>
        <Modal.Open>
          <OpenButton />
        </Modal.Open>
        <Modal.Window type="padded">
          <FAQs />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default Tester;

// export default NotificationPopup;

// export default FAQQuestions;

// export default PopupToast;
