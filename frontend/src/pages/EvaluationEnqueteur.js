import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Star, ClipboardList, Award } from 'lucide-react';

const EvaluationEnqueteur = ({ enqueteurs = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enqueteur, setEnqueteur] = useState(null);

  // Chercher l'enquêteur correspondant à l'ID
  useEffect(() => {
    const cible = enqueteurs.find(e => e.id === parseInt(id));
    if (cible) setEnqueteur(cible);
  }, [id, enqueteurs]);
  
  // Tes 10 critères spécifiques
  const criteres = [
    { id: "prof", label: "Professionnalisme" },
    { id: "inv", label: "Capacité d’investigation" },
    { id: "coll", label: "Collaboration" },
    { id: "rig", label: "Rigueur" },
    { id: "disc", label: "Discipline" },
    { id: "lead", label: "Leadership" },
    { id: "int", label: "Intégrité" },
    { id: "meth", label: "Méthodologie" },
    { id: "conc", label: "Maîtrise conceptuelle" },
    { id: "num", label: "Compétence numérique" }
  ];

  const [notes, setNotes] = useState({});

  const handleNote = (critereId, valeur) => {
    setNotes({ ...notes, [critereId]: valeur });
  };

  if (!enqueteur) return <div className="p-5 text-center">Chargement de l'agent...</div>;

  return (
    <div className="container py-5">
      {/* En-tête */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <button className="btn btn-outline-primary shadow-sm" onClick={() => navigate('/gestion-enqueteurs')}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="h2 mb-0 text-dark">Évaluation Enquêteur</h1>
          <p className="text-muted mb-0">Agent : <span className="fw-bold text-primary">{enqueteur.nom} {enqueteur.prenom}</span></p>
        </div>
      </div>

      <div className="card shadow-sm border-0 p-4 mb-4">
        {/* Rappel du contexte */}
        <div className="alert alert-info d-flex align-items-center gap-2 mb-4 border-0 shadow-sm bg-opacity-10 text-primary">
          <ClipboardList size={20} />
          <span>Mission : <strong>Collecte Terrain - SABC 2026</strong></span>
        </div>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: '60%' }} className="py-3">Critères de performance</th>
                <th className="text-center">Note / 5</th>
              </tr>
            </thead>
            <tbody>
              {criteres.map((c) => (
                <tr key={c.id}>
                  <td className="py-3">
                    <div className="d-flex align-items-center gap-2">
                      <Award size={16} className="text-secondary" />
                      <span className="fw-medium">{c.label}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={24}
                          style={{ cursor: 'pointer' }}
                          fill={notes[c.id] >= star ? "#FFC107" : "none"}
                          color={notes[c.id] >= star ? "#FFC107" : "#DEE2E6"}
                          onClick={() => handleNote(c.id, star)}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Zone de feedback */}
        <div className="mt-4 bg-light p-4 rounded-3 border">
          <label className="form-label fw-bold text-dark mb-2">Commentaires et observations terrain</label>
          <textarea 
            className="form-control border-0 shadow-sm" 
            rows="4" 
            placeholder="Détaillez ici les points marquants de sa prestation (ex: ponctualité, aisance avec les tablettes...)"
          ></textarea>
        </div>

        {/* Boutons d'action */}
        <div className="mt-5 d-flex gap-3 justify-content-end">
          <button 
  className="btn btn-light px-4 py-2 border fw-bold" 
  onClick={() => {
    const role = localStorage.getItem('userRole');
    if (role === 'chef') {
      navigate('/suivi-global-enqueteurs');
    } else {
      navigate('/superviseur-dashboard');
    }
  }}
>
  Annuler
</button>
          <button 
  className="btn btn-primary px-5 py-2 d-flex align-items-center gap-2 shadow fw-bold" 
  onClick={() => {
    // 1. On récupère le rôle stocké lors du Login
    const role = localStorage.getItem('userRole'); 

    // 2. Message de succès
    alert(`Évaluation de l'agent ${enqueteur.nom} sauvegardée !`);

    // 3. Redirection selon le profil
    if (role === 'chef') {
      navigate('/suivi-global-enqueteurs'); // Retour au tableau de bord général
    } else {
      navigate('/superviseur-dashboard'); // Retour à l'espace superviseur
    }
  }}
>
  <Save size={18} /> Enregistrer l'évaluation
</button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationEnqueteur;