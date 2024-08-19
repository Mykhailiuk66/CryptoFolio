import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  SortDescriptor,
} from "@nextui-org/react";
import { Key } from "react";
import { ColumnType } from "../../types";

type CustomTableProps<T> = {
  sortDescriptor: SortDescriptor;
  setSortDescriptor: React.Dispatch<React.SetStateAction<SortDescriptor>>;
  topContent: React.ReactNode;
  headerColumns: ColumnType[];
  sortedItems: T[];
  CellComponent: React.ComponentType<{ item: T; columnKey: Key }>;
};

const CustomTable = <T,>({
  sortDescriptor,
  setSortDescriptor,
  topContent,
  headerColumns,
  sortedItems,
  CellComponent
}: CustomTableProps<T>) => {
  return (
    <Table
      aria-label="table"
      selectionMode="single"
      className="pb-1 w-full"
      classNames={{
        th: ["bg-transparent", "text-green-400", "border-b", "border-divider"],
        wrapper: ["border-solid", "border-1", "border-default-200/50", "bg-default-100/40"],
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => {
          return (
            <TableColumn
              key={column.id}
              align={"start"}
              allowsSorting={
                column.id === "actions" ? false : true
              }
            >
              {column.name}
            </TableColumn>
          );
        }}
      </TableHeader>
      <TableBody emptyContent={"No coins found"} items={sortedItems}>
        {(item: T) => (
          <TableRow key={(item as any).id} className="hober:bg-green-100">
            {(columnKey) => {
              return (
                <TableCell align={"left"}>
                  <CellComponent
                    item={item}
                    columnKey={columnKey}
                  />
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
