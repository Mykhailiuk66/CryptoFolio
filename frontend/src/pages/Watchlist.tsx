import { Pagination } from "@nextui-org/react";
import Container from "../components/Container";

export default function Watchlist() {
  return (
    <Container>
      <div className="flex flex-col gap-5">
        <p>1 Boundary (default)</p>
        <Pagination
          total={10}
          color="secondary"
        />
        <p>2 Boundaries</p>
        <Pagination
          total={10}
          boundaries={2}
          color="secondary"
        />
        <p>3 Boundaries</p>
        <Pagination
          total={10}
          boundaries={3}
          color="secondary"
        />
      </div>
    </Container>
  );
}
