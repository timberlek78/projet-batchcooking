import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import { isConnected } from '../utils/authUtils.jsx';

function ProtectedRoute({ children }) {
	 ("est connecté",isConnected());
	
	
	if (!isConnected()) return <Navigate to="/users/login" replace />;
	
	const token = localStorage.getItem("token");
	 (token);
	try {
		const decoded = jwtDecode(token);

		 ("aaaaa");
		if (decoded.exp * 1000 < Date.now()) {
			localStorage.removeItem("token");
			return <Navigate to="/users/login" replace />;
		}
	} catch(err) {

		 (err);
		localStorage.removeItem("token");
		return <Navigate to="/users/login" replace />;
	}

	return children;
}

export default ProtectedRoute