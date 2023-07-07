import { Divider, SortDescriptor } from "@nextui-org/react";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import "react-multi-date-picker/styles/colors/green.css"
import Container from "../components/Container/Container";
import { Column, ExtendedPortfolioHolding, PortfolioType } from "../types";
import { useCallback, useContext, useMemo, useState } from "react";
import PortfolioContext from "../store/ProtfolioContext";
import CustomTable from "../components/TableComponents/CustomTable";
import PortfolioCell from "../components/PortfolioComponents/PortfolioCell";
import PortfolioTopContent from "../components/PortfolioComponents/PortfolioTopContent";
import PortfolioFormModalContent from "../components/PortfolioComponents/PortfolioFormModalContent";
import PortfolioCharts from "../components/PortfolioComponents/PortfolioCharts";
import PortfolioSidebar from "../components/PortfolioComponents/PortfolioSidebar";
import CustomModal from "../components/CustomNextUIComponents/CustomModal";
import PortfolioHoldingFormModalContent from "../components/PortfolioComponents/PortfolioHoldingFormModalContent";


const columns: Column[] = [
  { name: "Id", id: "id", visible: false },
  { name: "Portfolio", id: "portfolio", visible: false },
  { name: "Coin", id: "coin_short_name" },
  { name: "Exchange", id: "exchange_name" },
  { name: "Quantity", id: "quantity" },
  { name: "Purchase Price", id: "purchase_price" },
  { name: "Purchase Date", id: "purchase_date" },
  { name: "Sale Price", id: "sale_price" },
  { name: "Sale Date", id: "sale_date" },
  { name: "Profit/Loss", id: "price" },
  { name: "Actions", id: "actions" },
];

const Portfolios = () => {
  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });
  const {
    portfolios,
    selectedPortfolio,
    visibleColumns,
    selectedPortfolioHolding,
    addPortfolio,
    modalState,
    isOpen,
    onOpenChange,
    editPortfolio,
  } = useContext(PortfolioContext);

  const portfolio = portfolios.find((p) => p.id === selectedPortfolio)

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all")
      return columns.filter((column) => column?.visible !== false);

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.id.toString())
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredData = portfolio ? [...(portfolio?.holdings!)] : [];

    if (filterValue) {
      filteredData = filteredData.filter((item) =>
        item.coin_short_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredData;
  }, [filterValue, portfolio]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      let first: number = a[sortDescriptor.column as keyof ExtendedPortfolioHolding] as number;
      let second: number = b[sortDescriptor.column as keyof ExtendedPortfolioHolding] as number;
      if (sortDescriptor.column === 'price') {
        first = a['price']! - a['purchase_price'];
        second = b['price']! - b['purchase_price'];
      }
      
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const topContent = useMemo(() => {
    return (
      <PortfolioTopContent
        onClear={onClear}
        onSearchChange={onSearchChange}
        filterValue={filterValue}
        columns={columns}
      />
    );
  }, [filterValue, onSearchChange, onClear]);


  return (
    <Container>
      <CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
        {(onClose) => (
          <>
            {modalState === "ADD_PORTFOLIO" &&
              (<PortfolioFormModalContent
                title="Add Portfolio"
                portfolio={{} as PortfolioType}
                handleSave={addPortfolio}
                onClose={onClose}
              />)}
            {modalState === "EDIT_PORTFOLIO" && (
              <PortfolioFormModalContent
                title="Edit Portfolio"
                portfolio={portfolio}
                handleSave={editPortfolio}
                onClose={onClose}
              />
            )}
            {modalState === "ADD_COIN" && (
              <PortfolioHoldingFormModalContent
                title="Add new asset"
                onClose={onClose}
              />
            )}
            {modalState === "EDIT_COIN" && (
              <PortfolioHoldingFormModalContent
                title="Edit asset"
                holdingId={selectedPortfolioHolding}
                value={portfolio?.holdings?.find((h) => h.id === selectedPortfolioHolding)}
                onClose={onClose}
              />
            )}
          </>
        )}
      </CustomModal>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-2 lg:col-span-3">
          <PortfolioSidebar />
        </div>
        <div className="col-span-12 xl:col-span-10 lg:col-span-9">
          <PortfolioCharts />
          <Divider className="my-4" />
          <CustomTable
            sortDescriptor={sortDescriptor}
            setSortDescriptor={setSortDescriptor}
            topContent={topContent}
            headerColumns={headerColumns}
            sortedItems={sortedItems}
            CellComponent={PortfolioCell}
          />
        </div>
      </div>
    </Container>
  );
}


export default Portfolios