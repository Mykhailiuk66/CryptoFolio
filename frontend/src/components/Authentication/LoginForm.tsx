import { Input, Link, Button } from "@nextui-org/react";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";


type LoginFormProps = {
  handleSignUpClick: () => void;
}

const LoginForm = ({ handleSignUpClick }: LoginFormProps) => {
  const { loginUser, isLoginUnsuccessful } = useContext(AuthContext)

  return (
    <form className="flex flex-col gap-4" method="POST" onSubmit={loginUser}>
      <Input isRequired label="Email" placeholder="Enter your email" type="email" name="email" />
      <Input
        isRequired
        label="Password"
        placeholder="Enter your password"
        type="password"
        name="password"
      />
      {isLoginUnsuccessful && (
        <p className="text-center text-red-500" >Incorrect Email or Password</p>
      )}

      <p className="text-center text-small">
        Need to create an account?{" "}
        <Link size="sm" onClick={handleSignUpClick} className="cursor-pointer">
          Sign up
        </Link>
      </p>

      <div className="flex gap-2 justify-end">

        <Button fullWidth color="primary" type="submit">
          Login
        </Button>
      </div>
    </form>
  )
}


export default LoginForm