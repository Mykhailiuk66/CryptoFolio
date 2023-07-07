import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Key } from '@react-types/shared';
import DataContext from "../../store/DataContext";
import { useContext } from "react";

type CoinAutocompleteType = {
  label?: React.ReactNode,
  className?: string,
  selectedKey?: Key | null,
  onSelectionChange?: (key: Key) => any
}

const CoinAutocomplete = ({ label, className, selectedKey, onSelectionChange }: CoinAutocompleteType) => {
  const { coins } = useContext(DataContext)

  const coinSearchFilter = (textValue: string, inputValue: string) => {
    if (inputValue.length < 1) return false;

    textValue = textValue.toLowerCase();
    inputValue = inputValue.toLowerCase();

    return textValue.includes(inputValue);
  };

  return (
    <Autocomplete
      label={label}
      className={className}
      defaultItems={coins}
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      defaultFilter={coinSearchFilter}
      allowsCustomValue
      variant="bordered"
      menuTrigger="input"
      classNames={{
        selectorButton: ["hidden"],
        popoverContent: ["border-solid", "border-1", "border-default-200/50", "bg-primary-background"]
      }}
      listboxProps={{
        hideEmptyContent: true
      }}
    >
      {(c) => (
        <AutocompleteItem key={c.id} textValue={c.short_name}>
          {c.short_name}
        </AutocompleteItem>)}
    </Autocomplete>
  )
}


export default CoinAutocomplete