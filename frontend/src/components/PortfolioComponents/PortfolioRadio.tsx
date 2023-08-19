import { Radio, RadioProps, cn } from "@nextui-org/react";

interface PortfolioRadioProps extends RadioProps {
	children: React.ReactNode;
}

const PortfolioRadio = (props: PortfolioRadioProps) => {
	const { children, ...otherProps } = props;

	return (
		<Radio
			{...otherProps}
			classNames={{
				base: cn(
					"inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
					"flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
					"data-[selected=true]:border-primary"
				),
				description: "text-gray-400",
				wrapper: "invisible",
			}}
		>
			{children}
		</Radio>
	);
};

export default PortfolioRadio;
