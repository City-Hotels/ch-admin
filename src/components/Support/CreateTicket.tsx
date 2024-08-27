import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { P, P3 } from "../Headings/Headings";
import Checkbox from "../Inputs/checkbox/Checkbox";
import Popup from "./Popup";
import { Formik, useFormikContext } from "formik";
import Input from "../formik/input/Input";
import { createTicketSchema } from "@/utils/formSchema";
import TextArea from "../formik/textarea/TextArea";
import { useQuery } from "react-query";
import { createTicket } from "@/services/support";
import { useWebSocket } from "@/context/WebSocketContext";
// import { NewTicket } from "@/services/support/payload";
import { ListUsers } from "@/services/user";
import { IUser } from "@/services/user/payload";
import ChevronDown from "@/assets/icons/chevron-down.svg";

interface newTicket {
  ticketTitle: string;
  ticketSubtitle: string;
  ticketAssignee: string;
  description: string;
}

function CreateTicket({
  isOpen,
  setIsOpen,
  conversationId
}: {
  isOpen: boolean;
  setIsOpen: (s: boolean) => void;
  conversationId: string;
}) {
  const [admin, setAdmin] = useState<{
    adminName: string;
    adminId: string;
  } | null>(null);
  const socket = useWebSocket();

  const initialValues: newTicket = {
    ticketTitle: "",
    ticketSubtitle: "",
    ticketAssignee: "",
    description: ""
  };

  function handleTicketSubmit(values: newTicket) {
    if (!socket || !conversationId || !admin?.adminId) return;

    const data = {
      socket,
      Title: values.ticketTitle,
      Subtitle: values.ticketSubtitle,
      Description: values.description,
      ConversationId: conversationId,
      assigneeId: admin?.adminId
    };

    createTicket(data);
  }

  useEffect(() => {
    function handler(e: MessageEvent<any>) {
      const msg = JSON.parse(e.data);
      if (msg.Type === "TICKET") setIsOpen(false);
      if (msg.Type === "TICKET") console.log("true");
    }
    if (socket) socket.addEventListener("message", handler);

    return () => {
      if (socket) socket.removeEventListener("message", handler);
    };
  }, [socket, setIsOpen]);

  return (
    <Modal openModal={isOpen} setOpenModal={setIsOpen}>
      <header className="text-center border-b border-white400 pb-4 pt-6">
        <P className="font-bold text-black">Create Ticket</P>
      </header>
      <Formik
        initialValues={initialValues}
        onSubmit={handleTicketSubmit}
        validationSchema={createTicketSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="w-[90%] mx-auto mb-5 mt-3">
            <TicketForm setAdmin={setAdmin} />
          </form>
        )}
      </Formik>
    </Modal>
  );
}

const test = ["Booking", "Listing", "Reservation"];

function TicketForm({
  setAdmin
}: {
  setAdmin: ({
    adminId,
    adminName
  }: {
    adminName: string;
    adminId: string;
  }) => void;
}) {
  const [includeImage, setIncludeImage] = useState(true);

  const { setFieldValue } = useFormikContext();

  const { data } = useQuery({
    queryFn: () => ListUsers({ Role: "ADMIN" }),
    queryKey: ["admin-list"]
  });

  const admins = data?.data?.Users;

  return (
    <>
      <Input type="regular" name="ticketTitle" label="Ticket Title" />
      <Popup forTicketPopup={true}>
        <span className="relative block">
          <Popup.Open opens="ticket-nature">
            <button type="button" className="absolute top-[45%] right-5 z-10">
              <ChevronDown />
            </button>
          </Popup.Open>
          <Input name="ticketSubtitle" label="Ticket Nature" autoComplete="" />
          <Popup.Window
            className="w-60 left-[50%] -translate-x-[50%]"
            name="ticket-nature"
          >
            {test.map((data: string, i) => (
              <Popup.Btn
                type="button"
                onClick={() => setFieldValue("ticketSubtitle", data)}
                key={i}
              >
                {data}
              </Popup.Btn>
            ))}
          </Popup.Window>
        </span>
        <span className="relative block">
          <Popup.Open opens="assignee">
            <button type="button" className="absolute top-[45%] right-5 z-10">
              <ChevronDown />
            </button>
          </Popup.Open>
          <Input name="ticketAssignee" label="Assignee" />
          <Popup.Window
            className="w-60 left-[50%] -translate-x-[50%]"
            name="assignee"
          >
            <span className="w-full h-24 overflow-auto block">
              {admins?.map((admin: IUser, i) => (
                <Popup.Btn
                  type="button"
                  key={i}
                  onClick={() => {
                    setFieldValue(
                      "ticketAssignee",
                      `${admin.Firstname} ${admin.Lastname}`
                    );
                    setAdmin({
                      adminId: admin.Id || "",
                      adminName: `${admin.Firstname} ${admin.Lastname}`
                    });

                    console.log(admin);
                  }}
                >
                  {`${admin.Firstname} ${admin.Lastname}`}
                </Popup.Btn>
              ))}
            </span>
          </Popup.Window>
        </span>
      </Popup>
      <TextArea name="description" label="Summary" />

      <Checkbox
        value={includeImage}
        onChange={(e) => setIncludeImage(e.target.checked)}
        label="Include images from this conversation?"
        className=""
      />
      {/* <P3 className="ml-2">Include images from this conversation?</P3> */}

      <span className="flex justify-end mt-3">
        <Button size="sm" color="primary" className="text-sm" type="submit">
          Create
        </Button>
      </span>
    </>
  );
}

export default CreateTicket;
