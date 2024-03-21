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
import { PortfolioFormType, PortfolioType } from "../../types";


type PortfolioFormModalProps = {
  title: string;
  portfolio?: PortfolioType;
  isOpen: boolean;
  onOpenChange: () => void;
  handleSave: (submittedPortfolio: PortfolioFormType) => void;
}

const PortfolioFormModal = ({ title, portfolio, isOpen, onOpenChange, handleSave }: PortfolioFormModalProps) => {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (portfolio) {
      setName(portfolio?.name)
      setNotes(portfolio?.notes!)
    }
  }, [portfolio, isOpen])


  const onSave = () => {
    const newPortfolio: PortfolioFormType = {
      name: name,
      notes: notes,
    };
    handleSave(newPortfolio);
    setName("");
    setNotes("");
  }

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
                label="Portfolio Name"
                variant="bordered"
                name="name"
                value={name}
                onValueChange={setName}
              />
              <Input
                label="Notes"
                placeholder="Add notes..."
                name="notes"
                value={notes}
                onValueChange={setNotes}
                className="mt-2"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={() => {
                onSave()
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


export default PortfolioFormModal