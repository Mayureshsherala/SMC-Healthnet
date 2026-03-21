import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Landing from './pages/Landing';
import AdminDashboard from './pages/AdminDashboard';
import AshaPortal from './pages/AshaPortal';
import CitizenPortal from './pages/CitizenPortal';
import HospitalPortal from './pages/HospitalPortal';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/asha/*" element={<AshaPortal />} />
          <Route path="/citizen/*" element={<CitizenPortal />} />
          <Route path="/hospital/*" element={<HospitalPortal />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
