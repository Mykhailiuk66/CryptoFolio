import { Tabs, Tab, Card, CardBody, Image } from "@nextui-org/react";
import { useState, useContext, useEffect } from "react";
import LoginForm from "../components/Authentication/LoginForm";
import RegisterForm from "../components/Authentication/RegisterForm";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";


const Authentication = () => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | number>("login");
  const { user } = useContext(AuthContext)
  console.log(user)
  useEffect(() => {
    if (user) {
      navigate('/portfolio')
    }
  }, [navigate, user])


  const handleSignUpSelect = () => {
    setSelected('sign-up');
  };

  const handleLoginSelect = () => {
    setSelected('login');
  };


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-0 pt-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center justify-center">
          <Image
            width={280}
            src="/logo.png"
            onClick={() => navigate('/')}
            className="cursor-pointer"
          />
        </div>
      </div>

      <Card className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <span className="mt-10 mb-5 text-center text-2xl font-bold leading-9 ">
          CRYPTO
          <span className="font-bold text-green-500">FOLIO</span>
        </span>
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <LoginForm handleSignUpClick={handleSignUpSelect} />
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <RegisterForm handleLoginClick={handleLoginSelect} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </ >
  );
}

export default Authentication