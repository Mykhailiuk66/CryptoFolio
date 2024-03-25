import { Button, Input, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";


type WatchlistFormModalContentType = {
  title: string;
  value?: string;
  handleSave: (name: string) => void;
  onClose: () => void,
}

const WatchlistFormModalContent = ({ title, value, handleSave, onClose }: WatchlistFormModalContentType) => {
  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    setNewValue(value)
  }, [value])


  const handleSubmit = () => {
    handleSave(newValue!)
    onClose()
  }

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
      <ModalBody>
        <Input
          autoFocus
          isRequired
          label="Watchlist Name"
          variant="bordered"
          value={newValue}
          onValueChange={setNewValue}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          isDisabled={!newValue && newValue!.length === 0}
          color="primary"
          onPress={handleSubmit}
        >
          Save Changes
        </Button>
      </ModalFooter>
    </>
  )
}


export default WatchlistFormModalContent