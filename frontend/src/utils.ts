let currencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

let fractionCurrencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 30,
});

export function formatFieldName(inputString: string): string {
	const words: string[] = inputString.split("_");

	const formattedWords: string[] = words.map((word: string) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	});

	const formattedString: string = formattedWords.join(" ");

	return formattedString;
}

export function formatCurrency(value: number) {
	if (!value && value !== 0) return "";
	if (Math.abs(value) < 1)
		return fractionCurrencyFormatter.format(value).replace("$", "");
	return currencyFormatter.format(value).replace("$", "");
}

export function formatProfitLoss(value: number) {
	if (!value && value !== 0) return "";
	if (Math.abs(value) < 1) return fractionCurrencyFormatter.format(value);
	return currencyFormatter.format(value);
}
