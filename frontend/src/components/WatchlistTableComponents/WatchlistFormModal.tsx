import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";


type WatchlsitFormModalProps = {
  title: string;
  value?: string;
  isOpen: boolean;
  onOpenChange: () => void;
  handleSave: (name: string) => void;
}

const WatchlsitFormModal = ({ title, value, isOpen, onOpenChange, handleSave }: WatchlsitFormModalProps) => {
  const [newValue, setNewValue] = useState(value);

  useEffect(()=>{
    setNewValue(value)
  }, [value, isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
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
              <Button color="primary" onPress={() => {
                handleSave(newValue!)
                onClose()
              }}>
                Save Changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}


export default WatchlsitFormModal