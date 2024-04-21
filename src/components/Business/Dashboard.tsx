import React from "react";

import SummaryCard from "@/components/hotelAdmin/summaryCard/SummaryCard";
import UserCard from "@/components/hotel/dashboard/userCard/UserCard";
import Review from "@/components/hotel/dashboard/review/Review";
import styles from "./Dashboard.module.scss";
import Bookings from "./Bookings";
import Rooms from "./Rooms";
import RoomTypes from "./RoomTypes";
import Facilities from "./Facilities";

export default function HotelAdminDashboard() {
  // Select container Styling
  // Get Hotel from context or wherever
  return (
    <div className={styles.header}>
      <SummaryCard path={"/summarycard.png"} />
      <Bookings />
      <Review />
      <Rooms />
      <RoomTypes />
      <Facilities />
      <UserCard />
    </div>
  );
}
