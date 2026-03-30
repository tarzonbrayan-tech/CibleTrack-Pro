import React from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FileDown, FileUp, FileSpreadsheet, FileText } from 'lucide-react';

const ExportImportData = ({ data, onImport }) => {

  // --- EXPORT EXCEL ---
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquêteurs");
    XLSX.writeFile(workbook, "Rapport_Enqueteurs_CibleTrack.xlsx");
  };

  // --- EXPORT PDF ---
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("CIBLETRACK PRO - Rapport de fin de mission", 14, 15);
    
    const tableColumn = ["Matricule", "Nom", "Prénom", "Ville", "Statut"];
    const tableRows = [];

    data.forEach(enq => {
      const enqData = [
        enq.matricule,
        enq.nom,
        enq.prenom,
        enq.ville,
        enq.statut
      ];
      tableRows.push(enqData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 25 });
    doc.save("Rapport_CibleTrack.pdf");
  };

  // --- IMPORT EXCEL ---
  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const bstr = event.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const importedData = XLSX.utils.sheet_to_json(sheet);
      
      // On renvoie les données au parent (App.js) pour mettre à jour la liste
      onImport(importedData);
      alert(`${importedData.length} enquêteurs importés avec succès !`);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      {/* BOUTONS EXPORT */}
      <button className="btn btn-outline-success d-flex align-items-center gap-2 shadow-sm" onClick={exportToExcel}>
        <FileSpreadsheet size={18} /> Excel
      </button>
      
      <button className="btn btn-outline-danger d-flex align-items-center gap-2 shadow-sm" onClick={exportToPDF}>
        <FileText size={18} /> PDF
      </button>

      {/* BOUTON IMPORT */}
      <div className="ms-auto">
        <label htmlFor="importExcel" className="btn btn-primary d-flex align-items-center gap-2 shadow-sm">
          <FileUp size={18} /> Importer Excel
        </label>
        <input 
          type="file" 
          id="importExcel" 
          hidden 
          accept=".xlsx, .xls" 
          onChange={handleImport} 
        />
      </div>
    </div>
  );
};

export default ExportImportData;