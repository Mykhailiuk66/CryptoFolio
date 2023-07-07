import {
  Modal, ModalContent
} from "@nextui-org/react";


type CustomModalProps = {
  children: (onClose: () => void) => React.ReactNode;
  isOpen: boolean;
  onOpenChange: () => void;
}

const CustomModal = ({ children, isOpen, onOpenChange }: CustomModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      className="bg-primary-background"
    >
      <ModalContent>
        {(onClose) => children(onClose)}
      </ModalContent>
    </Modal>
  )
}


export default CustomModal