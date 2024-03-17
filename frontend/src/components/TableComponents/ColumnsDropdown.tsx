import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
} from "@nextui-org/react";
import { SetStateAction } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { Column } from "../../types";

type ColumnsDropdownProps = {
  columns: Column[];
  visibleColumns: Selection;
  setVisibleColumns: (selection: SetStateAction<Selection>) => void;
};

const ColumnsDropdown = ({
  columns,
  visibleColumns,
  setVisibleColumns,
}: ColumnsDropdownProps) => {
  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button variant="flat" endContent={<IoChevronDownSharp />}>
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
    </Dropdown>
  );
};

export default ColumnsDropdown;
