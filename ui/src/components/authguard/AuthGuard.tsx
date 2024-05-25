import { Navigate, Outlet } from 'react-router-dom';


const AuthGuard = () => {
  const isAuthenticated = localStorage.getItem("X-AUTH")!=null
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet/>
};

export default AuthGuard;

