import type { PropsWithChildren } from "react";
import React from "react";
import MailIcon from "@/assets/icons/chat.svg";
import OrangeMailIcon from "@/assets/icons/chat-orange.svg";
import SupportIcon from "@/assets/icons/supportIcon.svg";
import OrangeSupportIcon from "@/assets/icons/orange-support.svg";
// import { P, P3 } from "@/components/shared/headings/Headings";
import Link from "next/link";
import UserLayout from "../User/User";
import ChatDashboard from "../support-1/chat-dashboard/ChatDashboard";

const ChatTab: React.FC<{
  value: "ticket" | "support";
  HoverIcon: any;
  Icon: any;
  label: "ticket" | "support";
  notificationCount: number;
  setValue: (value: "ticket" | "support") => void;
}> = ({ label, Icon, HoverIcon, value, notificationCount }) => (
  <Link href={`/${label}`} className="group cursor-pointer">
    <div
      className={`flex items-center gap-2 border-b pb-1 group-hover:text-primary400  ${
        label === value && "border-b-primary400 text-primary400"
      }`}
    >
      {value === label ? <HoverIcon /> : <Icon />}
      <p>{label}</p>
      {notificationCount > 0 && (
        <p
          className={`flex h-4 w-7 items-center justify-center rounded-xl bg-[#F0F2F5] py-1 text-center group-hover:bg-primary400 group-hover:text-white ${
            label === value && "bg-primary400 text-white"
          }`}
        >
          {notificationCount}
        </p>
      )}
    </div>
  </Link>
);

// 70.66667175292969
const ChatLayout: React.FC<
  PropsWithChildren & {
    active: "ticket" | "support";
    setActive: (active: "ticket" | "support") => void;
  }
> = ({ active, setActive, children }) => {
  return (
    <UserLayout collapsed>
      <div className="flex gap-2">
        <span className="hidden md:block">
          <ChatDashboard />
        </span>
        <div className="lg:h-[calc(100vh- 83px)] relative h-[calc(100vh-94px)] md:h-[calc(100vh-130px)] lg:mt-0">
          {/* <div className="relative mt-5 overflow-y-clip lg:mt-0"> */}
          <div className="sticky my-2 hidden flex-row gap-4 md:flex">
            <ChatTab
              Icon={MailIcon}
              HoverIcon={OrangeMailIcon}
              notificationCount={4}
              label="ticket"
              value={active}
              setValue={setActive}
            />
            <ChatTab
              Icon={SupportIcon}
              HoverIcon={OrangeSupportIcon}
              notificationCount={0}
              label="support"
              value={active}
              setValue={setActive}
            />
          </div>
          {children}
        </div>
      </div>
    </UserLayout>
  );
};

export default ChatLayout;
