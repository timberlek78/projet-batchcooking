import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Recipe from './pages/Recipe.jsx';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/recipes" element={<Recipe />} />
		</Routes>
	);
}

export default App;
