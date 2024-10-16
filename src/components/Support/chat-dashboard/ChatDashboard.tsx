import React, { useMemo } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCredentials,
  selectCurrentUser
} from "@/store/slice/auth/auth.slice";
import { UserRoles } from "@/services/user/payload";
import LogoutIcon from "@/assets/icons/logout.svg";
import styles from "./ChatSidenav.module.scss";
import TransactionIcon from "@/assets/icons/transactions.svg";
import SupportIcon from "@/assets/icons/support.svg";
import DashboardIcon from "@/assets/icons/nav-dashboard.svg";
import BookingIcon from "@/assets/icons/bookings.svg";
import MembershipIcon from "@/assets/icons/membership.svg";
import CampaignIcon from "@/assets/icons/campaign.svg";
import HotelIcon from "@/assets/icons/home-hotel.svg";
import ApartmentIcon from "@/assets/icons/home-apartment.svg";
import CampaignFormIcon from "@/assets/icons/campaign-form.svg";
import TicketIcon from "@/assets/icons/ticket.svg";
import UserIcon from "@/assets/icons/chb-user.svg";
import AdministatorIcon from "@/assets/icons/administrator.svg";


const UserNavs = [
  {
    icon: DashboardIcon,
    title: "home",
    route: "/"
  },
  {
    icon: HotelIcon,
    title: "Hotels",
    route: "/hotels",
  },
  {
    icon: ApartmentIcon,
    title: "Apartment",
    route: "/apartment",
  },
  {
    icon: BookingIcon,
    title: "Bookings",
    route: "/bookings"
  },
  {
    icon: TransactionIcon,
    title: "Transactions",
    route: "/transactions",
    stroke: true
  },
  {
    icon: UserIcon,
    title: "CSB User",
    route: "/users",
  },
  {
    icon: AdministatorIcon,
    title: "CSB Administrator",
    route: "/admin",
  },
  {
    icon: TicketIcon,
    title: "Ticket",
    route: "/ticket",
    stroke: true
  },
  {
    icon: SupportIcon,
    title: "Support",
    route: "/support",
    stroke: true
  },
  {
    icon: MembershipIcon,
    title: "Membership",
    route: "/memberships"
  },
  {
    icon: CampaignIcon,
    title: "Campaign",
    route: "/campaigns"
  },
  {
    icon: CampaignFormIcon,
    title: "Campaign Form",
    route: "/campaign-form"
  }
];

const ChatDashboard = () => {
  // const router = useRouter();
  const pathname = usePathname();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const navs = useMemo(
    () => (user && user.Role === UserRoles.ADMIN ? UserNavs : []),
    [user]
  );

  const logout = () => {
    dispatch(removeCredentials());
  };

  return (
    <div className={styles.container}>
      {navs
        .filter((item) => item.route)
        .map((item) => (
          <Link
            key={item.route}
            href={item.route}
            className={`${styles.navItem} ${
              item.stroke ? styles.icon__stroke : styles.icon__fill
              // } ${router.pathname === item.route ? styles.active : ""}`}
            } ${pathname === item.route ? styles.active : ""}`}
          >
            <item.icon className="size-6" />
          </Link>
        ))}
      <div className={`${styles.navItem}`} onClick={() => logout()}>
        <LogoutIcon className="text-white"/>
      </div>
    </div>
  );
};

export default ChatDashboard;
