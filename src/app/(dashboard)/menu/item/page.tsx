"use client";

import * as React from "react";
import {
  ColumnDef,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useState } from "react";
import CustomTable from "@/components/CustomTable";

import { columns } from "./columns";

const data: Item[] = [
  {
    id: 0,
    name: "Burger",
    image_url: "/",
    created_at: new Date(),
    price: 5000,
    source: "Portal",
    type: "item",
  },
  {
    id: 1,
    name: "Pizza",
    image_url: "/",
    created_at: new Date(),
    price: 5000,
    source: "Portal",
    type: "item",
  },
  {
    id: 2,
    name: "Fries",
    image_url: "/",
    created_at: new Date(),
    price: 129000,
    source: "Portal",
    type: "item",
  },
];

export default function Page() {
  const [sorting, setSorting] = useState<SortingState>({ key: "", order: "" });
  const [columnFilter, setColumnFilter] = useState<string>("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    total: 50,
    currentPage: 1,
    showPerPage: 5,
  });

  const table = useReactTable({
    data,

    
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  return (
    <CustomTable
      table={table}
      columns={columns}
      filter={columnFilter}
      setFilter={setColumnFilter}
      sorting={sorting}
      setSorting={setSorting}
      pagination={pagination}
      setPagination={setPagination}
    />
  );
}
