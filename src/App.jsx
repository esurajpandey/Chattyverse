import { useEffect, useState } from 'react';
import './App.scss';
import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
} from 'react-router-dom';
import CustomLoader from './components/common/CustomLoader';
import ProtectedRoutes from './components/common/ProtectedRoutes';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import { useAppContext } from './context/AppContext';
import Register from './pages/Register/Register';

function App() {
	const navigate = useNavigate();
	async function verifyUser() {}
	const { isLoading } = useAppContext();
	useEffect(() => {
		const user = localStorage.getItem('user');
		if (user && user?.token) {
			verifyUser();
		} else {
			localStorage.removeItem('user');
			// navigate('/app/login');
		}
	}, []);

	return (
		<>
			<Header />
			{isLoading && <CustomLoader />}
			<Routes>
				<Route path="/app/login" element={<Login />} />
				<Route path="/app/register" element={<Register />} />
				<Route
					path="/"
					element={
						<ProtectedRoutes isAuthenticated={true} children={<Home />} />
					}
				/>
			</Routes>
		</>
	);
}

export default App;
