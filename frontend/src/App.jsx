import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Recipe from './pages/Recipe.jsx';
import Users from './pages/Users.jsx';
import './App.css';
import Layout from './components/Layout/Layout';

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route path="/recipes" element={<Recipe />} />
				<Route path="/users" element={<Users />} />
			</Route>
		</Routes>
	);
}

export default App;
