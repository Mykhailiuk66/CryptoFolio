import { Autocomplete, AutocompleteItem, Button, Divider, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Key, useContext, useState } from "react";
import DataContext from "../../store/DataContext";


type WatchlistCoinFormModalContentType = {
  title: string;
  handleSave: (coinId: Key, exchangeId: Key) => void;
  onClose: () => void,
}

const WatchlistCoinFormModalContent = ({ title, handleSave, onClose }: WatchlistCoinFormModalContentType) => {
  const { coins, exchanges } = useContext(DataContext)
  const [selectedCoinName, setSelectedCoinName] = useState<Key | null>(null);
  const [selectedExchangeName, setSelectedExchangeName] = useState<Key | null>(null);

  const handleSubmit = () => {
    handleSave(selectedCoinName!, selectedExchangeName!)
    onClose()
  }

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
      <ModalBody>
        <div>
          <Autocomplete
            label="Coin"
            className="mb-3"
            defaultItems={coins}
            onSelectionChange={setSelectedCoinName}
            required
          >
            {(c) => (
              <AutocompleteItem key={c.id} textValue={c.short_name}>
                {c.short_name}
              </AutocompleteItem>)}
          </Autocomplete>
          <Divider />
          <Autocomplete
            label="Exchange"
            className="mt-3"
            items={exchanges}
            onSelectionChange={setSelectedExchangeName}
            required
          >
            {(e) => (
              <AutocompleteItem key={e.id} textValue={e.name}>
                {e.name}
              </AutocompleteItem>)}
          </Autocomplete>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          isDisabled={selectedCoinName === null && selectedExchangeName === null}
          color="primary"
          onPress={handleSubmit}>
          Submit
        </Button>
      </ModalFooter >
    </>
  )
}


export default WatchlistCoinFormModalContent