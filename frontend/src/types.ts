import { FormEvent, Key } from "react";
import { Selection } from "@nextui-org/react";

export type AuthTokensType = {
	refresh: string;
	access: string;
};

export type UserType = {
	email: string;
	exp: number;
	iat: number;
	jti: string;
	token_type: string;
	user_id: string | number;
	username: string;
};

export type AuthContextType = {
	user?: UserType | null;
	authTokens?: AuthTokensType | null;
	loginUser: (e: FormEvent<HTMLFormElement>) => Promise<void>;
	logoutUser: () => void;
	registerUser: (e: FormEvent<HTMLFormElement>) => Promise<void>;
	registerErrors: Record<string, string[]>;
};

export type CoinData = {
	id: string | number;
	coin_short_name: string;
	exchange_name: string;
	date: string;
	price: number;
	volume: number;
	prev_price_24h: number;
	high_price: number;
	low_price: number;
	turnover: number;
	price_change: number;
	price_change_perc: number;
};

export type Column = {
	name: string;
	id: string;
	visible?: boolean;
};

export type DataContextType = {
	coins: Coin[];
	exchanges: Exchange[];
};

export type Coin = {
	id: number;
	short_name: string;
	name: string | null;
	slug: string;
	icon: string;
};

export type Exchange = {
	id: number;
	name: string;
	slug: string;
	logo: string | null;
};

export type WatchlistCoin = {
	id: string;
	coin_slug: string;
	exchange_slug: string;
};

export type Watchlist = {
	id: string;
	name: string;
	coins: WatchlistCoin[];
};

export type ModalState = "ADD_WATCHLIST" | "EDIT_WATCHLIST" | "ADD_COIN" | null;

export type WatchlistContextType = {
	watchlists: Watchlist[];
	selectedWatchlist?: string;
	watchlistCoinsData: CoinData[];
	visibleColumns: Selection;
  addWatchlistCoin: (coinId: Key, exchangeId: Key) => Promise<void>
	setWatchlists: React.Dispatch<React.SetStateAction<Watchlist[]>>;
	setSelectedWatchlist: React.Dispatch<
		React.SetStateAction<string | undefined>
	>;
	setwatchlistCoinsData: React.Dispatch<React.SetStateAction<CoinData[]>>;
	setVisibleColumns: React.Dispatch<React.SetStateAction<Selection>>;
	fetchWatchlists: () => Promise<void>;
	fetchWatchlistCoinsData: () => Promise<void>;
	removeWatchlistCoin: (watchlistcoinId: string) => Promise<void>;
	addWatchlist: (name: string) => Promise<void>;
	editWatchlist: (name: string) => Promise<void>;
	deleteWatchlist: () => Promise<void>;
};

export type PortfolioContextType = {
	portfolios: PortfolioType[];
	selectedPortfolio?: string;
	visibleColumns: Selection;
	portfolioSnapshots: PortfolioSnapshot[];
	setPortfolioSnapshots: React.Dispatch<
		React.SetStateAction<PortfolioSnapshot[]>
	>;
	setPortfolios: React.Dispatch<React.SetStateAction<PortfolioType[]>>;
	fetchPortfolios: () => Promise<void>;
	setSelectedPortfolio: React.Dispatch<
		React.SetStateAction<string | undefined>
	>;
	setVisibleColumns: React.Dispatch<React.SetStateAction<Selection>>;
	addPortfolio: (newPortfolio: PortfolioFormType) => Promise<void>;
	editPortfolio: (updatedPortfolio: PortfolioFormType) => Promise<void>;
	deletePortfolio: () => Promise<void>;
	fetchPortfolioSnapshots: () => Promise<void>;
};

export type ExtendedPortfolioHolding = {
	id: string;
	portfolio: string;
	coin_short_name: string;
	exchange_name: string;
	quantity: number;
	purchase_price: number;
	purchase_date: string;
	sale_price: number | null;
	sale_date: string | null;
	price: number | null;
	value: number;
};

export type PortfolioType = {
	id: string;
	name: string;
	notes: string | null;
	holdings?: ExtendedPortfolioHolding[];
};

export type PortfolioFormType = {
	name: string;
	notes: string | null;
};

export type PortfolioSnapshot = {
	id: number;
	created: string;
	value: number;
};

export type CoinInfoModalParams = {
	exchangeSlug: string;
	coinSlug: string;
};

export type CoinModalContextType = {
	isOpen: boolean;
	coinInfo: CoinInfoModalParams;
	onClose: () => void;
	openCoinInfoModal: (exchangeSlug: string, coinSlug: string) => void;
};

export type CustomCoinExchangeType = {
	exchage_name: string;
	exchage_slug: string;
	exchage_id: number;
	key: string;
	id: number;
	short_name: string;
	name: string | null;
	slug: string;
	icon: string;
};
