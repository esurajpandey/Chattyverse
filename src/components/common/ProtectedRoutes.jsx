import { Navigate } from 'react-router-dom';
const ProtectedRoutes = ({
	isAuthenticated,
	redirectPath = '/app/login',
	children,
}) => {
	if (!isAuthenticated) return <Navigate to={redirectPath} />;
	return children;
};
export default ProtectedRoutes;
