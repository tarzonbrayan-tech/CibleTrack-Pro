import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importation de tes pages
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardChef from './pages/DashboardChef';
import DashboardSuperviseur from './pages/DashboardSuperviseur';
import GestionProjets from './pages/GestionProjets'; // <--- AJOUTE ÇA
import GestionSuperviseurs from './pages/GestionSuperviseurs'; // <--- AJOUTE ÇA
import EvaluationSuperviseur from './pages/EvaluationSuperviseur';
import GestionEnqueteurs from './pages/GestionEnqueteurs';

function App() {
  return (
    <Router>
      <Routes>
        {/* Page par défaut : Redirige vers la connexion */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Routes privées (Dashboard) */}
        <Route path="/chef" element={<DashboardChef />} />
        <Route path="/superviseur" element={<DashboardSuperviseur />} />
        
        {/* Page 404 si l'URL n'existe pas */}
        <Route path="*" element={<h2>404 - Page non trouvée</h2>} />

        <Route path="/chef-dashboard" element={<DashboardChef />} />
        <Route path="/gestion-projets" element={<GestionProjets />} />
        <Route path="/gestion-superviseurs" element={<GestionSuperviseurs />} />
        <Route path="/evaluation-superviseur" element={<EvaluationSuperviseur />} />
        <Route path="/superviseur-dashboard" element={<DashboardSuperviseur />} />
        <Route path="/gestion-enqueteurs" element={<GestionEnqueteurs />} />
      </Routes>
    </Router>
  );
}

export default App;
