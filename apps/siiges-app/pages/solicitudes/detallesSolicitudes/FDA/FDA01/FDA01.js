import React from 'react';
import jsPDF from 'jspdf';


const img1 = 'https://i.postimg.cc/HsNJnDCb/img1.png';
const img2 = 'https://i.postimg.cc/FszdhFw9/img2.png';
const img3 = 'https://i.postimg.cc/c1Xtqt99/img3.png';

let currentPositionY = 90;

function crearCelda(doc, x, y, width, height, texto) {
  doc.rect(x, y, width, height, 'F');
  doc.rect(x, y, width, height, 'S');

  doc.setFont('helvetica');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  const textoWidth =
    (doc.getStringUnitWidth(texto) * doc.internal.getFontSize()) /
    doc.internal.scaleFactor;
  const textoX = x + (width - textoWidth) / 2; // Calcula la posición X centrada

  doc.text(texto, textoX, y + 5); // Usar la posición X centrada
}

function crearSeccion(doc, contenido, alineacion = 'justify') {
  const margenIzquierdo = 20;
  const margenSuperior = currentPositionY;

  // Contenido de la sección
  doc.setFont('helvetica');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  const textHeight = doc.getTextDimensions(contenido, { maxWidth: 175 }).h;

  if (currentPositionY + textHeight > doc.internal.pageSize.height - 20) {
    doc.addPage();
    currentPositionY = 20; // Reiniciar la posición vertical en la nueva página
  }

  // Calcular la posición X según la alineación
  const textX =
    alineacion === 'right'
      ? doc.internal.pageSize.width - margenIzquierdo
      : margenIzquierdo;

  doc.text(textX, currentPositionY, contenido, {
    maxWidth: 175,
    align: alineacion,
  });

  currentPositionY += textHeight + 5; // Espacio después de cada sección
}

export default function GenerarFDA01(id) {
  // Mueve la lógica para generar el PDF dentro de useEffect
console.log(id);
  const doc = new jsPDF();

  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 150, 40, 45, 7, 'FDA01');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(69, 133, 244);
  doc.text(`OFICIO DE ENTREGA DE DOCUMENTACIÓN`, 20, 50);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`SUBSECRETARÍA DE EDUCACIÓN SUPERIOR`, 20, 60);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(
    `AT´N: DIRECTOR GENERAL DE INCORPORACIÓN Y SERVICIOS ESCOLARES.`,
    40,
    69
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`12/09/23`, 152, 75);

  crearSeccion(
    doc,
    'Por este conducto manifiesto que estoy en condiciones para iniciar el trámite de SOLICITUD DE CAMBIO DE DOMICILIO del programa LICENCIATURA en DERECHO, modalidad MIXTA, en periodos CUATRIMESTRAL, turno MATUTINO, VESPERTINO, de la Institución CENTRO UNIVERSITARIO UNE. Así mismo declaro Bajo Protesta de Decir la Verdad que la información y los documentos anexos en la presente solicitud son verídicos y fueron elaborados siguiendo principios éticos profesionales, que son de mi conocimiento las penas en que incurren quienes se conducen con falsedad ante autoridad distinta de la judicial, y señalo como domicilio para recibir notificaciones:'
  );

  crearSeccion(
    doc,
    `Calle / Av. CHIMALHUACÁN, N° 6, Col. CIUDAD DEL SOL, Municipio ZAPOPAN.
Número telefónico particular: 80000863
Número telefónico celular: 80000863`,
    'left' // Al cambiar esto a 'right', el contenido se alineará a la derecha
  );

  crearSeccion(
    doc,
    `Quedo enterado de todas las disposiciones establecidas en la Ley General de Educación, La Ley General de Educación Superior, de Educación del Estado Libre y Soberano de Jalisco, la Ley de Educación Superior del Estado de Jalisco, así como del para obtención de Reconocimiento de Validez Oficial de Estudios de Educación Superior del Estado de Jalisco.`,
    'justify'
  );

  currentPositionY += 50;

  crearSeccion(
    doc,
    `                                                   BAJO PROTESTA DE DECIR VERDAD
                                                      GUILLERMO GÓNGORA CHALITA`,
    'left'
  );

  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const pageNumberText = `Página ${i} de ${totalPages}`;
    const pageNumberTextWidth =
      (doc.getStringUnitWidth(pageNumberText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const pageNumberTextX = pageWidth - 20 - pageNumberTextWidth;
    const pageNumberTextY = pageHeight - 10;

    doc.text(pageNumberText, pageNumberTextX, pageNumberTextY);

    // Agregar imagen en el pie de página
    const imgBottomLeftX = 10; // Posición X de la imagen
    const imgBottomLeftY = pageHeight - 10; // Posición Y de la imagen
    const imgBottomLeftWidth = 18; // Ancho de la imagen
    const imgBottomLeftHeight = 18; // Alto de la imagen

    doc.addImage(
      img3,
      'JPEG',
      imgBottomLeftX,
      imgBottomLeftY - imgBottomLeftHeight,
      imgBottomLeftWidth,
      imgBottomLeftHeight
    );

    const pdfDataUri = doc.output('dataurlnewwindow');

    // Abrir el PDF en una nueva pestaña
    window.open(pdfDataUri, '_blank');
  }

  return ;
}
