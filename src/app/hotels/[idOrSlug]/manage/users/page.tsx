"use client"
import Edit from "@/assets/icons/edit.svg";
import AddButton from "@/components/Button/Button"
import { H4 } from "@/components/Headings/Headings";
import Input from "@/components/Inputs/Input/Input";
import Modal from "@/components/Modal/Modal";
import { Table } from "@/components/Tables/Table/Table"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import Select from "react-select";
import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import NewAdminModal from "@/components/Business/Modals/newAdmin/NewAdminModal";
import { useQuery } from "react-query";
import { getHotelRoles, getHotelUsers } from "@/services/hotel-users";
import queryKeys from "@/utils/api/queryKeys";
import { HOTELROLES } from "@/utils/constants";
import NewUserRoleModel from "@/components/Business/Modals/newAdminRole/NewUserRoleModal";

export default function Users() {
  const [custonRoleModal, setCustonRoleModal] = useState(false);
  const { data } = useQuery([queryKeys.getHotelUsers], getHotelUsers);

  const hotelUsers = data?.data.HotelUsers;

  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const { data: savedRoleRes } = useQuery(
    [queryKeys.getHotelRoles],
    getHotelRoles
  );

  const savedRoles = savedRoleRes?.data.ServiceRoles || [];
  const roles = [...HOTELROLES, ...savedRoles];

  return (
    <DefaultLayout>
      <div className="size-full items-center p-5">
        <div className="flex justify-between items-center w-full  mb-3">
          <H4 className="font-semibold">Users</H4>
          <Button size="md" onClick={() => setShowAddUserModal(true)}>
            Add a new User
          </Button>
        </div>
        <div className="bg-white">
          <Table
            headerColor="primary"
            headerComponent={
              <div className="flex items-center justify-between gap-3 p-3">
                <div className="items-between flex w-full justify-between gap-3">
                  <div className=" w-[calc(100%-200px)]">
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
                      options={roles.map((role) => ({
                        label: role.Title,
                        value: role.Id
                      }))}
                    />
                  </div>
                </div>

                <span onClick={() => setShowAddUserModal(true)}>
                  <AddButton />
                </span>
              </div>
            }
            header={[
              {
                key: "customer_name",
                title: "NAME",
                width: "30%",
                renderHeader() {
                  return (
                    <div className="py-2">
                      ADMIN
                    </div>
                  );
                },
                render(_column, item) {
                  return (
                    <div className="flex items-center gap-5">
                      <Avatar
                        Imageurl={item.Imageurl || ""}
                        className="size-[50px]"
                        Firstname={item.Firstname || ""}
                        Lastname={item.Lastname || ""}
                      />
                      <div className="flex  flex-col gap-1">
                        <div className={` text-[14px] text-black`}>
                          {item.Firstname}
                        </div>
                        <div className="text-[12px] text-black">
                          {item.Lastname}
                        </div>
                      </div>
                    </div>
                  );
                }
              },
              {
                key: "role",
                title: "ROLE",
                width: "10%"
              },
              {
                key: "telephone_no",
                title: "TELEPHONE",
                width: "10%"
              },
              {
                key: "status",
                title: "STATUS",
                width: "1%",
                render(_column, item) {
                  return (
                    <div
                      className={`${(item.Status === "active" && "bg-[#3401FE]") ||
                        (item.Status === "checked in" && "bg-[#FE8501]") ||
                        (item.Status === "confirmed" && "bg-[#3CBC00]") ||
                        "bg-[#FE012F]"
                        }   flex items-center justify-center gap-2 rounded-md px-[11px] py-[6px]`}
                    >
                      <span className="size-[5px] rounded-full bg-[#FFF] "></span>
                      <div className="text-right text-[#FFF]">
                        {item.Status}
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
            data={hotelUsers || []}
          />
        </div>
      </div>
      {custonRoleModal && (
        <div className="fixed left-0 top-0 z-[1000000] flex h-screen w-screen items-center justify-center bg-transparent shadow-lg">
          <div className="h-[98vh] w-full max-w-[600px] bg-white px-10">
            <NewUserRoleModel closeModal={() => setCustonRoleModal(false)} />
          </div>
        </div>
      )}
      <Modal
        openModal={showAddUserModal}
        setOpenModal={setShowAddUserModal}
        variant="filled"
      >
        <section>
          <NewAdminModal
            onClickCreateCustomRole={() => setCustonRoleModal(true)}
            closeModal={setShowAddUserModal}
          />
        </section>
      </Modal>
    </DefaultLayout>
  );
}
