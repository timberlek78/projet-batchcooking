import { Routes, Route } from 'react-router-dom';
import Test_BD from './pages/Test_BD.jsx';
import Recipe from './pages/Recipe.jsx';
import Users from './pages/Users.jsx';
import './App.css';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage.jsx';

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/home" element={<HomePage />}></Route>
				<Route path="/test_db" element={<Test_BD />} />
				<Route path="/recipes" element={<Recipe />} />
				<Route path="/users" element={<Users />} />
			</Route>
		</Routes>
	);
}

export default App;
