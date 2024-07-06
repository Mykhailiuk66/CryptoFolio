import { Autocomplete, AutocompleteItem, Button, Divider, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useContext, useState } from "react";
import { Key } from '@react-types/shared';

import DataContext from "../../store/DataContext";


type WatchlistCoinFormModalContentType = {
  title: string;
  handleSave: (coinId: Key, exchangeId: Key) => void;
  onClose: () => void,
}

const WatchlistCoinFormModalContent = ({ title, handleSave, onClose }: WatchlistCoinFormModalContentType) => {
  const { coins, exchanges } = useContext(DataContext)
  const [selectedCoinId, setSelectedCoinId] = useState<Key | null | undefined>(null);
  const [selectedExchangeId, setSelectedExchangeId] = useState<Key | null | undefined>(null);

  const handleSubmit = () => {
    handleSave(selectedCoinId!, selectedExchangeId!)
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
            selectedKey={selectedCoinId}
            onSelectionChange={setSelectedCoinId}
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
            defaultItems={exchanges}
            selectedKey={selectedExchangeId}
            onSelectionChange={setSelectedExchangeId}
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
          isDisabled={selectedCoinId === null && selectedExchangeId === null}
          className="bg-primary-600" 
          onPress={handleSubmit}>
          Submit
        </Button>
      </ModalFooter >
    </>
  )
}


export default WatchlistCoinFormModalContent