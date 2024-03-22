import { Column, ColumnDef, flexRender } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props<T> = {
  table: import("@tanstack/table-core").Table<T>;
  columns: ColumnDef<T>[];
  sorting: SortingState;
  filter: string;
  pagination: PaginationState;
  setFilter: Dispatch<SetStateAction<string>>;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
};

const CustomTable = <T,>({
  table,
  columns,
  sorting,
  filter,
  setFilter,
  setSorting,
  pagination,
  setPagination,
}: Props<T>) => {
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              console.log(headerGroup);

              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    console.log(header.column.columnDef.header);
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.enableSorting ? (
                                <Button
                                  variant="ghost"
                                  onClick={() =>
                                    setSorting({
                                      // typescript issue with ColumnDef react table definition , accessorKey by documentation is a key of ColumnDef
                                      key:
                                        // @ts-ignore
                                        header.column.columnDef.accessorKey ??
                                        "",
                                      order:
                                        sorting.order === "asc"
                                          ? "desc"
                                          : "asc",
                                    })
                                  }
                                >
                                  <>{header.column.columnDef.header}</>
                                  <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                              ) : (
                                header.column.columnDef.header
                              ),
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CustomPagination setPagination={setPagination} pagination={pagination} />
    </div>
  );
};

export default CustomTable;

const CustomPagination = ({
  pagination,
  setPagination,
}: {
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  pagination: PaginationState;
}) => {
  const renderPaginationLinks = () => {
    const totalPages = pagination.total;
    const currentPage = pagination.currentPage;
    const maxVisiblePages = 5; // Number of pages to show at a time

    const pages = [];

    // If there are less than or equal to maxVisiblePages total pages,
    // simply render all pages
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i} className="select-none cursor-pointer">
            <PaginationLink
              onClick={() => setPagination({ ...pagination, currentPage: i })}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Calculate the range of pages to display around the current page
      const rangeStart = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const rangeEnd = Math.min(totalPages, rangeStart + maxVisiblePages - 1);

      // Render first page and ellipsis if needed
      if (rangeStart > 1) {
        pages.push(
          <PaginationItem key={1} className="select-none cursor-pointer">
            <PaginationLink
              onClick={() => setPagination({ ...pagination, currentPage: 1 })}
              isActive={currentPage === 1}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Render pages within the range
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(
          <PaginationItem key={i} className="select-none cursor-pointer">
            <PaginationLink
              onClick={() => setPagination({ ...pagination, currentPage: i })}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Render last page and ellipsis if needed
      if (rangeEnd < totalPages) {
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
        pages.push(
          <PaginationItem
            key={totalPages}
            className="select-none cursor-pointer"
          >
            <PaginationLink
              onClick={() =>
                setPagination({ ...pagination, currentPage: totalPages })
              }
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return pages;
  };

  return (
    <Pagination className="py-4">
      <PaginationContent>
        <PaginationItem className="select-none cursor-pointer">
          <PaginationPrevious
            onClick={() => {
              if (pagination.currentPage !== 1)
                setPagination((prev) => ({
                  ...prev,
                  currentPage: prev.currentPage - 1,
                }));
            }}
          />
        </PaginationItem>
        {renderPaginationLinks()}
        <PaginationItem>
          <PaginationNext
            className="select-none cursor-pointer"
            onClick={() => {
              if (pagination.currentPage !== pagination.total)
                setPagination((prev) => ({
                  ...prev,
                  currentPage: prev.currentPage + 1,
                }));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
