import React from "react";
import { Table } from "../Tables/Table/Table";
const index = () => {
  const countBegin = 1;
  const bookings = new Array(10)
    .fill({
      business_image: "https//ciyty-hotels/logo.png",
      business_host: "Jenna Doe",
      business_city: "Lagos",
      business_country: "Nigeria",
      total_bookings: "60",
      total_reviews: "30",
      total_clicks: "40",
      status: "confirmed"
    })
    .map((assignment) => ({ id: countBegin + 1, ...assignment }));
  return (
    <div>
      <Table
        headerColor="primary"
        className="w-full text-center"
        headerComponent={
          <div>
            {/* <div className="flex h-[42px] items-center justify-between gap-3">
              <div className="items-between mb-8 flex w-full justify-between gap-3">
                    <div className="min h-[50px] w-[calc(100%-200px)]">
                      <Input
                        type="search"
                        placeholder="Search"
                        className=" w-full border border-[#EAEAEA] outline-none placeholder:text-[#666666] "
                      />
                    </div>

                    <div className="h-[50px] w-[185px] ">
                      <Select
                        classNamePrefix="table__filter"
                        className="h-full text-[14px] text-[#666666]"
                        placeholder={"Sort By: Recents"}
                        name="options"
                        options={options}
                      />
                    </div>
                  </div>

              <span onClick={() => setShowAddUserModal(true)}>
                    <AddButton />
                  </span>
            </div> */}
          </div>
        }
        header={[
          {
            key: "business_image",
            title: "Business Image",
            width: "1%"
          },
          {
            key: "business_host",
            title: "Host Name",
            width: "2%"
          },
          {
            key: "business_city",
            title: "City",
            width: "1%"
          },
          {
            key: "business_country",
            title: "Country",
            width: "1%"
          },
          {
            key: "total_bookings",
            title: "Total bookings",
            width: "1%"
          },
          {
            key: "total_reviews",
            title: "Total Reviews",
            width: "1%"
          },
          {
            key: "total_clicks",
            title: "Total Clicks",
            width: "1%"
          },
          {
            key: "status",
            title: "Status",
            width: "1%"
          }
        ]}
        data={bookings}
      />
    </div>
  );
};

export default index;
