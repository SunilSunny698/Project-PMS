import { Navigate, Outlet } from 'react-router-dom';


const AuthGuard = () => {
  const isAuthenticated = localStorage.getItem("Jwt")!=null
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet/>
};

export default AuthGuard;

