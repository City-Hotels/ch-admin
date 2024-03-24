'use client'
import { H4 } from "@/components/Headings/Headings";
import queryKeys from "@/utils/api/queryKeys";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Dots from "@/assets/icons/dots-vertical.svg";
import dayjs from "dayjs";
import type { Meta } from "@/utils/api/calls";
import { usePagination } from "../Tables/Table/Pagination";
import { Table } from "../Tables/Table/Table";
import Input from "../Inputs/Input/Input";
import { ListUsers } from "@/services/user";
import { IUser, IUserFilter } from "@/services/user/payload";
import { convertGrpcDate } from "@/utils/helpers";
import Avatar from "../Avatar/Avatar";

const UsersTable: React.FC<{
  Limit: number;
  Filter: IUserFilter;
  hidePagination?: boolean;
}> = ({ Limit, Filter, hidePagination }) => {
  // const [tableFilter, setTableFilter] = useState<userstatus | undefined>();

  const [Page, setPage] = useState(1);
  // const [filterValues, setFilterValues] = useState<{ Limit: number;  Page: number}>({ Limit: 10, })
  const { isLoading, data } = useQuery(
    [queryKeys.getUsers, Limit, Page],
    () => ListUsers({ Limit, ...Filter, Page })
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
        headerComponent={
          <div className="p-3">
            <div className="items-between flex w-full items-center justify-between gap-3">
              <H4>Users({meta.TotalCount || users.length})</H4>
              <div className="flex items-center justify-end gap-3">
                <div className="page-button-container">
                </div>
                <div className="md:min-w-[250px]">
                  <Input
                    type="search"
                    placeholder="Search"
                    className=" m-0 w-full border border-[#EAEAEA] outline-none placeholder:text-[#666666] "
                  />
                </div>
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
                <Avatar Firstname={item?.Firstname || ""} Lastname={item?.Lastname || ""} Imageurl={item.ImageUrl} className="w-10 h-10" />
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
                    {item?.Firstname}  {item?.Lastname}
                  </div>
                  <div
                    className={`text-[var(--grey-grey-400, #858D9D);] font-matter text-[11px] leading-[150%]`}
                  >

                  </div>
                </div>
              );
            }
          },
          {
            key: "Email",
            title: "Email Address",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "15%",
          },
          {
            key: "Telephone",
            title: "Telephone",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "10%",
          },
          {
            key: "Role",
            title: "Role",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "10%",
          },

          {
            key: "RegisteredDate",
            title: "Registered",
            headerClass:
              "font-matter py-2 whitespace-nowrap text-[12px] font-normal leading-[150%] text-white",
            width: "10%",
            render(_column, item) {
              return item.CreatedAt ? dayjs(convertGrpcDate(item.CreatedAt)).format("DD, MMM YYYY") : "";
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
    </div>
  );
};

export default UsersTable;
