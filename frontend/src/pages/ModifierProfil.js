import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Lock, Save, Camera, Eye, EyeOff, X } from 'lucide-react';

const ModifierProfil = () => {
  const navigate = useNavigate();
  
  // Référence pour le champ de fichier masqué
  const fileInputRef = useRef(null);

  // Équivalent d'une photo par défaut (URL simulée ou Import)
  const defaultProfilePic = "https://via.placeholder.com/150/0d6efd/ffffff?text=AB";

  // États pour les informations
  const [formData, setFormData] = useState({
    nom: "Alice Bella",
    email: "a.bella@cibletrack.com",
    telephone: "+237 690 00 00 00",
    nouveauPassword: ""
  });

  // État pour la photo de profil (Prévisualisation)
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- LOGIQUE DE CHANGEMENT DE PHOTO ---

  // 1. Déclenche le clic sur l'input masqué
  const handleInputClick = () => {
    fileInputRef.current.click();
  };

  // 2. Gère la sélection du fichier et la prévisualisation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérification du type de fichier (Image uniquement)
      if (!file.type.startsWith('image/')) {
        alert("Veuillez sélectionner une image valide (JPG, PNG).");
        return;
      }

      // Lecteur de fichier pour la prévisualisation
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Met à jour l'image affichée
      };
      reader.readAsDataURL(file);
    }
  };

  // 3. (Optionnel) Réinitialise la photo
  const resetProfilePic = () => {
    setProfilePic(defaultProfilePic);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Efface le fichier sélectionné
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, tu enverrais 'formData' ET le fichier image au backend
    console.log("Données envoyées :", formData);
    console.log("Nouvelle photo (Base64) :", profilePic.startsWith('data:') ? "Oui" : "Non");
    alert("Profil et photo mis à jour avec succès !");
    navigate(-1); 
  };

  return (
    <div className="container py-5">
      {/* En-tête */}
      <div className="d-flex align-items-center gap-3 mb-5">
        <button className="btn btn-outline-dark shadow-sm rounded-circle p-2" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="h2 mb-0 fw-bold">Paramètres du Profil</h1>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="card shadow-sm border-0 overflow-hidden bg-white">
            <div className="row g-0">
              
              {/* Colonne de Gauche : Photo de profil dynamique */}
              <div className="col-md-4 bg-light d-flex flex-column align-items-center justify-content-center p-5 border-end">
                <div className="position-relative mb-4">
                  
                  {/* INPUT FICHIER MASQUÉ (Le cœur de la logique) */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    accept="image/*" 
                    onChange={handleFileChange} 
                  />

                  {/* Affichage de l'image (Cliquable aussi pour plus d'ergonomie) */}
                  <img 
                    src={profilePic} 
                    alt="Profil" 
                    className="rounded-circle shadow-sm border border-4 border-white object-fit-cover"
                    style={{ width: '140px', height: '140px', cursor: 'pointer' }}
                    onClick={handleInputClick}
                  />
                  
                  {/* LE BOUTON APPAREIL PHOTO (Déclencheur) */}
                  <button 
                    type="button"
                    className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0 shadow-lg p-2"
                    title="Changer la photo"
                    onClick={handleInputClick} // <--- Déclenche l'input masqué
                  >
                    <Camera size={20} />
                  </button>

                  {/* Bouton X pour réinitialiser (Si photo changée) */}
                  {profilePic !== defaultProfilePic && (
                    <button 
                      type="button"
                      className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 shadow p-1"
                      title="Réinitialiser la photo"
                      onClick={resetProfilePic}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                <h4 className="fw-bold mb-1 text-dark">{formData.nom}</h4>
                <span className="badge bg-primary px-3 rounded-pill text-uppercase small">Directeur de Projet</span>
                <p className="text-muted small mt-3 text-center">Cliquez sur l'appareil photo ou l'image pour modifier.</p>
              </div>

              {/* Colonne de Droite : Formulaire */}
              <div className="col-md-8">
                <div className="card-body p-4 p-md-5">
                  <form onSubmit={handleSubmit}>
                    
                    <h5 className="fw-bold mb-4 border-bottom pb-2 text-primary">Informations Générales</h5>
                    
                    {/* NOM */}
                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase">Nom Complet</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0 text-muted"><User size={18} /></span>
                        <input type="text" name="nom" className="form-control border-start-0 bg-white" value={formData.nom} onChange={handleChange} required />
                      </div>
                    </div>

                    {/* EMAIL */}
                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase">Adresse Email professionnel</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0 text-muted"><Mail size={18} /></span>
                        <input type="email" name="email" className="form-control border-start-0 bg-white" value={formData.email} onChange={handleChange} required />
                      </div>
                    </div>

                    {/* TÉLÉPHONE */}
                    <div className="mb-4">
                      <label className="form-label small fw-bold text-muted text-uppercase">Numéro de Téléphone</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0 text-muted"><Phone size={18} /></span>
                        <input type="text" name="telephone" className="form-control border-start-0 bg-white" value={formData.telephone} onChange={handleChange} />
                      </div>
                    </div>

                    <h5 className="fw-bold mb-4 border-bottom pb-2 mt-5 text-primary">Sécurité et Accès</h5>

                    {/* MOT DE PASSE */}
                    <div className="mb-4">
                      <label className="form-label small fw-bold text-muted text-uppercase">Nouveau mot de passe</label>
                      <div className="input-group shadow-sm">
                        <span className="input-group-text bg-white border-end-0 text-muted"><Lock size={18} /></span>
                        <input 
                          type={showPass ? "text" : "password"} 
                          name="nouveauPassword" 
                          className="form-control border-start-0 border-end-0 bg-white" 
                          placeholder="Laisser vide si inchangé"
                          onChange={handleChange} 
                        />
                        <button 
                          className="input-group-text bg-white border-start-0 text-muted" 
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                        >
                          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="d-flex gap-3 pt-4 border-top">
                      <button type="submit" className="btn btn-primary px-5 py-2 fw-bold d-flex align-items-center gap-2 shadow rounded-pill">
                        <Save size={18} /> Enregistrer
                      </button>
                      <button type="button" className="btn btn-outline-secondary px-4 py-2 rounded-pill" onClick={() => navigate(-1)}>
                        Annuler
                      </button>
                    </div>

                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifierProfil;