import React, { useMemo } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCredentials,
  selectCurrentUser
} from "@/store/slice/auth/auth.slice";
import { UserRoles } from "@/services/user/payload";
// import { HotelNavs, UserNavs } from "@/utils/constants";
import LogoutIcon from "@/assets/icons/logout.svg";
import styles from "./ChatSidenav.module.scss";
import ChatIcon from "@/assets/icons/chat.svg";
import SupportIcon from "@/assets/icons/support.svg";
import DashboardIcon from "@/assets/icons/chat-home.svg";
import HistoryIcon from "@/assets/icons/history.svg";
import SettingsIcon from "@/assets/icons/settings.svg";

const UserNavs = [
  {
    icon: DashboardIcon,
    title: "Profile",
    route: "/user"
  },
  {
    icon: HistoryIcon,
    title: "Bookings",
    route: "/user/bookings"
  },
  {
    icon: ChatIcon,
    title: "Messages",
    route: "/chat",
    stroke: true
  },
  {
    icon: SupportIcon,
    title: "Support",
    route: "/support",
    stroke: true
  },
  {
    icon: SettingsIcon,
    title: "Manage Account",
    route: "/user/manage"
  },
  {
    icon: SettingsIcon,
    title: "Saved Spaces",
    route: "/saved-spaces"
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
        <LogoutIcon />
      </div>
    </div>
  );
};

export default ChatDashboard;
