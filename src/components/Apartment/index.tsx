import React from "react";
import { apartment } from "@/types/apartment";

import Image from "next/image";

const apartmentsData: apartment[] = [
  {
    image: "/images/apartment/apartment-02.jpg",
    name: "Hotel PH3",
    hostName: "Brad Bernard",
    city: "Tenessee",
    country: "USA",
    totalBookings: 326,
    totalReviews: 105,
    totalClicks: 205,
    status: "booked"
  },
  {
    image: "/images/apartment/apartment-04.jpg",
    name: "Meadows Inn",
    hostName: "Josh Pete",
    city: "Lisbon",
    country: "Portugal",
    totalBookings: 80,
    totalReviews: 26,
    totalClicks: 115,
    status: "available"
  },
  {
    image: "/images/apartment/apartment-05.jpg",
    name: "Whispering Pines",
    hostName: "Kevin Hathaway",
    city: "Ottawa",
    country: "Canada",
    totalBookings: 200,
    totalReviews: 84,
    totalClicks: 67,
    status: "booked"
  },
  {
    image: "/images/apartment/apartment-02.jpg",
    name: "Harmony Heights",
    hostName: "Alex Susan",
    city: "London",
    country: "UK",
    totalBookings: 100,
    totalReviews: 44,
    totalClicks: 205,
    status: "available"
  },
  {
    image: "/images/apartment/apartment-05.jpg",
    name: "Coconut Hilltop",
    hostName: "Dave Bernard",
    city: "Ohio",
    country: "USA",
    totalBookings: 100,
    totalReviews: 86,
    totalClicks: 305,
    status: "available"
  }
];

function Apartment() {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="overflow-x-scroll">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[240px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Host name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white pr-8">
                City name
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Country
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white text-nowrap">
                Total Bookings
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white text-nowrap">
                Total Reviews
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white text-nowrap">
                Total clicks
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {apartmentsData.map((apartment) => (
              <tr key={apartment.name}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <div className="sm:flex  items-center">
                    <Image
                      src={apartment.image}
                      width={48}
                      height={48}
                      alt="img-2"
                    />
                    <p className="sm:pl-2 text-nowrap">{apartment.name}</p>
                  </div>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {apartment.hostName}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white text-start">
                    {apartment.city}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {apartment.country}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="text-sm font-medium text-black dark:text-white">
                    {apartment.totalBookings}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="text-sm font-medium text-black dark:text-white">
                    {apartment.totalReviews}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="text-sm font-medium text-black dark:text-white">
                    {apartment.totalClicks}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p
                    className={`text-sm font-medium   ${apartment.status === "booked" ? "bg-danger/[0.1] text-danger" : " bg-green-700/[.10] text-green-700"} p-2 rounded-full text-center bg-opacity-8`}
                  >
                    {apartment.status}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Apartment;
