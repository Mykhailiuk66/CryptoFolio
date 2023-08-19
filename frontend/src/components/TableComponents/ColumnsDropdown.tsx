import {
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
} from "@nextui-org/react";
import { SetStateAction } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { ColumnType } from "../../types";
import CustomDropdown from "../CustomNextUIComponents/CustomDropdown";

type ColumnsDropdownProps = {
  columns: ColumnType[];
  visibleColumns: Selection;
  setVisibleColumns: (selection: SetStateAction<Selection>) => void;
};

const ColumnsDropdown = ({
  columns,
  visibleColumns,
  setVisibleColumns,
}: ColumnsDropdownProps) => {
  return (
    <CustomDropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button variant="bordered" endContent={<IoChevronDownSharp />}>
          Columns
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Table Columns"
        closeOnSelect={false}
        selectedKeys={visibleColumns}
        selectionMode="multiple"
        onSelectionChange={setVisibleColumns}
      >
        {columns
          .filter((column) => column?.visible !== false)
          .map((column) => {
            return (
              <DropdownItem
                key={column.id}
                className="capitalize"
              >
                {column.name}
              </DropdownItem>
            );
          })}
      </DropdownMenu>
    </CustomDropdown>
  );
};

export default ColumnsDropdown;
