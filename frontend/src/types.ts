import { FormEvent } from "react";
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
	image?: string;
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

export type WatchlistContextType = {
	watchlists: Watchlist[];
	selectedWatchlist?: string | undefined;
	watchlistCoinsData: CoinData[];
	visibleColumns: Selection;
	setWatchlists: React.Dispatch<React.SetStateAction<Watchlist[]>>;
	setSelectedWatchlist: React.Dispatch<
		React.SetStateAction<string | undefined>
	>;
	setwatchlistCoinsData: React.Dispatch<React.SetStateAction<CoinData[]>>;
	setVisibleColumns: React.Dispatch<React.SetStateAction<Selection>>;
	fetchWatchlists: () => Promise<void>;
	fetchWatchlistCoinsData: () => Promise<void>;
	removeWatchlistCoin: (watchlistcoinId: string) => Promise<void>;
	addWatchlist: (name:string) => Promise<void>;
	editWatchlist: (name:string) => Promise<void>;
	deleteWatchlist: () => Promise<void>;
};


export type ModalState = "Editing" | "Creating" | null