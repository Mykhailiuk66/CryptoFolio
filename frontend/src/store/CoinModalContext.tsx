import { createContext } from "react";
import { useCallback, useState } from "react";
import {
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
	const [coinInfo, setCoinInfo] = useState<CoinInfoModalParams>({
		exchangeSlug: "",
		coinSlug: "",
	});

	const openCoinInfoModal = useCallback(
		(exchangeSlug: string, coinSlug: string) => {
			setCoinInfo({ exchangeSlug, coinSlug });
			onOpen();
		},
		[onOpen]
	);

	const contextData: CoinModalContextType = {
		isOpen,
		coinInfo,
		onClose,
		openCoinInfoModal,
	};

	return (
		<CoinModalContext.Provider value={contextData}>
			{children}
		</CoinModalContext.Provider>
	);
};
