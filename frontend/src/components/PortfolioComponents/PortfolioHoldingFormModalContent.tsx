import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  AutocompleteItem,
  Autocomplete,
  Divider,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { ExtendedPortfolioHolding, PortfolioHoldingForm } from "../../types";
import DataContext from "../../store/DataContext";
import DatePicker from "react-multi-date-picker"
import type { DateObject } from "react-multi-date-picker"
import PortfolioContext from "../../store/ProtfolioContext";


type PortfolioHoldingFormModalContentType = {
  title: string;
  value?: ExtendedPortfolioHolding;
  holdingId?: string;
  onClose: () => void,
}


const PortfolioHoldingFormModalContent = ({ title, value, holdingId, onClose }: PortfolioHoldingFormModalContentType) => {
  const [isError, setIsError] = useState(false)
  const { coins, exchanges } = useContext(DataContext)
  const { addPortfolioHolding, editPortfolioHolding, selectedPortfolio } = useContext(PortfolioContext)
  const [formData, setFormData] = useState<PortfolioHoldingForm>({} as PortfolioHoldingForm);

  const handleChange = (key: keyof PortfolioHoldingForm, value: any) => {
    if (key === "purchase_date" || key === "sale_date") {
      try {
        value = value.format("YYYY-MM-DD",)
      }
      catch {
        value = null
      }
    }
    setFormData({ ...formData, [key]: value });
  };


  const onSave = () => {
    if (
      formData.coin &&
      formData.exchange &&
      formData.quantity &&
      formData.purchase_price &&
      formData.purchase_date
    ) {
      if (value && holdingId) {
        editPortfolioHolding(formData, holdingId)
      } else {
        addPortfolioHolding(formData)
      }
      onClose()
    } else {
      setIsError(true)
      return
    }
  }

  useEffect(() => {
    setFormData({
      coin: coins.find((c) => c.short_name === value?.coin_short_name)?.id!.toString()!,
      exchange: exchanges.find((e) => e.name === value?.exchange_name)?.id!.toString()!,
      quantity: value?.quantity!,
      purchase_price: value?.purchase_price!,
      purchase_date: value?.purchase_date!,
      sale_price: value?.sale_price!,
      sale_date: value?.sale_date!,
    })
  }, [coins, exchanges, selectedPortfolio, value])

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
      <ModalBody>
        <Autocomplete
          label="Coin *"
          className="mb-2"
          defaultItems={coins}
          selectedKey={formData.coin}
          onSelectionChange={(value) => handleChange('coin', value)}
        >
          {(c) => (
            <AutocompleteItem key={c.id} textValue={c.short_name}>
              {c.short_name}
            </AutocompleteItem>)}
        </Autocomplete>
        <Autocomplete
          label="Exchange *"
          defaultItems={exchanges}
          selectedKey={formData.exchange}
          onSelectionChange={(value) => handleChange('exchange', value)}
        >
          {(e) => (
            <AutocompleteItem key={e.id} textValue={e.name}>
              {e.name}
            </AutocompleteItem>)}
        </Autocomplete>
        <Divider />

        <Input
          label="Quantity *"
          type="number"
          value={formData.quantity?.toString()}
          onValueChange={(value) => handleChange('quantity', value)}
        />

        <div className="flex justify-between">
          <div>
            <Input
              label="Purchase Price *"
              type="number"
              value={formData.purchase_price?.toString()}
              onValueChange={(value) => handleChange('purchase_price', value)}
              className="pb-3"
            />

            <DatePicker
              value={formData.purchase_date}
              format="YYYY-MM-DD"
              onChange={(date: DateObject) => handleChange('purchase_date', date)}
              calendarPosition='top-start'
              fixMainPosition={true}
              highlightToday={false}
              render={<Input label="Purchase Date *" />}
              minDate="1900-01-01"

              className="bg-dark green datepicker datepicker-dark"
            />

          </div>
          <div>
            <Input
              label="Sale Price"
              type="number"
              value={formData.sale_price?.toString()}
              onValueChange={(value) => handleChange('sale_price', value)}
              className="pb-3"
            />

            <DatePicker
              value={formData.sale_date}
              render={<Input label="Sale Date" />}

              format="YYYY-MM-DD"
              onChange={(date: DateObject) => handleChange('sale_date', date)}
              calendarPosition='top-end'
              fixMainPosition={true}
              highlightToday={false}
              minDate="1900-01-01"

              className="bg-dark green datepicker datepicker-dark"
            />
          </div>
        </div>
      </ModalBody >
      <ModalFooter className="flex justify-between">
        {isError && <p className="text-red-500">
          Please fill out all required fields
        </p>}
        <Button className="bg-primary-600" onPress={onSave}>
          Save Changes
        </Button>
      </ModalFooter>
    </>
  )
}


export default PortfolioHoldingFormModalContent