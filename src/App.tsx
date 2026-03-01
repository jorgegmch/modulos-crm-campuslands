import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './modules/campers/components/MainLayout';
import RegistroCampersPage from './modules/campers/pages/RegistroCampersPage';

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/registro" />} />
          <Route path="/registro" element={<RegistroCampersPage />} />
          <Route path="/consultar" element={<div style={{color: 'white'}}>Próximamente...</div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}