import { useState } from "react"
import DatePicker from "react-multi-date-picker"
import type { Value } from "react-multi-date-picker"



const CustomDataPicker = () => {
  const [value, setValue] = useState<Value>(new Date());

  return (
    <DatePicker
      value={value}
      onChange={setValue}
      inputClass="datepicker-input"
      containerClassName="datepicker-container"
      className="datepicker datepicker-dark green bg-dark"
      highlightToday={false}
    />

  )
}


export default CustomDataPicker