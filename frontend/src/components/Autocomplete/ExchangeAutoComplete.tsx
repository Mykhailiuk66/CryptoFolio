import { useContext } from "react"
import { Key } from '@react-types/shared';
import DataContext from "../../store/DataContext"
import { Autocomplete, AutocompleteItem } from "@nextui-org/react"

type ExchangeAutocompleteType = {
  label?: React.ReactNode,
  className?: string,
  selectedKey?: Key | null,
  onSelectionChange?: (key: Key) => any
}

const ExchangeAutoComplete = ({ label, className, selectedKey, onSelectionChange }: ExchangeAutocompleteType) => {
  const { exchanges } = useContext(DataContext)

  return (
    <Autocomplete
      label={label}
      className={className}
      defaultItems={exchanges}
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      variant="bordered"
      classNames={{
        popoverContent: ["border-solid", "border-1", "border-default-200/50", "bg-primary-background"]
      }}
    >
      {(e) => (
        <AutocompleteItem key={e.id} textValue={e.name}>
          {e.name}
        </AutocompleteItem>)}
    </Autocomplete>
  )
}


export default ExchangeAutoComplete
