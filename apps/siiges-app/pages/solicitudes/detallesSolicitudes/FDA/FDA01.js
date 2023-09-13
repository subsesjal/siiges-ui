import React from 'react';
import jsPDF from 'jspdf';

class GenerarPDF extends React.Component {
  generarPDF = () => {
    // Crear un nuevo objeto jsPDF
    const doc = new jsPDF();

    // Agregar contenido al PDF
    doc.text("Hola, este es un PDF sencillo generado con jsPDF en React", 10, 10);

    // Obtener el PDF como una URL de datos
    const pdfDataUri = doc.output('dataurlnewwindow');

    // Abrir el PDF en una nueva pestaña
    window.open(pdfDataUri, '_blank');
  }

  render() {
    return (
      <div>
        <button onClick={this.generarPDF}>Abrir PDF en Nueva Pestaña</button>
      </div>
    );
  }
}

export default GenerarPDF;
