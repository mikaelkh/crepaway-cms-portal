import React from "react";

import {
  Table as ShadTable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  columns: TableColumn[];
  caption?: string;
  data: Array<any>;
};

const Row = ({
  row,
  columns,
}: {
  row: { [col: string]: any };
  columns: TableColumn[];
}) => {
  const cells = Object.entries(row).map(([key, value]) => {
    const columnCell = getColumnCell(key, columns);
    if (!columnCell) return <></>;
    return (
      <TableCell>
        {columnCell.Cell ? columnCell.Cell({ value }) : value}
      </TableCell>
    );
  });
  return cells;
};

const Table = ({ columns, caption, data }: Props) => {
  return (
    <ShadTable>
      {caption && <TableCaption>A list of your recent invoices.</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead className={col.className}>{col.title}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {data.map((row, idx) => (
            <Row key={idx} row={row} columns={columns} />
          ))}
          {/* <TableCell className="font-medium">INV001</TableCell> */}
        </TableRow>
      </TableBody>
    </ShadTable>
  );
};

export default Table;

function getColumnCell(
  accessor: string,
  columns: TableColumn[]
): TableColumn | undefined {
  const columnCell = columns.find((v) => v.accessor === accessor);
  return columnCell;
}
