import { useContext } from "react";
import {
  Input, Button, Dropdown, DropdownTrigger,
  DropdownItem, DropdownMenu
} from "@nextui-org/react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import ColumnsDropdown from "../TableComponents/ColumnsDropdown";
import { Column } from "../../types";
import { BsThreeDotsVertical } from "react-icons/bs";
import PortfolioContext from "../../store/ProtfolioContext";
import { FaPlus } from "react-icons/fa6";


type PortfolioTopContentType = {
  onClear: () => void;
  onSearchChange: (value?: string) => void;
  filterValue: string;
  columns: Column[],
};

const PortfolioTopContent = ({
  onClear,
  onSearchChange,
  filterValue,
  columns
}: PortfolioTopContentType) => {
  const {
    visibleColumns,
    selectedPortfolio,
    setVisibleColumns,
    deletePortfolio,
    onOpen,
    setModalState,
  } = useContext(PortfolioContext);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "max-w-full sm:max-w-[17rem] h-10 hidden md:block",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            className="w-full sm:max-w-[25%]"
            placeholder="Search by name..."
            value={filterValue}
            onClear={onSearchChange}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {selectedPortfolio && (<Button
              color="primary"
              variant="bordered"
              endContent={<FaPlus />}
              onPress={() => {
                setModalState("ADD_COIN")
                onOpen()
              }}
            >
              Add asset
            </Button>
            )}

            <ColumnsDropdown
              columns={columns}
              visibleColumns={visibleColumns}
              setVisibleColumns={setVisibleColumns}
            />
            {selectedPortfolio && (
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="bordered"
                  >
                    <BsThreeDotsVertical />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                  <DropdownItem
                    key="edit"
                    showDivider
                    onPress={() => {
                      setModalState("EDIT_PORTFOLIO")
                      onOpen()
                    }}
                    startContent={<MdOutlineEdit size={20} />}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onPress={deletePortfolio}
                    startContent={<MdDeleteOutline size={20} className={"text-danger"} />}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
        </div>
      </div >
    </>
  );
};

export default PortfolioTopContent;
