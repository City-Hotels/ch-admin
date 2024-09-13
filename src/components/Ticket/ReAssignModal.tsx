import { useState } from "react";
import { P } from "../Headings/Headings";
import SelectDropDown from "../Inputs/selectdropdown/SelectDropDown";
import Modal from "../Modal/Modal";
import { useQuery } from "react-query";
import { ListUsers } from "@/services/user";
import { useWebSocket } from "@/context/WebSocketContext";
import { reassignTicket } from "@/services/support";
import { useParams } from "next/navigation";

function ReAssignModal({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: (s: boolean) => void;
}) {
  const [admin, setAdmin] = useState("");

  const { data } = useQuery({
    queryFn: () => ListUsers({ Role: "ADMIN" }),
    queryKey: ["admin-list"]
  });

  const { idOrSlug } = useParams();

  const socket = useWebSocket();

  const admins = data?.data?.Users;

  function handleReassignAdmin(adminId: string) {
    if (!socket || !adminId) return;

    const data = {
      socket,
      ticketId: String(idOrSlug),
      AssigneeId: adminId
    };

    reassignTicket(data);
  }

  return (
    <Modal openModal={isOpen} setOpenModal={setIsOpen}>
      <div className="w-[80%] mx-auto">
        <header className="py-4">
          <P className="font-bold text-black">Create Ticket</P>
        </header>

        <select
          className="border border-white400 py-4 px-2 rounded-md mb-10 w-full outline-none"
          value={admin}
          onChange={(e) => {
            setAdmin(e.target.value);
            handleReassignAdmin(e.target.value);
          }}
        >
          {admins?.map((admin, i) => (
            <option
              key={i}
              value={admin?.Id}
            >{`${admin.Firstname} ${admin.Lastname}`}</option>
          ))}
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
