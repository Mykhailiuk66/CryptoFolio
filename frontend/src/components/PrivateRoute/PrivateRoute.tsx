import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";

type PrivateRouteProps = {
	children: React.ReactNode;
};

function PrivateRoute({ children }: PrivateRouteProps) {
	const { user } = useContext(AuthContext);

	return (
		<span aria-label="private-route">
			{user ? children : <Navigate to="/login" replace />}
		</span>
	);
}

export default PrivateRoute;
