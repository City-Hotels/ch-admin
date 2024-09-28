import { useState } from "react";
import { P } from "../Headings/Headings";
import SelectDropDown from "../Inputs/selectdropdown/SelectDropDown";
import Modal from "../Modal/Modal";

function ReAssignModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal openModal={isOpen} setOpenModal={setIsOpen}>
      <div className="w-[80%] mx-auto">
        <header className="py-4">
          <P className="font-bold text-black">Create Ticket</P>
        </header>

        <select className="border border-white400 p-2 rounded-md mb-10 w-full outline-none">
          <option>select admin</option>
        </select>

        {/* <SelectDropDown
          items={[{ label: "Admin-1", value: "test" }]}
          label="Re-Assign To Another Admin"
          placeholder="select admin"
        /> */}
      </div>
    </Modal>
  );
}

export default ReAssignModal;
