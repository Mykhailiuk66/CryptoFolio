import { NavbarMenuItem, Link } from "@nextui-org/react";
import { MouseEventHandler } from "react";

type NavbarMenuLinkProps = {
	children: string;
	href: string;
	pathname: string;
	color?:
		| "primary"
		| "foreground"
		| "secondary"
		| "success"
		| "warning"
		| "danger";
	onClick?: MouseEventHandler;
};

const NavbarMenuLink = ({
	children,
	href,
	pathname,
	color,
	onClick,
}: NavbarMenuLinkProps) => {
	return (
		<NavbarMenuItem isActive={href === pathname ? true : false}>
			<Link
				href={href}
				color={
					color ? color : href === pathname ? "primary" : "foreground"
				}
				className="w-full"
				size="lg"
				onClick={onClick}
			>
				{children}
			</Link>
		</NavbarMenuItem>
	);
};

export default NavbarMenuLink;
