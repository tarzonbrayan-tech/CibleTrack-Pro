import React from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FileSpreadsheet, FileText, Upload } from 'lucide-react';

const OutilsFichiers = ({ data, onImport }) => {

  // --- EXPORTATION EXCEL ---
  const exporterExcel = () => {
    const feuille = XLSX.utils.json_to_sheet(data);
    const classeur = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(classeur, feuille, "Enqueteurs");
    XLSX.writeFile(classeur, "CibleTrack_Enqueteurs.xlsx");
  };

  // --- EXPORTATION PDF ---
  const exporterPDF = () => {
    const doc = new jsPDF();
    doc.text("CIBLETRACK PRO - Rapport des Enquêteurs", 14, 15);
    
    // On définit les colonnes du tableau PDF
    const colonnes = ["Matricule", "Nom", "Prénom", "Ville", "Statut"];
    const lignes = data.map(enq => [
      enq.matricule, 
      enq.nom, 
      enq.prenom, 
      enq.ville, 
      enq.statut
    ]);

    doc.autoTable({
      head: [colonnes],
      body: lignes,
      startY: 25,
      theme: 'grid'
    });
    doc.save("Rapport_CibleTrack.pdf");
  };

  // --- IMPORTATION EXCEL ---
  const importerExcel = (e) => {
    const fichier = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const nomFeuille = wb.SheetNames[0];
      const feuille = wb.Sheets[nomFeuille];
      const donneesImportees = XLSX.utils.sheet_to_json(feuille);
      
      // On envoie les données à la fonction parent
      onImport(donneesImportees);
    };
    reader.readAsBinaryString(fichier);
  };

  return (
    <div className="d-flex flex-wrap gap-2 mb-3">
      <button className="btn btn-outline-success btn-sm d-flex align-items-center gap-2" onClick={exporterExcel}>
        <FileSpreadsheet size={16} /> Export Excel
      </button>
      <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2" onClick={exporterPDF}>
        <FileText size={16} /> Export PDF
      </button>
      
      <div className="ms-md-auto">
        <label htmlFor="upload-excel" className="btn btn-primary btn-sm d-flex align-items-center gap-2 mb-0">
          <Upload size={16} /> Importer une liste (Excel)
        </label>
        <input 
          type="file" 
          id="upload-excel" 
          hidden 
          accept=".xlsx, .xls" 
          onChange={importerExcel} 
        />
      </div>
    </div>
  );
};

export default OutilsFichiers;