"use client";
import React, { use, useRef } from "react";
import { get } from "lodash";

import match from "@/utils/match";
import type { IPagination } from "./Pagination";
import Pagination from "./Pagination";
import styles from "./Table.module.scss";
// import match from "../../../utils/match";
export interface IColumnType<T> {
  key: string;
  title: string;
  titleClass?: string;
  headerClass?: string;
  width?: string;
  render?: (column: IColumnType<T>, item: T) => React.ReactNode;
  renderHeader?: (column: IColumnType<T>) => React.ReactNode;
  onRowClick?: (item: T) => void;
}

interface Props<T> extends Partial<IPagination> {
  data: T[];
  header: IColumnType<T>[];
  headerComponent?: React.ReactNode;
  headerColor?: string;
  isLoading?: boolean;
  withPagination?: boolean;
  errorMessage?: string;
  onRowClick?: (item: T) => void;
  className?: string
}

interface PropsTableRow<T> {
  data: T[];
  columns: IColumnType<T>[];
  onRowClick?: (item: T) => void;
}

interface PropsTableHeader<T> {
  columns: IColumnType<T>[];
  headerColor?: string;
}

interface PropsTableCell<T> {
  item: T;
  column: IColumnType<T>;
}

/* Michael: i just added this inline style, 
please find a way to integrate the styling into one style={attribute} */
// const tableHeaderStyles: React.CSSProperties = {
//   position: "sticky",
//   top: "48px",
//   backgroundColor: "#FE8501",
//   headerColor: "white",
//   height: "55.5px",
//   zIndex: "18"
// }; // ---------------->༼ つ ◕_◕ ༽つ

export function TableHeader<T>({
  columns,
  headerColor
}: PropsTableHeader<T>): JSX.Element {
  const variant = match(headerColor || "neutral", {
    primary: styles.variants__primary,
    secondary: styles.variants__secondary,
    neutral: styles.variants__neutral,
    danger: styles.variants__danger,
    media: styles.variants__media,
    default: ""
  });

  return (
    <tr>
      {columns.map((column, columnIndex) => (
        <th
          key={`table-header-${columnIndex}`}
          className={`${variant}`}
          style={{ width: `${column.width},` }}

        // style={tableHeaderStyles} // Please fix this
        >
          <div className={styles.header}>
            {column.renderHeader ? (
              column.renderHeader(column)
            ) : (
              <span className={column.headerClass}>{column.title}</span>
            )}
          </div>
        </th>
      ))}
    </tr>
  );
}

function TableRoWCell<T>({ item, column }: PropsTableCell<T>): JSX.Element {
  const value = get(item, column.key);
  return (
    <td
      className={`p-1 py-2 text-sm text-[#42526D]`}
      style={{ width: `${column.width}` }}
    >
      {column.render ? (
        column.render(column, item)
      ) : (
        <span className={`truncate text-sm ${column.titleClass}`}>{value}</span>
      )}
    </td>
  );
}

export function TableRow<T>({
  data,
  columns,
  onRowClick
}: PropsTableRow<T>): JSX.Element {
  return (
    <>
      {data.map((item, itemIndex) => (
        <tr
          className={styles.tableRow}
          key={`table-body-${itemIndex}`}
          onClick={() => onRowClick && onRowClick!(item)}
        >
          {columns.map((column, columnIndex) => (
            <TableRoWCell
              key={`table-body-${columnIndex}`}
              item={item}
              column={column}
            />
          ))}
        </tr>
      ))}
    </>
  );
}

export function Table<T>({
  data,
  header,
  headerComponent,
  headerColor,
  onRowClick,
  isLoading = false,
  errorMessage,
  withPagination = false,
  className,
  ...paginationProps
}: Props<T>): JSX.Element {
  const headerComponentRef = useRef<HTMLDivElement | null>(null);
  // const topSpace = headerComponentRef?.current?.clientHeight || 0;

  return (
    <div className={className}>
      <div className="relative ">
        {headerComponent && (
          <div ref={headerComponentRef} className="pb-5">
            {headerComponent}
          </div>
        )}
        {data.length > 0 && (
          <div className="w-full overflow-x-scroll">
            <table className="table h-auto w-full table-auto rounded rounded-t-md  border-none p-1">
              <thead>
                <TableHeader columns={header} headerColor={headerColor} />
              </thead>
              <tbody className="relative">
                <TableRow
                  data={data}
                  columns={header}
                  onRowClick={onRowClick}
                />
              </tbody>
            </table>
          </div>
        )}
        {isLoading && data.length === 0 && "Loading"}
        {!isLoading && data.length === 0 && (
          <div className={styles.base}>
            <div className="text-center">
              <p className="text-neutral-400">
                {errorMessage || "Please try again later"}
              </p>
            </div>
          </div>
        )}
      </div>

      {withPagination && paginationProps.total && paginationProps.total > 0 ? (
        <div className="flex justify-end ">
          <div className="max-w-[300px] lg:basis-1/4">
            <Pagination
              totalPages={paginationProps.totalPages || Math.ceil(paginationProps.total / (paginationProps.perPage || 10))}
              total={paginationProps.total || data.length}
              currentPage={paginationProps.currentPage || 1}
              perPage={paginationProps.perPage || 10}
              onPageChange={paginationProps.onPageChange || (() => { })}
              updatePerPage={paginationProps.updatePerPage || (() => { })}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
