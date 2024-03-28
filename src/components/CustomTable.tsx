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
  const totalPages = pagination.total;
  const currentPage = pagination.currentPage;
  const maxVisiblePages = 5;

  const renderPageLink = (pageNumber: number) => (
    <PaginationItem key={pageNumber} className="select-none cursor-pointer">
      <PaginationLink
        onClick={() =>
          setPagination({ ...pagination, currentPage: pageNumber })
        }
        isActive={currentPage === pageNumber}
      >
        {pageNumber}
      </PaginationLink>
    </PaginationItem>
  );

  const renderPaginationLinks = () => {
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(renderPageLink(i));
      }
    } else {
      const start = Math.max(
        1,
        Math.min(
          currentPage - Math.floor(maxVisiblePages / 2),
          totalPages - maxVisiblePages + 1
        )
      );
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (start > 1) {
        pages.push(renderPageLink(1));
        if (start > 2)
          pages.push(
            <PaginationItem key="ellipsis-start">
              <PaginationEllipsis />
            </PaginationItem>
          );
      }

      for (let i = start; i <= end; i++) {
        pages.push(renderPageLink(i));
      }

      if (end < totalPages) {
        if (end < totalPages - 1)
          pages.push(
            <PaginationItem key="ellipsis-end">
              <PaginationEllipsis />
            </PaginationItem>
          );
        pages.push(renderPageLink(totalPages));
      }
    }

    return pages;
  };

  return (
    <Pagination className="py-4">
      <PaginationContent>
        <PaginationItem className="select-none cursor-pointer">
          <PaginationPrevious
            onClick={() =>
              pagination.currentPage !== 1 &&
              setPagination((prev) => ({
                ...prev,
                currentPage: prev.currentPage - 1,
              }))
            }
          />
        </PaginationItem>
        {renderPaginationLinks()}
        <PaginationItem>
          <PaginationNext
            className="select-none cursor-pointer"
            onClick={() =>
              pagination.currentPage !== totalPages &&
              setPagination((prev) => ({
                ...prev,
                currentPage: prev.currentPage + 1,
              }))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
