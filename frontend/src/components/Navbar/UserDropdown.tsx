import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Button } from "@nextui-org/react";
import { CgProfile } from "react-icons/cg";


const UserDropdown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button isIconOnly color="primary" variant="faded">
          <CgProfile size={24} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">zoey@example.com</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}



export default UserDropdown