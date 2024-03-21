import {
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarContent,
  Link,
  Input,
  Button
} from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import UserDropdown from "./UserDropdown";
import NavbarLink from "./NavbarLink";
import NavbarMenuLink from "./NavbarMenuLink";
import AuthContext from "../../store/AuthContext";
import { FaSearch } from "react-icons/fa";


const MainNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, logoutUser } = useContext(AuthContext)

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      <NavbarContent justify="start">
        <NavbarContent className="md:hidden" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>

        <Link href="/" color="primary">
          <NavbarBrand className="mr-4">
            <Image
              width={60}
              src="/logo.png"
              className="hidden sm:block "
            />
            CRYPTO
            <p className="font-bold text-inherit">FOLIO</p>

          </NavbarBrand>
        </Link>

        <NavbarContent className="hidden md:flex gap-3">
          <NavbarLink href="/" pathname={pathname}>Explore</NavbarLink>
          <NavbarLink href="/portfolio" pathname={pathname}>Portfolio</NavbarLink>
          <NavbarLink href="/watchlist" pathname={pathname}>Watchlist</NavbarLink>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[17rem] h-10 hidden md:block",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<FaSearch color="success" size={18}/>}
          type="search"

        />

        {!user &&
          (<Button
            as={Link}
            href="/login"
            color="primary"
            variant="ghost"
            type="button"
          >
            Log In / Create Account
          </Button>)
        }

        {user &&
          (<UserDropdown></UserDropdown>)
        }
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuLink href="/" pathname={pathname} onClick={() => setIsMenuOpen(false)}>Explore</NavbarMenuLink>
        <NavbarMenuLink href="/portfolio" pathname={pathname} onClick={() => setIsMenuOpen(false)}>Portfolio</NavbarMenuLink>
        <NavbarMenuLink href="/watchlist" pathname={pathname} onClick={() => setIsMenuOpen(false)}>Watchlist</NavbarMenuLink>

        {!user && (<NavbarMenuLink href="/login" pathname={pathname} onClick={() => setIsMenuOpen(false)}>Log In</NavbarMenuLink>)}
        {user && (<Button color="danger" onClick={logoutUser}>Log Out</Button>)}


      </NavbarMenu>
    </Navbar>
  );
}


export default MainNavigation
