import { useContext, useEffect, useState } from "react";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  useDisclosure
} from "@nextui-org/react";
import { MdOutlineEdit, MdDeleteOutline, MdAddCircleOutline } from "react-icons/md";

import ColumnsDropdown from "../TableComponents/ColumnsDropdown";
import WatchlistContext from "../../store/WatchlistContext";
import { Column, ModalState } from "../../types";
import { BsThreeDotsVertical } from "react-icons/bs";
import WatchlistFormModal from "./WatchlistFormModal";
import { FaPlus } from "react-icons/fa6";


type WatchlistTopContentType = {
  onClear: () => void;
  onSearchChange: (value?: string) => void;
  filterValue: string;
  columns: Column[],
};

const WatchlistTopContent = ({
  onClear,
  onSearchChange,
  filterValue,
  columns
}: WatchlistTopContentType) => {
  const [modalState, setModalState] = useState<ModalState>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    watchlists,
    setWatchlists,
    fetchWatchlists,
    setSelectedWatchlist,
    selectedWatchlist,
    visibleColumns,
    setVisibleColumns,
    addWatchlist,
    editWatchlist,
    deleteWatchlist,
  } = useContext(WatchlistContext);

  useEffect(() => {
    if (watchlists.length === 0) {
      fetchWatchlists();
    }
  }, [watchlists.length]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWatchlist(e.target.value);
  };

  const handleSave = (value: string) => {
    modalState === "Creating" ? addWatchlist(value) : editWatchlist(value)
  }

  const watchlist = watchlists.find((w) => w.id === selectedWatchlist)

  return (
    <>
      <WatchlistFormModal
        title={modalState === "Creating" ? "Add Watchlist" : "Edit Watchlist"}
        value={modalState === "Editing" ? watchlist?.name : ""}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleSave={handleSave}
      />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex w-full max-w-xs items-center gap-2">
            <Select
              disallowEmptySelection
              items={watchlists}
              aria-label="select-watchlist"
              variant="bordered"
              className="max-w-xs"
              selectedKeys={[selectedWatchlist] as Iterable<string>}
              onChange={handleSelectionChange}
            >
              {(watchlist) => (
                <SelectItem key={watchlist.id}>
                  {watchlist.name}
                </SelectItem>
              )}
            </Select>
            <Button
              isIconOnly
              variant="bordered"
              onPress={() => {
                setModalState("Creating")
                onOpen()
              }}
            >
              <MdAddCircleOutline size={25} />
            </Button>
          </div>
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
            <Button color="primary" variant="bordered" endContent={<FaPlus />}>
              Add coin
            </Button>
            <ColumnsDropdown
              columns={columns}
              visibleColumns={visibleColumns}
              setVisibleColumns={setVisibleColumns}
            />
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
                    setModalState("Editing")
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
                  onPress={deleteWatchlist}
                  startContent={<MdDeleteOutline size={20} className={"text-danger"} />}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div >
    </>
  );
};

export default WatchlistTopContent;
