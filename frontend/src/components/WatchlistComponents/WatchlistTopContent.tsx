import { useContext, useEffect, useState } from "react";
import {
  Input, Button, Select, SelectItem,
  DropdownTrigger, DropdownItem, DropdownMenu, useDisclosure
} from "@nextui-org/react";
import { MdOutlineEdit, MdDeleteOutline, MdAddCircleOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

import ColumnsDropdown from "../TableComponents/ColumnsDropdown";
import WatchlistContext from "../../store/WatchlistContext";
import { Column, WatchlistModalState } from "../../types";
import CustomModal from "../CustomNextUIComponents/CustomModal";
import WatchlistFormModalContent from "./WatchlistFormModalContent";
import WatchlistCoinFormModalContent from "./WatchlistCoinFormModalContent";
import CustomDropdown from "../CustomNextUIComponents/CustomDropdown";


type WatchlistTopContentType = {
  onSearchChange: (value?: string) => void;
  filterValue: string;
  columns: Column[],
};

const WatchlistTopContent = ({
  onSearchChange,
  filterValue,
  columns
}: WatchlistTopContentType) => {
  const [modalState, setModalState] = useState<WatchlistModalState>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    watchlists,
    fetchWatchlists,
    setSelectedWatchlist,
    selectedWatchlist,
    visibleColumns,
    addWatchlistCoin,
    setVisibleColumns,
    addWatchlist,
    editWatchlist,
    deleteWatchlist,
  } = useContext(WatchlistContext);

  useEffect(() => {
    if (watchlists.length === 0) {
      fetchWatchlists();
    }
  }, [watchlists.length, fetchWatchlists]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWatchlist(e.target.value);
  };

  const watchlist = watchlists.find((w) => w.id === selectedWatchlist)

  return (
    <>
      <CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
        {(onClose) => (
          <>
            {modalState === "ADD_COIN" && (
              <WatchlistCoinFormModalContent
                title="Add Coin"
                handleSave={addWatchlistCoin}
                onClose={onClose}
              />
            )}

            {modalState !== "ADD_COIN" && (
              <WatchlistFormModalContent
                title={modalState === "ADD_WATCHLIST" ? "Add Watchlist" : "Edit Watchlist"}
                value={modalState === "EDIT_WATCHLIST" ? watchlist?.name : ""}
                handleSave={modalState === "ADD_WATCHLIST" ? addWatchlist : editWatchlist}
                onClose={onClose}
              />
            )}
          </>
        )}
      </CustomModal>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between flex-wrap md:flex-nowrap gap-3 items-end">
          <div className="flex w-full md:max-w-xs justify-between items-center gap-2">
            <Select
              disallowEmptySelection
              items={watchlists}
              aria-label="select-watchlist"
              variant="bordered"
              className="max-w-xs"
              classNames={{
                popoverContent: ["border-solid", "border-1", "border-default-200/50", "bg-primary-background"],
              }}
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
                setModalState("ADD_WATCHLIST")
                onOpen()
              }}
            >
              <MdAddCircleOutline size={25} />
            </Button>
          </div>
          <Input
            isClearable
            classNames={{
              base: "max-w-full md:max-w-[17rem] h-10 hidden md:block",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500",
            }}
            className="w-full md:max-w-[25%]"
            variant="bordered"
            placeholder="Search by name..."
            value={filterValue}
            onClear={onSearchChange}
            onValueChange={onSearchChange}
          />
          <div className="flex w-full md:max-w-fit md:justify-end gap-3">
            {selectedWatchlist && (<Button
              color="primary"
              variant="bordered"
              endContent={<FaPlus />}
              onPress={() => {
                setModalState("ADD_COIN")
                onOpen()
              }}
            >
              Add coin
            </Button>
            )}
            <ColumnsDropdown
              columns={columns}
              visibleColumns={visibleColumns}
              setVisibleColumns={setVisibleColumns}
            />

            {selectedWatchlist && (
              <CustomDropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="bordered"
                    className="ml-auto"
                  >
                    <BsThreeDotsVertical />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu variant="bordered" aria-label="dropdown">
                  <DropdownItem
                    key="edit"
                    showDivider
                    onPress={() => {
                      setModalState("EDIT_WATCHLIST")
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
              </CustomDropdown>
            )}
          </div>
        </div>
      </div >
    </>
  );
};

export default WatchlistTopContent;
