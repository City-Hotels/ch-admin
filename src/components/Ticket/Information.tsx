import { getUser } from "@/services/user";
import { P, P2 } from "../Headings/Headings";
import { useQuery } from "react-query";
import { IUser } from "@/services/user/payload";
import UserInfoLoader from "./UserInfoLoader";

function Information({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div className="w-[95%] rounded-md bg-inherit p-4 border border-white400">
      {children}
    </div>
  );
}

function UserInformation({ userId }: { userId: string | undefined }) {
  const { data, isLoading } = useQuery({
    queryFn: () => getUser(userId),
    queryKey: ["user-information", userId],
    enabled: !!userId
  });

  const { Email, Telephone } = (data?.data as IUser) || {};

  if (isLoading || !userId) return <UserInfoLoader />;

  return (
    <section className="space-y-5">
      <P className="font-bold">User Information</P>
      <Text mainText="Email" subText={Email} />
      <Text mainText="Phone" subText={Telephone} />
    </section>
  );
}

function TicketInformation() {
  return (
    <section className="space-y-5">
      <P className="font-bold">Ticket Information</P>
      <Text mainText="Ticket ID" subText="3459806" />
      <Text mainText="Title" subText="Payment Issue" />
      <Text mainText="Assignee" subText="MO" />
      <Text mainText="Type" subText="Listings" />
      <Text mainText="Status" subText="Closed" />
      <Text mainText="Created by" subText="JP" />
      <Text mainText="Date by" subText="3rd June 2023 11:45PM" />
    </section>
  );
}

function Text({ mainText, subText }: { mainText: string; subText: string }) {
  return (
    <P2 className="flex justify-between items-center text-white600">
      {mainText} <span className="font-semibold text-xs">{subText}</span>
    </P2>
  );
}

Information.User = UserInformation;
Information.Ticket = TicketInformation;

export default Information;
