import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Button } from "@nextui-org/react";
import { CgProfile } from "react-icons/cg";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";

const UserDropdown = () => {
  const {user, logoutUser} = useContext(AuthContext)

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
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem onClick={logoutUser} key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}



export default UserDropdown