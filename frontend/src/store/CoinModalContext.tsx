import { createContext } from "react";
import { useCallback, useState } from "react";
import {
	CoinData,
	CoinInfoModalParams,
	CoinModalContextType,
	DefaultProviderProps,
} from "../types";
import { useDisclosure } from "@nextui-org/react";

export const CoinModalContext = createContext<CoinModalContextType>(
	{} as CoinModalContextType
);

export const CoinModalProvider = ({ children }: DefaultProviderProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedCoin, setSelectedCoin] = useState<CoinInfoModalParams>({
		exchangeSlug: "",
		coinSlug: "",
	});
	const [historyPrices, setHistoryPrices] = useState<CoinData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const openCoinInfoModal = useCallback(
		(exchangeSlug: string, coinSlug: string) => {
			setSelectedCoin({ exchangeSlug, coinSlug });
			onOpen();
		},
		[onOpen]
	);

	const handleClose = () => {
		onClose();
	};

	const fetchHistoryPrices = useCallback(
		async (exchangeSlug: string, coinSlug: string) => {
			try {
				setIsLoading(true);
				const response = await fetch(
					`/api/history-prices/${exchangeSlug}/${coinSlug}/`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (!response.ok) {
					throw new Error("Failed to fetch history prices");
				}
				const data = await response.json();
				setHistoryPrices(data);
			} catch (error) {
				console.error("Error fetching history prices:", error);
			} finally {
				setIsLoading(false);
			}
		},
		[]
	);

	const contextData: CoinModalContextType = {
		isOpen,
		coinInfo: selectedCoin,
		historyPrices,
		isLoading,
		onClose: handleClose,
		openCoinInfoModal,
		setHistoryPrices,
		setIsLoading,
		fetchHistoryPrices,
	};

	return (
		<CoinModalContext.Provider value={contextData}>
			{children}
		</CoinModalContext.Provider>
	);
};
