import { Navbar, NavbarBrand, NavbarMenu, NavbarMenuToggle, NavbarContent, Link, Input, Button } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { useState } from "react";
import UserDropdown from "./UserDropdown";
import { useLocation } from "react-router-dom";
import NavbarLink from "./NavbarLink";
import NavbarMenuLink from "./NavbarMenuLink";

const MainNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

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
          <NavbarLink text="Home" href="/" pathname={pathname} />
          <NavbarLink text="Portfolio" href="/portfolio" pathname={pathname} />
          <NavbarLink text="Watchlist" href="/watchlist" pathname={pathname} />
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
          // startContent={<SearchIcon size={18} />}
          type="search"

        />


        <Button color="primary" variant="ghost">
          Log In / Create Account
        </Button>
        <UserDropdown></UserDropdown>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuLink text="Home" href="/" pathname={pathname} onClick={() => setIsMenuOpen(false)} />
        <NavbarMenuLink text="Portfolio" href="/portfolio" pathname={pathname} onClick={() => setIsMenuOpen(false)} />
        <NavbarMenuLink text="Watchlist" href="/watchlist" pathname={pathname} onClick={() => setIsMenuOpen(false)} />
      </NavbarMenu>
    </Navbar>
  );
}


export default MainNavigation
