import { Input, Link, Button } from "@nextui-org/react";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";

type RegisterFormProps = {
  handleLoginClick: () => void;
}

const RegisterForm = ({ handleLoginClick }: RegisterFormProps) => {
  const { registerErrors, registerUser } = useContext(AuthContext)

  return (
    <form className="flex flex-col gap-4 h-[370]" method="POST" onSubmit={registerUser}>
      <Input
        isRequired
        label="Name"
        placeholder="Enter your name"
        name="username"
        errorMessage={registerErrors.username?.[0]}
      />
      <Input
        isRequired
        label="Email"
        placeholder="Enter your email"
        type="email"
        name="email" 
        errorMessage={registerErrors.email?.[0]}
        />
      <Input
        isRequired
        label="Password"
        placeholder="Enter your password"
        type="password"
        name="password"
        errorMessage={registerErrors.password?.[0]}
      />
      <Input
        isRequired
        label="Repeat Password"
        placeholder="Repeat your password"
        type="password"
        name="password2"
        errorMessage={registerErrors.password2?.[0]}
      />
      <p className="text-center text-small">
        Already have an account?{" "}
        <Link size="sm" onClick={handleLoginClick} className="cursor-pointer">
          Login
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit">
          Sign up
        </Button>
      </div>
    </form>
  )
}


export default RegisterForm