import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importation de tes pages
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardChef from './pages/DashboardChef';
import DashboardSuperviseur from './pages/DashboardSuperviseur';
import GestionProjets from './pages/GestionProjets';
import GestionSuperviseurs from './pages/GestionSuperviseurs';
import EvaluationSuperviseur from './pages/EvaluationSuperviseur';
import GestionEnqueteurs from './pages/GestionEnqueteurs';
import EvaluationEnqueteur from './pages/EvaluationEnqueteur';
import ProjetsAssignes from './pages/ProjetsAssignes';
import DetailsProjet from './pages/DetailsProjet';
import SuiviProjetChef from './pages/SuiviProjetChef';
import ModifierProjet from './pages/ModifierProjet';
import ModifierProfil from './pages/ModifierProfil';
import CreerProjet from './pages/CreerProjet';

function App() {
  // SOURCE DE VÉRITÉ UNIQUE
  const [projets, setProjets] = useState([]);

  const ajouterProjet = (nouveau) => {
    setProjets([...projets, { ...nouveau, id: projets.length + 1 }]);
  };

  const supprimerProjet = (id) => {
    setProjets(projets.filter(p => p.id !== id));
  };

  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dashboards */}
        <Route path="/chef-dashboard" element={<DashboardChef projets={projets} />} />
        <Route path="/superviseur-dashboard" element={<DashboardSuperviseur />} />

        {/* Gestion Projets (Versions avec PROPS uniquement) */}
        <Route path="/gestion-projets" element={<GestionProjets projets={projets} supprimerProjet={supprimerProjet} />} />
        <Route path="/creer-projet" element={<CreerProjet ajouterProjet={ajouterProjet} />} />
        <Route path="/modifier-projet/:id" element={<ModifierProjet projets={projets} setProjets={setProjets} />} />
        <Route path="/suivi-projet/:id" element={<SuiviProjetChef />} />

        {/* Autres fonctionnalités */}
        <Route path="/gestion-superviseurs" element={<GestionSuperviseurs />} />
        <Route path="/evaluation-superviseur" element={<EvaluationSuperviseur />} />
        <Route path="/gestion-enqueteurs" element={<GestionEnqueteurs />} />
        <Route path="/evaluation-enqueteur" element={<EvaluationEnqueteur />} />
        <Route path="/projets-assignes" element={<ProjetsAssignes />} />
        <Route path="/details-projet" element={<DetailsProjet />} />
        <Route path="/modifier-profil" element={<ModifierProfil />} />

        {/* 404 */}
        <Route path="*" element={<h2 className="p-5 text-center">404 - Page non trouvée</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
