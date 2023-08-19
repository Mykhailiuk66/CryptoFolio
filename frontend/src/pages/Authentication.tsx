import { Tabs, Tab, Card, CardBody, Image } from "@nextui-org/react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

import LoginForm from "../components/Authentication/LoginForm";
import RegisterForm from "../components/Authentication/RegisterForm";
import { AuthContext } from "../store/AuthContext";

const Authentication = () => {
	const navigate = useNavigate();
	const [selected, setSelected] = useState<string | number>("login");
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (user) {
			navigate("/portfolio");
		}
	}, [navigate, user]);

	useEffect(() => {
		toast("Test Login Credentials", {
			dismissible: true,
			duration: 600000,
			style: {
				border: "1px solid #24DF91",
				background: "#010100",
				color: "#24DF91",
			},
			description: (
				<div>
					<p>Email: test@gmail.com</p>
					<p>Password: test_pass</p>
				</div>
			),
		});
	}, []);

	const handleSignUpSelect = () => {
		setSelected("sign-up");
	};

	const handleLoginSelect = () => {
		setSelected("login");
	};

	return (
		<>
			<Toaster richColors position="top-right" />
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-0 pt-2 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center justify-center">
					<Image
						width={280}
						src="static/logo.png"
						onClick={() => navigate("/")}
						className="cursor-pointer"
					/>
				</div>
			</div>

			<Card className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm border-solid border-1 border-default-200/50 bg-default-100/40 ">
				<span className="mt-10 mb-5 text-center text-2xl font-bold leading-9 ">
					CRYPTO
					<span className="font-bold text-green-500">FOLIO</span>
				</span>
				<CardBody className="overflow-hidden">
					<Tabs
						fullWidth
						size="md"
						aria-label="Tabs form"
						color="primary"
						variant="light"
						classNames={{
							tabList:
								"border-solid border-1 border-default-200/50 bg-default-100/40",
						}}
						selectedKey={selected}
						onSelectionChange={setSelected}
					>
						<Tab key="login" title="Login">
							<LoginForm handleSignUpClick={handleSignUpSelect} />
						</Tab>
						<Tab key="sign-up" title="Sign up">
							<RegisterForm
								handleLoginClick={handleLoginSelect}
							/>
						</Tab>
					</Tabs>
				</CardBody>
			</Card>
		</>
	);
};

export default Authentication;
