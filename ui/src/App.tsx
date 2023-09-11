
import { Login } from './components/pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HRDashBoard } from './components/HRDashBoard';
import { EmployeeDashBoard } from './components/EmployeeDashBoard';
import AuthGuard from './components/authguard/AuthGuard';
import { NotFound } from './components/errors/NotFound';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route element={<AuthGuard/>}>
          <Route path='/employee/*' element={<EmployeeDashBoard />}/>
          <Route path='/hr/*' element={<HRDashBoard/>}/>
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
