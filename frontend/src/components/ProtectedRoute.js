import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  // 1. Récupérer les infos de connexion stockées lors du Login
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  // 2. Si l'utilisateur n'est pas connecté -> Direction le Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si le rôle n'est pas autorisé pour cette page -> Retour au login ou page d'erreur
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    alert("Accès refusé : Vous n'avez pas les droits nécessaires.");
    return <Navigate to="/login" replace />;
  }

  // 4. Si tout est OK -> On affiche la page demandée
  return children;
};

export default ProtectedRoute;