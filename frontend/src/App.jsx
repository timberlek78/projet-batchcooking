import { Routes, Route } from 'react-router-dom';
import Test_BD from './pages/Test_BD.jsx';
import Users from './pages/Users/Users.jsx';
import './App.css';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage.jsx';
import RecipePage from './pages/Recipes/RecipePage.jsx';
import AddRecipePage from './pages/Recipes/AddRecipePage.jsx';
import ViewRecipe from './pages/Recipes/ViewRecipe.jsx';
import ProtectedRoute from './components/ProtectedRoutes.jsx';

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>

				{/* Pages publiques */}
				<Route path="/home" element={<HomePage />} />
				<Route path="/users/*" element={<Users />} />

				{/* Pages protégées */}
				<Route
					path="/recipes"
					element={
						<ProtectedRoute>
							<RecipePage />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/recipes/add"
					element={
						<ProtectedRoute>
							<AddRecipePage />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/recipes/:recipeId"
					element={
						<ProtectedRoute>
							<ViewRecipe />
						</ProtectedRoute>
					}
				/>

				{/* (optionnel) */}
				<Route path="/test_db" element={<Test_BD />} />

			</Route>
		</Routes>
	);
}

export default App;
