import { Card, Skeleton } from "@nextui-org/react";

const ExploreCardSkeleton = () => {
	return (
		<Card className="px-5 pb-1 pt-6 bg-default-100/40">
			<Skeleton className="rounded-lg">
				<div className="h-44 rounded-lg bg-default-300"></div>
			</Skeleton>
			<Skeleton className="my-3 rounded-lg">
				<div className="h-10 rounded-lg bg-default-200"></div>
			</Skeleton>
		</Card>
	);
};

export default ExploreCardSkeleton;
