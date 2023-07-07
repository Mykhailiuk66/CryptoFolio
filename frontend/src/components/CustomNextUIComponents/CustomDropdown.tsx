import { Dropdown, DropdownProps } from "@nextui-org/react"

const CustomDropdown = ({ children, ...props }: DropdownProps) => {
  return (
    <Dropdown
      {...props}
      classNames={{
        content: ["border-solid", "border-1", "border-default-200/50", "bg-primary-background"],
      }}
    >
      {children}
    </Dropdown >
  )
}

export default CustomDropdown