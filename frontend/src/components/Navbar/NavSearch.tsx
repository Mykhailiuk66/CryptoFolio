import { useContext, useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Autocomplete, AutocompleteItem, Chip } from "@nextui-org/react";
import { CustomCoinExchangeType } from "../../types";
import { DataContext } from "../../store/DataContext";
import { CoinModalContext } from "../../store/CoinModalContext";

const NavSearch = () => {
	const { coins, exchanges } = useContext(DataContext);
	const [coinExchange, setCoinExchange] = useState<CustomCoinExchangeType[]>(
		[]
	);
	const [searchText, setSearchText] = useState<string>("");
	const { openCoinInfoModal } = useContext(CoinModalContext);

	useEffect(() => {
		setCoinExchange(
			coins.flatMap((c) => {
				return exchanges.map((e) => {
					return {
						...c,
						key: c.slug + e.slug,
						exchage_name: e.name,
						exchage_slug: e.slug,
						exchage_id: e.id,
					};
				});
			})
		);
	}, [coins, exchanges, searchText]);

	const coinSearchFilter = (textValue: string, inputValue: string) => {
		if (inputValue.length < 1) return false;

		textValue = textValue.toLowerCase();
		inputValue = inputValue.toLowerCase();

		return textValue.includes(inputValue);
	};

	const autocompleteItems = useMemo(() => {
		return coinExchange.map((ce) => (
			<AutocompleteItem
				key={ce.key}
				textValue={ce.short_name}
				onPress={() => {
					openCoinInfoModal(ce.exchage_slug, ce.short_name);
					setSearchText("");
				}}
			>
				<div className="flex w-full justify-between items-end">
					<span className="font-bold">{ce.short_name}</span>
					<Chip
						className="capitalize"
						color="success"
						size="sm"
						variant="flat"
					>
						{ce.exchage_name}
					</Chip>
				</div>
			</AutocompleteItem>
		));
	}, [coinExchange, openCoinInfoModal]);

	return (
		<>
			<Autocomplete
				aria-label="coin-search"
				variant="bordered"
				menuTrigger="input"
				placeholder="Type to search..."
				allowsCustomValue
				defaultItems={coinExchange}
				classNames={{
					base: "max-w-full sm:max-w-[20rem] h-10 hidden md:block",
					selectorButton: ["hidden"],
					clearButton: ["hidden"],
					popoverContent: [
						"border-solid",
						"border-1",
						"border-default-200/50",
						"bg-primary-background",
					],
				}}
				startContent={<FaSearch color="success" size={20} />}
				inputValue={searchText}
				defaultFilter={coinSearchFilter}
				onInputChange={setSearchText}
			>
				{autocompleteItems}
			</Autocomplete>
		</>
	);
};

export default NavSearch;
