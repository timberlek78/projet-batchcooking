import Navbar from '../Navbar/NavBar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
	return (
		<>
			<Navbar />
			<main className="content">
				<Outlet />
			</main>
		</>
	);
}
