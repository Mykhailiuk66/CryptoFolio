


let currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatFieldName(inputString: string): string {
  const words: string[] = inputString.split('_');

  const formattedWords: string[] = words.map((word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const formattedString: string = formattedWords.join(' ');

  return formattedString;
}



export function formatCurrency(value: number){
  if (value < 1) return value.toString()
  return currencyFormatter.format(value).replace("$", "")
}


export function formatProfitLoss(value: number){
  return currencyFormatter.format(value)
}