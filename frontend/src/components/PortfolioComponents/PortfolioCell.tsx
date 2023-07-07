import {
  Button,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@nextui-org/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { formatCurrency, formatProfitLoss } from "../../utils";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ExtendedPortfolioHolding } from "../../types";
import { Key, useContext } from "react";
import DataContext from "../../store/DataContext";
import CoinModalContext from "../../store/CoinModalContext";
import PortfolioContext from "../../store/ProtfolioContext";
import CustomDropdown from "../CustomNextUIComponents/CustomDropdown";


type PortfolioCellProps = {
  item: ExtendedPortfolioHolding;
  columnKey: Key,
}


const PortfolioCell = ({ item, columnKey }: PortfolioCellProps) => {
  const { coins, exchanges } = useContext(DataContext)
  const { openCoinInfoModal } = useContext(CoinModalContext)
  const { removePortfolioHolding, setModalState, onOpen, setSelectedPortfolioHolding } = useContext(PortfolioContext)

  const cellValue = item[columnKey as keyof ExtendedPortfolioHolding];

  const coin = coins.find((c) => c.short_name === item.coin_short_name)
  const exchange = exchanges.find((e) => e.name === item.exchange_name)


  const handleRemove = () => {
    removePortfolioHolding(item.id)
  }

  switch (columnKey) {
    case "coin_short_name":
      return (
        <p className="font-bold cursor-pointer" onClick={() => openCoinInfoModal(exchange!.slug, coin!.slug)}>
          {cellValue}
        </p>
      );
    case "exchange_name":
      return (
        <Chip className="capitalize" color="success" size="sm" variant="flat">
          {cellValue}
        </Chip>
      );
    case "quantity":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{formatCurrency(cellValue as number)}</p>
        </div>
      );
    case "price_change_perc":
      return (
        <Chip className="capitalize" color={cellValue as number >= 0 ? "success" : "danger"} size="sm" variant="flat">
          <p className="flex items-center">
            {cellValue as number >= 0 ? <IoMdArrowDropup /> : <IoMdArrowDropdown />} {cellValue}%
          </p>
        </Chip>
      );
    case "price":
      let priceDiff = 0;
      let percentageProfit = 0;
      if (item.sale_price) {
        priceDiff = item.sale_price! - item.purchase_price
      } else if (item.price) {
        priceDiff = item.price! - item.purchase_price
      }

      if (item.purchase_price !== 0) {
        percentageProfit = (priceDiff / item.purchase_price) * 100;
      }


      return (
        <div className="flex flex-col">
          <div className="text-bold text-small capitalize">
            {priceDiff === 0 && "-"}
            {priceDiff !== 0 && (
              <Chip className="capitalize bg-primary-background" color={priceDiff >= 0 ? "success" : "danger"} variant="faded">
                <p className="flex items-center">
                  {formatProfitLoss((priceDiff * item.quantity))}
                </p>
              </Chip>
            )}

            <div className="flex items-center">
              {priceDiff !== 0 &&
                <Chip className="capitalize" color={priceDiff >= 0 ? "success" : "danger"} size="sm" variant="light">
                  <p className="flex items-center">
                    {priceDiff >= 0 ? '+' : ''}
                    {percentageProfit.toFixed(2)}%
                  </p>
                </Chip>
              }
            </div>

          </div>
        </div >
      )
    case "purchase_price":
    case "sale_price":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">
            {cellValue && (<>${formatCurrency(cellValue as number)}</>)}
            {!cellValue && (<>-</>)}
          </p>

        </div>
      );
    case "purchase_date":
    case "sale_date":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">
            {cellValue && (<>{cellValue}</>)}
            {!cellValue && (<>-</>)}
          </p>

        </div>
      );
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <CustomDropdown>
            <DropdownTrigger aria-label="dropdown-trigger">
              <Button isIconOnly size="sm" variant="light">
                <BsThreeDotsVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
              <DropdownItem key="edit" onClick={() => {
                setSelectedPortfolioHolding(item.id)
                setModalState("EDIT_COIN")
                onOpen()
              }}>
                Edit
              </DropdownItem>
              <DropdownItem key="remove" className="text-danger" color="danger" onClick={handleRemove}>
                Remove
              </DropdownItem>
            </DropdownMenu>
          </CustomDropdown>
        </div>
      );
    default:
      return <p>{cellValue}</p>;
  }
};




export default PortfolioCell