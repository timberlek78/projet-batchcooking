import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

function ProtectedRoute({ children }) {
		const token = localStorage.getItem("token");

		if (!token) return <Navigate to="/users/login" replace />;

		try {
			const decoded = jwtDecode(token);

			console.log(decoded);
		if (decoded.exp * 1000 < Date.now()) {
			localStorage.removeItem("token");
			return <Navigate to="/users/login" replace />;
		}
	} catch {
		localStorage.removeItem("token");
		return <Navigate to="/users/login" replace />;
	}

	return children;
}

export default ProtectedRoute