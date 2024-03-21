import { Divider, SortDescriptor, useDisclosure } from "@nextui-org/react";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import "react-multi-date-picker/styles/colors/green.css"
import Container from "../components/Container/Container";
import { Column, ExtendedPortfolioHolding, PortfolioType } from "../types";
import { useCallback, useContext, useMemo, useState } from "react";
import PortfolioContext from "../store/ProtfolioContext";
import CustomTable from "../components/TableComponents/CustomTable";
import PortfolioCell from "../components/PortfolioTableComponents/PortfolioCell";
import PortfolioTopContent from "../components/PortfolioTableComponents/PortfolioTopContent";
import PortfolioFormModal from "../components/PortfolioTableComponents/PortfolioFormModal";
import PortfolioCharts from "../components/PortfolioCharts/PortfolioCharts";
import PortfolioSidebar from "../components/PortfolioSidebar/PortfolioSidebar";


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
    addPortfolio,
  } = useContext(PortfolioContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
  }, [filterValue, portfolio?.holdings]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof ExtendedPortfolioHolding] as number;
      const second = b[sortDescriptor.column as keyof ExtendedPortfolioHolding] as number;
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
      <>
        <PortfolioFormModal
          title={"Add Portfolio"}
          portfolio={{} as PortfolioType}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          handleSave={addPortfolio}
        />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-2 lg:col-span-3">
            <PortfolioSidebar onOpen={onOpen} />
          </div>

          <div className="col-span-12 xl:col-span-10 lg:col-span-9">
            <PortfolioCharts />
            <Divider className="my-4" />
            <div>
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
        </div>
      </>
    </Container>
  );
}


export default Portfolios