import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { PortfolioFormType, PortfolioType } from "../../types";


type PortfolioFormModalContentType = {
  title: string;
  portfolio?: PortfolioType;
  handleSave: (submittedPortfolio: PortfolioFormType) => void;
  onClose: () => void,
}

const PortfolioFormModalContent = ({ title, portfolio, handleSave, onClose }: PortfolioFormModalContentType) => {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (portfolio) {
      setName(portfolio?.name)
      setNotes(portfolio?.notes!)
    }
  }, [portfolio])


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
        <Textarea
          label="Notes"
          placeholder="Add notes..."
          name="notes"
          value={notes}
          onValueChange={setNotes}
          className="mt-2"
          maxLength={500}
        />
      </ModalBody>
      <ModalFooter>
        <Button className="bg-primary-600" onPress={() => {
          onSave()
          onClose()
        }}>
          Save Changes
        </Button>
      </ModalFooter>
    </>
  )
}


export default PortfolioFormModalContent