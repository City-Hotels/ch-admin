"use client";

// import Sidenav from "@/components/user/sidenav/Sidenav";
import type { PropsWithChildren } from "react";
import React, { useEffect } from "react";
// import Navbar from "@/components/shared/navbar/Navbar";
import { useSelector } from "react-redux";
import { IsLoggedIn, selectCurrentUser } from "@/store/slice/auth/auth.slice";
import { useRouter } from "next/navigation";
// import { Button } from "@mui/base";
import PrevIcon from "@/assets/icons/prev.svg";
// import ChatNav from "@/components/shared/chat/chat-dashboard/ChatDashboard";
// import Main from "../main/Main";
import styles from "./UserLayout.module.scss";
import Header from "../Header";

const UserLayout: React.FC<PropsWithChildren & { collapsed?: boolean }> = ({
  children,
  collapsed
}) => {
  const user = useSelector(selectCurrentUser);
  const loggedIn = useSelector(IsLoggedIn);

  const router = useRouter();
  useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    }
  }, [loggedIn, router]);

  return (
    <>
      <Header sidebarOpen={false} setSidebarOpen={() => null} />
      {/* <Main hideFooter={collapsed}> */}
      <div
        className={
          collapsed
            ? "gap-5 md:flex" // md:px-5 md:justify-around
            : "gap-6 md:flex md:px-5"
        }
      >
        <div
          className={`relative hidden ${
            collapsed
              ? "flex justify-center md:flex" // w-full
              : "w-[300px] md:block"
          } `}
        >
          {collapsed ? (
            <span className="ml-4">{/* <ChatNav /> */}</span>
          ) : // <Sidenav />
          null}
        </div>
        <div
          className={`${styles.container} ${
            collapsed ? styles.collapsed : styles.navExpanded
          } w-full lg:w-4/5`}
        >
          {
            // router.pathname !== "/user" &&
            !collapsed && (
              <button
                // color="text"
                className="sticky top-4 z-0 mb-4 mt-2 flex items-center gap-4 p-0 sm:z-40"
                // onClick={router.back}
              >
                <PrevIcon />
              </button>
            )
          }
          {children}
        </div>
      </div>
      {/* </Main> */}
    </>
  );
};

export default UserLayout;
