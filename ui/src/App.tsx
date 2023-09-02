
import { Login } from './components/pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HRDashBoard } from './components/HRDashBoard';
import { EmpDashBoard } from './components/EmpDashBoard';
import AuthGuard from './components/authguard/AuthGuard';
import { NotFound } from './components/errors/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route element={<AuthGuard/>}>
          <Route path='/emp/*' element={<EmpDashBoard />}/>
          <Route path='/hr/*' element={<HRDashBoard/>}/>
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
