import Edit from "@/assets/icons/edit.svg";
import AddHotelAdmin from "@/components/hotel/addHotelAdmin/AddHotelAdmin";
import AddButton from "@/components/button/AddButton";
import { H4 } from "@/components/Headings/Headings";
import Img from "@/components/Image/Image";
import Checkbox from "@/components/inputs/checkbox/Checkbox";
import Input from "@/components/inputs/input/Input";
import Modal from "@/components/modal/Modal";
import { Table } from "@/components/table/Table";
import HotelAdminLayout from "@/layout/hotelAdmin/HotelAdmin";
import { useState } from "react";
import Select from "react-select";

export default function Users() {
  // Select container Styling
  const countBegin = 1;
  const bookings = new Array(10)
    .fill({
      customer_name: "Customer Name 1",
      customer_email: "example@gmail.com",
      customer_profile: "/customer-1.svg",
      checkbox: "checkbox",
      // Michael: I just added this for the hotel dashboard user Page
      role: "9660",
      telephone_no: "08011001110",
      status: "confirmed"
    })
    .map((assignment) => ({ id: countBegin + 1, ...assignment }));

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];
  // Modal form style

  const [showAddUserModal, setShowAddUserModal] = useState(false);

  return (
    <HotelAdminLayout>
      <div className="size-full items-center p-8">
        <H4 className="mb-[30px] text-[24px] font-semibold">Users</H4>
        <div className="bg-white">
          <Table
            headerColor="primary"
            headerComponent={
              <div>
                <div className="flex h-[42px] items-center justify-between gap-3">
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
                </div>
              </div>
            }
            header={[
              {
                key: "checkbox",
                title: "checkbox",
                width: "2%",

                renderHeader() {
                  return (
                    <div className="py-3">
                      <Checkbox label={""} value={false} onChange={() => { }} />
                    </div>
                  );
                },
                render(_column, item) {
                  return <input type="checkbox" name={item.checkbox} />;
                }
              },
              {
                key: "customer_name",
                title: "NAME",
                width: "13%",
                render(_column, item) {
                  return (
                    <div className="flex items-center gap-5">
                      <Img
                        path={item.customer_profile}
                        alt="User Profile"
                        name="Hotel Img"
                        className="size-[50px]"
                      />
                      <div className="flex  flex-col gap-1">
                        <div className={` text-[14px] text-black`}>
                          {item.customer_name}
                        </div>
                        <div className="text-[12px] text-black">
                          {item.customer_email}
                        </div>
                      </div>
                    </div>
                  );
                }
              },
              {
                key: "role",
                title: "ROLE",
                width: "4%"
              },
              {
                key: "telephone_no",
                title: "TELEPHONE NO",
                width: "4%"
              },
              {
                key: "status",
                title: "Status",
                width: "1%",
                render(_column, item) {
                  return (
                    <div
                      className={`${(item.status === "active" && "bg-[#3401FE]") ||
                        (item.status === "checked in" && "bg-[#FE8501]") ||
                        (item.status === "confirmed" && "bg-[#3CBC00]") ||
                        "bg-[#FE012F]"
                        }   flex items-center justify-center gap-2 rounded-md px-[11px] py-[6px]`}
                    >
                      <span className="size-[5px] rounded-full bg-[#FFF] "></span>
                      <div className="text-right text-[#FFF]">
                        {item.status}
                      </div>
                    </div>
                  );
                }
              },
              {
                key: "status",
                title: "",
                width: "0.5%",
                render() {
                  return <Edit className="ml-8 cursor-pointer" />;
                }
              }
            ]}
            data={bookings}
          />
        </div>
      </div>
      <Modal
        openModal={showAddUserModal}
        setOpenModal={setShowAddUserModal}
        variant="plain"
      >
        <section>
          <AddHotelAdmin onCancel={() => setShowAddUserModal(false)} />
        </section>
      </Modal>
    </HotelAdminLayout>
  );
}
