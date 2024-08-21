import { TicketEntry } from "@/services/support/payload";
import { P, P2 } from "../Headings/Headings";

function TicketSummary({ ticket }: { ticket: TicketEntry }) {
  return (
    <div className="h-[90%] w-[80%] flex flex-col justify-between items-center m-auto">
      <span className="mt-8 bg-white p-5 w-full">
        <P>{ticket.Title}</P>
        <P2 className="text-sm mt-5">{ticket.Description}</P2>
      </span>
      <P2>
        You replied and autoassigned the{" "}
        <span className="text-primary400">chat</span> to yourself
      </P2>
    </div>
  );
}

export default TicketSummary;
