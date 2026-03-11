import React from 'react';
import { LayoutDashboard, Users, FolderCanvas, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column vh-100 p-3 bg-dark text-white" style={{ width: '250px', position: 'fixed' }}>
      <h2 className="text-primary fw-bold mb-4">CIBLETRACK</h2>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <button className="nav-link text-white btn w-100 text-start d-flex align-items-center gap-2" onClick={() => navigate(`/${role}`)}>
            <LayoutDashboard size={20} /> Dashboard
          </button>
        </li>
        <li className="nav-item mb-2">
          <button className="nav-link text-white btn w-100 text-start d-flex align-items-center gap-2">
            <FolderCanvas size={20} /> Projets
          </button>
        </li>
        <li className="nav-item mb-2">
          <button className="nav-link text-white btn w-100 text-start d-flex align-items-center gap-2">
            <Users size={20} /> Enquêteurs
          </button>
        </li>
      </ul>
      <hr />
      <button className="btn btn-danger d-flex align-items-center gap-2" onClick={() => navigate('/login')}>
        <LogOut size={20} /> Déconnexion
      </button>
    </div>
  );
};

export default Sidebar;