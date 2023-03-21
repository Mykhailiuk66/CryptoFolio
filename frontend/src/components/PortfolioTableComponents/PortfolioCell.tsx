import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@nextui-org/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { formatCurrency, formatProfitLoss } from "../../utils";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CoinData, ExtendedPortfolioHolding } from "../../types";
import { Key, useContext } from "react";
import DataContext from "../../store/DataContext";
import PortfolioContext from "../../store/ProtfolioContext";


type PortfolioCellProps = {
  item: ExtendedPortfolioHolding;
  columnKey: Key,
}


const PortfolioCell = ({ item, columnKey }: PortfolioCellProps) => {
  const {
    selectedPortfolio,
    portfolios,
    setPortfolios
  } = useContext(PortfolioContext)
  const { coins, exchanges } = useContext(DataContext)
  const cellValue = item[columnKey as keyof ExtendedPortfolioHolding];

  const handleRemove = () => {

  }

  switch (columnKey) {
    case "coin_short_name":
      return (
        <p className="font-bold">
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
              <Chip className="capitalize" color={priceDiff >= 0 ? "success" : "danger"} variant="faded">
                <p className="flex items-center">
                  {formatProfitLoss((priceDiff*item.quantity))}
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
          <Dropdown>
            <DropdownTrigger aria-label="dropdown-trigger">
              <Button isIconOnly size="sm" variant="light">
                <BsThreeDotsVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
              <DropdownItem key="remove" className="text-danger" color="danger" onClick={handleRemove}>
                Remove
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    default:
      return <p>{cellValue}</p>;
  }
};




export default PortfolioCell