import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  SortDescriptor,
} from "@nextui-org/react";
import WatchlistCell from "../WatchlistTableComponents/WatchlistCell";
import { CoinData, Column } from "../../types";

type CustomTableProps = {
  sortDescriptor: SortDescriptor;
  setSortDescriptor: React.Dispatch<React.SetStateAction<SortDescriptor>>;
  topContent: React.ReactNode;
  headerColumns: Column[];
  sortedItems: CoinData[];
};

const CustomTable = ({
  sortDescriptor,
  setSortDescriptor,
  topContent,
  headerColumns,
  sortedItems,
}: CustomTableProps) => {
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
      <TableBody emptyContent={"No coins added yet"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              return (
                <TableCell align={"left"}>
                  <WatchlistCell
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
