import {
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarContent,
  Link,
  Button
} from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import UserDropdown from "./UserDropdown";
import NavbarLink from "./NavbarLink";
import NavbarMenuLink from "./NavbarMenuLink";
import AuthContext from "../../store/AuthContext";
import NavSearch from "./NavSearch";

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
      className="bg-default-100/20"
      isBlurred
    >
      <NavbarContent justify="start">
        <NavbarContent className="md:hidden" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>

        <Link href="/" color="primary">
          <NavbarBrand className="mr-4">
            <Image
              width={60}
              src="static/logo.png"
              className="hidden sm:block "
            />
            CRYPTO
            <p className="font-bold text-inherit">FOLIO</p>

          </NavbarBrand>
        </Link>

        <NavbarContent className="hidden md:flex gap-3">
          <NavbarLink href="/" pathname={pathname}>Explore</NavbarLink>
          <NavbarLink href="/watchlist" pathname={pathname}>Watchlist</NavbarLink>
          <NavbarLink href="/portfolio" pathname={pathname}>Portfolio</NavbarLink>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <NavSearch />

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
        <NavbarMenuLink href="/watchlist" pathname={pathname} onClick={() => setIsMenuOpen(false)}>Watchlist</NavbarMenuLink>
        <NavbarMenuLink href="/portfolio" pathname={pathname} onClick={() => setIsMenuOpen(false)}>Portfolio</NavbarMenuLink>

        {!user && (<NavbarMenuLink href="/login" pathname={pathname} onClick={() => setIsMenuOpen(false)}>Log In</NavbarMenuLink>)}
        {user && (<Button color="danger" onClick={logoutUser}>Log Out</Button>)}


      </NavbarMenu>
    </Navbar>
  );
}


export default MainNavigation
