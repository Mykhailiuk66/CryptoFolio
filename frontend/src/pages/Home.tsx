import { Checkbox } from "@nextui-org/react";
import Container from "../components/Container/Container";

const Home = () => {
  return (
    <Container>
      <div className="flex gap-4">
        Main Component
        <Checkbox defaultSelected color="default">Default</Checkbox>
        <Checkbox defaultSelected color="primary">Primary</Checkbox>
        <Checkbox defaultSelected color="secondary">Secondary</Checkbox>
        <Checkbox defaultSelected color="success">Success</Checkbox>
        <Checkbox defaultSelected color="warning">Warning</Checkbox>
        <Checkbox defaultSelected color="danger">Danger</Checkbox>
      </div>
    </Container>)
}

export default Home