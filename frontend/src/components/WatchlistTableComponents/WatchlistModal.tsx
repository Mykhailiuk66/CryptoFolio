import {
  Modal, ModalContent
} from "@nextui-org/react";


type WatchlistFormModalProps = {
  children: (onClose: () => void) => React.ReactNode;
  isOpen: boolean;
  onOpenChange: () => void;
}

const WatchlistModal = ({ children, isOpen, onOpenChange }: WatchlistFormModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => children(onClose)}
      </ModalContent>
    </Modal>
  )
}


export default WatchlistModal