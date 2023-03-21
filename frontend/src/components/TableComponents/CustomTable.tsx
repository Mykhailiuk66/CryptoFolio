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
import { Column } from "../../types";

type CustomTableProps<T> = {
  sortDescriptor: SortDescriptor;
  setSortDescriptor: React.Dispatch<React.SetStateAction<SortDescriptor>>;
  topContent: React.ReactNode;
  headerColumns: Column[];
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
      className="pb-11 w-full"
      classNames={{
        th: ["bg-transparent", "text-green-400", "border-b", "border-divider"],
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
          <TableRow key={(item as any).id}>
            {(columnKey) => {
              return (
                <TableCell align={"left"}>
                  {/* <WatchlistCell
                    item={item}
                    columnKey={columnKey}
                  /> */}
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
