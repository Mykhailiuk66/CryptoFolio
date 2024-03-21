import { SortDescriptor } from "@nextui-org/react";
import Container from "../components/Container/Container";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CoinData } from "../types";
import WatchlistTopContent from "../components/WatchlistTableComponents/WatchlistTopContent";
import CustomTable from "../components/TableComponents/CustomTable";
import WatchlistContext from "../store/WatchlistContext";
import WatchlistCell from "../components/WatchlistTableComponents/WatchlistCell";
import { Column } from "../types";

const columns: Column[] = [
	{ name: "Id", id: "id", visible: false },
	{ name: "Coin", id: "coin_short_name" },
	{ name: "Exchange", id: "exchange_name" },
	{ name: "Date", id: "date", visible: false },
	{ name: "Price", id: "price" },
	{ name: "Volume", id: "volume" },
	{ name: "Previous Price (24h)", id: "prev_price_24h" },
	{ name: "High Price", id: "high_price" },
	{ name: "Low Price", id: "low_price" },
	{ name: "Turnover", id: "turnover" },
	{ name: "Price Change", id: "price_change_perc" },
	{ name: "Actions", id: "actions" },
];


const Watchlist = () => {
  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });
  const {
    watchlists,
    selectedWatchlist,
    watchlistCoinsData,
    visibleColumns,
    fetchWatchlistCoinsData,
  } = useContext(WatchlistContext);

  useEffect(() => {
    if (watchlists.length > 0 && selectedWatchlist) {
      fetchWatchlistCoinsData();
    }
  }, [watchlists.length, selectedWatchlist, fetchWatchlistCoinsData]);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all")
      return columns.filter((column) => column?.visible !== false);

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.id.toString())
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredData = [...watchlistCoinsData];

    if (filterValue) {
      filteredData = filteredData.filter((item) =>
        item.coin_short_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredData;
  }, [filterValue, watchlistCoinsData]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof CoinData] as number;
      const second = b[sortDescriptor.column as keyof CoinData] as number;
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
      <WatchlistTopContent
        onClear={onClear}
        onSearchChange={onSearchChange}
        filterValue={filterValue}
        columns={columns}
      />
    );
  }, [filterValue, onSearchChange, onClear]);


  return (
    <Container>
      <CustomTable
        sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
        topContent={topContent}
        headerColumns={headerColumns}
        sortedItems={sortedItems}
        CellComponent={WatchlistCell}
      />
    </Container>
  );
};

export default Watchlist;
