"use client";
import { H4 } from "@/components/Headings/Headings";
import queryKeys from "@/utils/api/queryKeys";
import React, { useState } from "react";
import { useQuery } from "react-query";
import FilterIcon from "@/assets/icons/filter2.svg";
import Dots from "@/assets/icons/dots-vertical.svg";
import dayjs from "dayjs";
import type { Meta } from "@/utils/api/calls";
import { usePagination } from "../Tables/Table/Pagination";
import { Table } from "../Tables/Table/Table";
import Input from "../Inputs/Input/Input";
import { ListUsers } from "@/services/user";
import { IUser, IUserFilter, UserRoles } from "@/services/user/payload";
import { convertGrpcDate } from "@/utils/helpers";
import Avatar from "../Avatar/Avatar";
import UserFilterComponent from "./Filter/Filter";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";

const UsersTable: React.FC<{
  Limit: number;
  Filter: IUserFilter;
  hidePagination?: boolean;
}> = ({ Limit, Filter, hidePagination }) => {
  const [Page, setPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({ ...Filter });

  const { isLoading, data } = useQuery([queryKeys.getUsers, Limit, Page, filters], () =>
    ListUsers({ Limit, ...filters, Page })
  );
  const users = (data?.data.Users as IUser[]) || [];
  const meta = (data?.data.Meta as Meta) || [];

  const { currentPage, perPage, handlePageChange } = usePagination({
    defaultCurrentPage: 1,
    defaultPerPage: 5,
    refetch: (page: number) => {
      setPage(page);
    }
  });
  const router = useRouter();
  return (
    <div className="bg-white rounded-md">
      <Table
        withPagination={!hidePagination}
        perPage={perPage}
        currentPage={currentPage}
        totalPages={meta.TotalPages}
        total={users.length}
        onPageChange={handlePageChange}
        headerColor="primary"
        errorMessage="You have not gotten any users"
        onRowClick={
          (user) => router.push(`/users/${user.Id}`)
        }
        headerComponent={
          <div className="p-3">
            <div className="items-between flex w-full items-center justify-between gap-3">
              <H4>Users({meta.TotalCount || users.length})</H4>
              <div className="flex items-center justify-end gap-3">
                <div className="page-button-container"></div>
                <div className="md:min-w-[250px]">
                  <Input
                    type="search"
                    placeholder="Search"
                    className=" m-0 w-full border border-[#EAEAEA] outline-none placeholder:text-[#666666]"
                    value={filters.Email}
                    onChange={(ev) => setFilters({ ...filters, Email: ev.currentTarget.value })}
                  />
                </div>

                <div className="page-button-container">
                  <span className="page-button-wrapper flex gap-2">
                    <div
                      className={`rounded-full border w-17 px-2  py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer  
                         ${filters.Role === undefined ? "text-primary400 border-primary400 " : "text-white800 border-white700"}`}
                      onClick={() => {
                        setFilters({ ...filters, Role: undefined });
                      }}
                    >
                      All ({meta.TotalCount})
                    </div>
                    {Object.values(UserRoles)
                      .filter((value) => typeof value === "string")
                      .map((roles) => (
                        <div
                          key={roles}
                          className={`rounded-full border  px-2 
                       
                         py-2 text-center text-[12.54px]  hover:bg-white100. hover:text-primary400 hover:border-primary400 cursor-pointer 
                          ${filters.Role ===
                              UserRoles[roles as keyof typeof UserRoles]
                              ? "text-primary400 border-primary400 "
                              : "text-white800 border-white700 "
                            }`}
                          onClick={() => {
                            setFilters({
                              ...filters,
                              Role: UserRoles[roles as keyof typeof UserRoles]
                            });
                          }}
                        >
                          {roles}
                          {`(${users.length})`}

                          {roles === UserRoles.ADMIN &&
                            `(${users.filter(
                              (item: IUser) => item.Role === UserRoles.ADMIN
                            ).length
                            })`}

                          {roles === UserRoles.HOTELADMIN &&
                            `(${users.filter(
                              (item: IUser) =>
                                item.Role === UserRoles.HOTELADMIN
                            ).length
                            })`}
                          {roles === UserRoles.USER &&
                            `(${users.filter(
                              (item: IUser) => item.Role === UserRoles.USER
                            ).length
                            })`}
                        </div>
                      ))}
                  </span>
                </div>

                <Button
                  size="sm"
                  color="outline-dark"
                  variant="outline"
                  onClick={() => setShowFilterModal(true)}
                >
                  <span className="flex gap-2 px-3">
                    <FilterIcon /> Filter
                  </span>
                </Button>
              </div>
            </div>
          </div>
        }
        header={[
          {
            key: "img",
            title: "",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "1%",
            render(_column, item) {
              return (
                <Avatar
                  Firstname={item?.Firstname || ""}
                  Lastname={item?.Lastname || ""}
                  Imageurl={item.ImageUrl}
                  className="w-10 h-10"
                />
              );
            }
          },
          {
            key: "FullName",
            title: "Name",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "15%",
            render(_column, item) {
              return (
                <div>
                  <div className={`text-[14px] leading-[150%] text-black`}>
                    {item?.Firstname} {item?.Lastname}
                  </div>
                  <div
                    className={`text-[var(--grey-grey-400, #858D9D);] font-matter text-[11px] leading-[150%]`}
                  ></div>
                </div>
              );
            }
          },
          {
            key: "Email",
            title: "Email Address",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "15%"
          },
          {
            key: "Telephone",
            title: "Telephone",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "10%"
          },
          {
            key: "Role",
            title: "Role",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "10%"
          },

          {
            key: "RegisteredDate",
            title: "Registered",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "10%",
            render(_column, item) {
              return item.CreatedAt
                ? dayjs(convertGrpcDate(item.CreatedAt)).format("DD, MMM YYYY")
                : "";
            }
          },
          {
            key: "more",
            title: "",
            width: "1%",
            render() {
              return <Dots className="mr-6 cursor-pointer" />;
            }
          }
        ]}
        data={users}
        isLoading={isLoading}
      />
      <Modal
        openModal={showFilterModal}
        setOpenModal={setShowFilterModal}
        variant="plain"
      >
        <UserFilterComponent
          filter={filters}
          onClose={() => setShowFilterModal(false)}
          setFilter={(filter) => {
            console.log({ filter });
            setFilters(filter);
          }}
        />
      </Modal>
    </div>
  );
};

export default UsersTable;
