import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
import SuiviGlobalEnqueteurs from './pages/SuiviGlobalEnqueteurs';
import ModifierEnqueteur from './pages/ModifierEnqueteur';
import DetailsEnqueteur from './pages/DetailsEnqueteur';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [projets, setProjets] = useState([]);
  const [enqueteurs, setEnqueteurs] = useState([
    { id: 1, matricule: "ENQ-001", nom: "EBOGO", prenom: "Jean", telephone: "699887766", ville: "Yaoundé", niveau: "LICENSE", domaine: "Sociologie", genre: "Masculin", experience: "Intermédiaire", statut: "Bien" }
  ]);

  const ajouterProjet = (nouveau) => {
    setProjets([...projets, { ...nouveau, id: projets.length + 1 }]);
  };

  const modifierProjet = (projetMisAJour) => {
    setProjets(projets.map(p => p.id === projetMisAJour.id ? projetMisAJour : p));
  };

  const supprimerProjet = (id) => {
    setProjets(projets.filter(p => p.id !== id));
  };

  const modifierEnqueteur = (enqMisAJour) => {
    setEnqueteurs(enqueteurs.map(e => e.id === enqMisAJour.id ? enqMisAJour : e));
  };

  return (
    <Router>
      <Routes>
        {/* --- ROUTES PUBLIQUES --- */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* --- ROUTES RÉSERVÉES AU CHEF --- */}
        <Route path="/chef-dashboard" element={<ProtectedRoute allowedRoles={['chef']}><DashboardChef projets={projets} /></ProtectedRoute>} />
        <Route path="/gestion-projets" element={<ProtectedRoute allowedRoles={['chef']}><GestionProjets projets={projets} supprimerProjet={supprimerProjet} /></ProtectedRoute>} />
        <Route path="/creer-projet" element={<ProtectedRoute allowedRoles={['chef']}><CreerProjet ajouterProjet={ajouterProjet} /></ProtectedRoute>} />
        <Route path="/modifier-projet/:id" element={<ProtectedRoute allowedRoles={['chef']}><ModifierProjet projets={projets} modifierProjet={modifierProjet} /></ProtectedRoute>} />
        <Route path="/suivi-projet/:id" element={<ProtectedRoute allowedRoles={['chef']}><SuiviProjetChef /></ProtectedRoute>} />
        <Route path="/gestion-superviseurs" element={<ProtectedRoute allowedRoles={['chef']}><GestionSuperviseurs /></ProtectedRoute>} />
        <Route path="/evaluation-superviseur" element={<ProtectedRoute allowedRoles={['chef']}><EvaluationSuperviseur /></ProtectedRoute>} />
        <Route path="/suivi-global-enqueteurs" element={<ProtectedRoute allowedRoles={['chef']}><SuiviGlobalEnqueteurs enqueteurs={enqueteurs} /></ProtectedRoute>} />
        <Route path="/modifier-enqueteur/:id" element={<ProtectedRoute allowedRoles={['chef']}><ModifierEnqueteur enqueteurs={enqueteurs} modifierEnqueteur={modifierEnqueteur} /></ProtectedRoute>} />

        {/* --- ROUTES RÉSERVÉES AU SUPERVISEUR --- */}
        <Route path="/superviseur-dashboard" element={<ProtectedRoute allowedRoles={['superviseur']}><DashboardSuperviseur /></ProtectedRoute>} />
        <Route path="/gestion-enqueteurs" element={<ProtectedRoute allowedRoles={['superviseur']}><GestionEnqueteurs /></ProtectedRoute>} />
        <Route path="/projets-assignes" element={<ProtectedRoute allowedRoles={['superviseur']}><ProjetsAssignes /></ProtectedRoute>} />
        <Route path="/details-projet" element={<ProtectedRoute allowedRoles={['superviseur']}><DetailsProjet /></ProtectedRoute>} />

        {/* --- ROUTES ACCESSIBLES AUX DEUX (Chef & Superviseur) --- */}
        <Route path="/evaluation-enqueteur/:id" element={<ProtectedRoute allowedRoles={['chef', 'superviseur']}><EvaluationEnqueteur enqueteurs={enqueteurs} /></ProtectedRoute>} />
        <Route path="/details-enqueteur/:id" element={<ProtectedRoute allowedRoles={['chef', 'superviseur']}><DetailsEnqueteur enqueteurs={enqueteurs} /></ProtectedRoute>} />
        <Route path="/modifier-profil" element={<ProtectedRoute allowedRoles={['chef', 'superviseur']}><ModifierProfil /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<h2 className="p-5 text-center">404 - Page non trouvée</h2>} />
      </Routes>
    </Router>
  );
}

export default App;