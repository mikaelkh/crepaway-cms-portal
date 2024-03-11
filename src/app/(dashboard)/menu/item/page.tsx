import Table from "@/components/Table";
import Image from "next/image";
import React from "react";
import tableData from "@/data/items-table.json";

type Props = {};

const columns: TableColumn[] = [
  {
    title: "ID",
    accessor: "id",
    className: "w-[150px]",
    sortable: true,
    Cell: ({ value }: { value: string }) => {
      return (
        <div className="h-[70px] w-[70px]">
          <Image alt="w" src={"/"} fill className="object-cover" />
        </div>
      );
    },
  },
  {
    title: "NAME",
    accessor: "name",
    className: "w-[150px]",
    sortable: true,
    Cell: ({ value }: { value: string }) => {
      return (
        <div className="h-[70px] w-[70px]">
          <Image alt="w" src={"/"} fill className="object-cover" />
        </div>
      );
    },
  },
];

const Page = (props: Props) => {
  return <Table columns={columns} data={tableData} />;
};

export default Page;
