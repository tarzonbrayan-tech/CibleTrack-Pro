import React, { useState } from 'react'; // <--- AJOUTE ÇA ICI
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
import EvaluationEnqueteur from './pages/EvaluationEnqueteur';
import ProjetsAssignes from './pages/ProjetsAssignes';
import DetailsProjet from './pages/DetailsProjet';
import SuiviProjetChef from './pages/SuiviProjetChef';
import ModifierProjet from './pages/ModifierProjet';
import ModifierProfil from './pages/ModifierProfil';
import CreerProjet from './pages/CreerProjet';

function App() {
  // LA SOURCE DE VÉRITÉ UNIQUE
  const [projets, setProjets] = useState([
    { id: 1, nom: "Enquête Satisfaction SABC", client: "Brasseries du Cameroun", date: "12/03/2026", statut: "Terminé" },
    { id: 2, nom: "Audit Qualité Orange", client: "Orange CM", date: "15/03/2026", statut: "Disponible" },
    { id: 3, nom: "Test Produit Nestlé", client: "Nestlé", date: "20/03/2026", statut: "Disponible" },
    { id: 4, nom: "Sondage Élections", client: "Gouv", date: "01/01/2026", statut: "En cours" },
  ]);

  // Fonction pour ajouter un projet
  const ajouterProjet = (nouveau) => {
    setProjets([...projets, { ...nouveau, id: projets.length + 1 }]);
  };

  // Fonction pour supprimer un projet
  const supprimerProjet = (id) => {
    setProjets(projets.filter(p => p.id !== id));
  };
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
        <Route path="/evaluation-enqueteur" element={<EvaluationEnqueteur />} />
        <Route path="/projets-assignes" element={<ProjetsAssignes />} />
        <Route path="/details-projet" element={<DetailsProjet />} />
        <Route path="/suivi-projet/:id" element={<SuiviProjetChef />} />
        <Route path="/modifier-projet/:id" element={<ModifierProjet />} />
        <Route path="/modifier-profil" element={<ModifierProfil />} />
        <Route path="/creer-projet" element={<CreerProjet />} />
        <Route 
  path="/gestion-projets" 
  element={<GestionProjets projets={projets} supprimerProjet={supprimerProjet} />} 
/>
      </Routes>
    </Router>
  );
}

export default App;
