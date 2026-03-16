import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Star, ClipboardCheck } from 'lucide-react';

const EvaluationSuperviseur = () => {
  const navigate = useNavigate();
  
  // Liste de tes critères
  const criteres = [
    { id: "org", label: "Compétences organisationnelles" },
    { id: "perf", label: "Performance terrain" },
    { id: "qual", label: "Qualité des données collectées" },
    { id: "lead", label: "Encadrement et Leadership" },
    { id: "comm", label: "Communication avec le Chef de Projet" },
    { id: "eth", label: "Respect des procédures et éthique" },
    { id: "ana", label: "Capacité d’analyse et résolution de problèmes" }
  ];

  const [notes, setNotes] = useState({});

  const handleNote = (critereId, valeur) => {
    setNotes({ ...notes, [critereId]: valeur });
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <button className="btn btn-outline-secondary" onClick={() => navigate('/gestion-superviseurs')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="h2 mb-0">Évaluation : <span className="text-primary">Alice Bella</span></h1>
      </div>

      <div className="card shadow-sm border-0 p-4 mb-4">
        <div className="d-flex align-items-center gap-2 mb-4 text-muted">
          <ClipboardCheck size={20} />
          <span>Projet : <strong>Enquête Satisfaction SABC</strong></span>
        </div>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: '60%' }}>Critères d'évaluation</th>
                <th className="text-center">Note / 5</th>
              </tr>
            </thead>
            <tbody>
              {criteres.map((c) => (
                <tr key={c.id}>
                  <td className="py-3 fw-medium">{c.label}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={24}
                          style={{ cursor: 'pointer' }}
                          fill={notes[c.id] >= star ? "#FFC107" : "none"}
                          color={notes[c.id] >= star ? "#FFC107" : "#CBD5E0"}
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

        <div className="mt-4">
          <label className="form-label fw-bold">Commentaires additionnels</label>
          <textarea className="form-control" rows="3" placeholder="Points forts, points d'amélioration..."></textarea>
        </div>

        <div className="mt-5 d-flex gap-3">
          <button className="btn btn-success px-5 py-2 d-flex align-items-center gap-2" onClick={() => {alert("Évaluation enregistrée !"); navigate('/gestion-superviseurs');}}>
            <Save size={18} /> Enregistrer l'évaluation
          </button>
          <button className="btn btn-light px-4" onClick={() => navigate('/gestion-superviseurs')}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationSuperviseur;