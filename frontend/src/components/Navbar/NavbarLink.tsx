import { NavbarItem, Link } from "@nextui-org/react";

type NavbarLinkProps = {
  children: React.ReactNode;
  href: string;
  pathname: string;
  color?: "primary" | "foreground" | "secondary" | "success" | "warning" | "danger" | undefined
}


const NavbarLink = ({ children, href, pathname, color }: NavbarLinkProps) => {
  return (
    <NavbarItem isActive={href === pathname ? true : false}>
      <Link href={href} color={color ? color : href === pathname ? "primary" : "foreground"}>
        {children}
      </Link>
    </NavbarItem>
  )
}


export default NavbarLink