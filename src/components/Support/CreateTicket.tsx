import { useState } from "react";
import Modal from "../Modal/Modal";
// import Input from "../Inputs/Input/Input";
import TextArea from "../Inputs/textarea/TextArea";
import Button from "../Button/Button";
import { P, P3 } from "../Headings/Headings";
import Checkbox from "../Inputs/checkbox/Checkbox";
import Popup from "./Popup";
import Input from "../Inputs/Input/Input";

function CreateTicket({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: (s: boolean) => void;
}) {
  //   const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal openModal={isOpen} setOpenModal={setIsOpen}>
      <header className="text-center border-b border-white400 pb-4 pt-6">
        <P className="font-bold text-black">Create Ticket</P>
      </header>
      <TicketForm />
    </Modal>
  );
}

function TicketForm() {
  const [includeImage, setIncludeImage] = useState(true);

  return (
    <form className="w-[90%] mx-auto mb-5 space-y-3 mt-3">
      <Input type="regular" name="title" label="Ticket Title" />
      <Popup forTicketPopup={true}>
        <span className="relative block">
          <Popup.Open opens="ticket-nature">
            <Input name="nature" label="Ticket Nature" />
          </Popup.Open>
          <Popup.Window
            className="w-60 left-[50%] -translate-x-[50%]"
            name="ticket-nature"
          >
            <Popup.Btn>Booking</Popup.Btn>
            <Popup.Btn>Listing</Popup.Btn>
            <Popup.Btn>Reservation</Popup.Btn>
          </Popup.Window>
        </span>
      </Popup>
      <Input name="assignee" label="Assignee" />
      <TextArea name="summary" label="Summary" />

      <Checkbox
        value={includeImage}
        onChange={(e) => setIncludeImage(e.target.checked)}
        label="Include images from this conversation?"
        className=""
      />
      {/* <P3 className="ml-2">Include images from this conversation?</P3> */}

      <span className="flex justify-end mt-3">
        <Button size="sm" color="primary" className="text-sm">
          Create
        </Button>
      </span>
    </form>
  );
}

export default CreateTicket;
