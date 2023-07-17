import { Button, Divider, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import { Key } from '@react-types/shared';
import CoinAutocomplete from "../Autocomplete/CoinAutocomplete";
import ExchangeAutocomplete from "../Autocomplete/ExchangeAutocomplete";


type WatchlistCoinFormModalContentType = {
  title: string;
  handleSave: (coinId: Key, exchangeId: Key) => void;
  onClose: () => void,
}

const WatchlistCoinFormModalContent = ({ title, handleSave, onClose }: WatchlistCoinFormModalContentType) => {
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
          <CoinAutocomplete
            label="Coin"
            className="mb-3"
            selectedKey={selectedCoinId}
            onSelectionChange={setSelectedCoinId}
          />
          <Divider />
          <ExchangeAutocomplete
            label="Exchange"
            className="mt-3"
            selectedKey={selectedExchangeId}
            onSelectionChange={setSelectedExchangeId}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          isDisabled={selectedCoinId === null || selectedExchangeId === null}
          className="bg-primary-600 text-background"
          onPress={handleSubmit}>
          Save
        </Button>
      </ModalFooter >
    </>
  )
}


export default WatchlistCoinFormModalContent