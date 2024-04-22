import React from "react";

import ReservationHistory from "@/components/Bookings/BookingTable";
import ButtonLink from "@/components/Button/Link/Link";

const Bookings = () => {
  return (
    <div className="bg-white">
      <ReservationHistory Limit={5} Filter={{}} hidePagination={true} />
      <div className=" mt-3 flex items-center justify-center border-t py-4">
        <ButtonLink variant="text" color="text" href={"/hotel/bookings"}>
          View all
        </ButtonLink>
      </div>
    </div>
  );
};

export default Bookings;
