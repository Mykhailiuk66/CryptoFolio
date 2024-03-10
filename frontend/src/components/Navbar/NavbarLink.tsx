import { NavbarItem, Link } from "@nextui-org/react";

type NavbarLinkProps = {
  text: string;
  href: string;
  pathname: string;
  color?: "primary" | "foreground" | "secondary" | "success" | "warning" | "danger" | undefined
}


const NavbarLink = ({ text, href, pathname, color }: NavbarLinkProps) => {
  return (
    <NavbarItem isActive={href === pathname ? true : false}>
      <Link href={href} color={color ? color : href === pathname ? "primary" : "foreground"}>
        {text}
      </Link>
    </NavbarItem>
  )
}


export default NavbarLink