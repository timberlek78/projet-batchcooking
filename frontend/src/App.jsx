import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Recipe from './pages/Recipe.jsx';
import Users from './pages/Users.jsx';
import Navbar from './components/NavBar/NavBar.jsx';

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/recipes" element={<Recipe />} />
				<Route path="/users" element={<Users />} />
			</Routes>
		</>
	);
}

export default App;
