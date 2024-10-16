"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SidebarLinkGroup from "./SidebarLinkGroup";
import TransactionIcon from "@/assets/icons/transactions.svg";
import BookingIcon from "@/assets/icons/bookings.svg";
import DashBoardIcon from "@/assets/icons/nav-dashboard.svg";
import ListingIcon from "@/assets/icons/listing.svg";
import HotelIcon from "@/assets/icons/home-hotel.svg";
import ApartmentIcon from "@/assets/icons/home-apartment.svg";
import UserIcon from "@/assets/icons/home-user.svg";
import TicketIcon from "@/assets/icons/ticket.svg";
import LiveChatIcon from "@/assets/icons/live-chat.svg";
import MembershipIcon from "@/assets/icons/membership.svg";
import CampaignIcon from "@/assets/icons/campaign.svg";
import LogoutIcon from "@/assets/icons/logout.svg";
import { removeCredentials } from "@/store/slice/auth/auth.slice";
import { useDispatch } from "react-redux";
import Img from "../Image/Image";
import CSBUserIcon from "@/assets/icons/chb-user.svg";
import AdministatorIcon from "@/assets/icons/administrator.svg";

import Logo from "@/app/icon.png";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const dispatch = useDispatch();

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const logOut = () => {
    dispatch(removeCredentials());
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-orange100 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/" className="flex items-center justify-between gap-2">
          <Img path={Logo} name="Logo" className="w-10 h-10" />

          <h1 className="text-white900 dark:text-white100 text-[32px] mt-2">
            Admin
          </h1>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white900 dark:text-white100">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                  href="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black dark:text-white100 duration-300 ease-in-out hover:bg-orange50 dark:hover:bg-meta-4 ${
                    pathname === "/" && "bg-orange50 dark:bg-meta-4"
                  }`}
                >
                  <DashBoardIcon />
                  Dashboard
                </Link>
              </li>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/hotels" || pathname === "/apartment"
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black dark:text-white100 duration-300 ease-in-out hover:bg-orange50 dark:hover:bg-meta-4 ${
                          (pathname === "/hotels" ||
                            pathname === "/apartment") &&
                          "bg-orange50 dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <ListingIcon />
                        Listings
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/hotels"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-black dark:text-white100 duration-300 ease-in-out hover:bg-orange50 dark:hover:bg-meta-4 ${
                                pathname === "/hotels" &&
                                "bg-orange50 dark:bg-meta-4"
                              }`}
                            >
                              <HotelIcon />
                              Hotels
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/apartment"
                              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black dark:text-white100 duration-300 ease-in-out hover:bg-orange50 dark:hover:bg-meta-4 ${
                                pathname === "/apartment" &&
                                "bg-orange-50 dark:bg-meta-4"
                              }`}
                            >
                              <ApartmentIcon />
                              Apartments
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <li>
                <Link
                  href="/bookings"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black dark:text-white100 duration-300 ease-in-out hover:bg-orange50 dark:hover:bg-meta-4 ${
                    pathname.includes("/bookings") &&
                    "bg-orange-50 dark:bg-meta-4"
                  }`}
                >
                  <BookingIcon />
                  Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="/transactions"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black dark:text-white100 duration-300 ease-in-out hover:bg-orange50 dark:hover:bg-meta-4 ${
                    pathname.includes("/transactions") &&
                    "bg-orange50 dark:bg-meta-4"
                  }`}
                >
                  <TransactionIcon />
                  Transactions
                </Link>
              </li>
              <SidebarLinkGroup
                activeCondition={pathname === "/users" || pathname === "/admin"}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black dark:text-white100 duration-300 ease-in-out hover:bg-orange50 dark:hover:bg-meta-4 ${
                          (pathname === "/users" || pathname === "/admin") &&
                          "bg-orange50 dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <UserIcon />
                        Users
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/users"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-black dark:text-white dark:hover:bg-meta-4 duration-300 ease-in-out hover:bg-orange-50 ${
                                pathname === "/users" &&
                                "bg-orange-50 dark:bg-meta-4"
                              }`}
                            >
                              <CSBUserIcon />
                              CHB Users
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-black dark:text-white dark:hover:bg-meta-4 duration-300 ease-in-out hover:bg-orange-50 ${
                                pathname === "/admin" &&
                                "bg-orange-50 dark:bg-meta-4"
                              }`}
                            >
                              <AdministatorIcon />
                              Administrators
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white900 dark:text-white100">
              SUPPORT
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                  href="/ticket"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black dark:text-white100 duration-300 ease-in-out hover:bg-orange50 dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <TicketIcon />
                  Tickets
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black dark:text-white100 duration-300 ease-in-out hover:bg-orange50 dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <LiveChatIcon />
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white900 dark:text-white100">
              PROMOTION
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                  href="/memberships"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black dark:text-white100 duration-300 ease-in-out hover:bg-orange50 dark:hover:bg-meta-4 ${
                    pathname.includes("/memberships") &&
                    "bg-orange-50 dark:bg-meta-4"
                  }`}
                >
                  <MembershipIcon />
                  Memberships
                </Link>
              </li>
              <li>
                <Link
                  href="/campaigns"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black dark:text-white100 duration-300 ease-in-out hover:bg-orange50 dark:hover:bg-meta-4 ${
                    pathname.includes("/campaigns") &&
                    "bg-orange-50 dark:bg-meta-4"
                  }`}
                >
                  <CampaignIcon />
                  Campaigns
                </Link>
              </li>
            </ul>
          </div>

          <Link
            href={"/login"}
            className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-black dark:text-white100 duration-300 ease-in-out hover:bg-orange50 dark:hover:bg-meta-4 `}
            onClick={() => logOut()}
          >
            <LogoutIcon />
            Log Out
          </Link>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
