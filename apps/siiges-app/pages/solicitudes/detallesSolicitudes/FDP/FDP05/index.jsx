import jsPDF from 'jspdf';
import 'jspdf-autotable';

const img1 = 'https://i.postimg.cc/HsNJnDCb/img1.png';
const img2 = 'https://i.postimg.cc/FszdhFw9/img2.png';
const img3 = 'https://i.postimg.cc/c1Xtqt99/img3.png';

// eslint-disable-next-line no-unused-vars
export default function GenerarFDP05(solicitud) {
  let currentPositionY = 67;

  function crearCelda(doc, x, y, width, height, texto) {
    doc.rect(x, y, width, height, 'F');
    doc.rect(x, y, width, height, 'S');

    doc.setFont('helvetica');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    const textoWidth = (doc.getStringUnitWidth(texto) * doc.internal.getFontSize())
      / doc.internal.scaleFactor;
    const textoX = x + (width - textoWidth) / 2; // Calcula la posición X centrada

    doc.text(texto, textoX, y + 5); // Usar la posición X centrada
  }

  function crearSeccion(doc, contenido, alineacion = 'justify') {
    const margenIzquierdo = 20;

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
    const textX = alineacion === 'right'
      ? doc.internal.pageSize.width - margenIzquierdo
      : margenIzquierdo;

    doc.text(textX, currentPositionY, contenido, {
      maxWidth: 175,
      align: alineacion,
    });

    currentPositionY += textHeight + 5; // Espacio después de cada sección
  }

  // eslint-disable-next-line new-cap
  const doc = new jsPDF();
  // eslint-disable-next-line no-shadow
  function crearSeccionConTexto(doc, titulo, contenido) {
    // Titulo de la sección
    doc.setFillColor(172, 178, 183);
    crearCelda(
      doc,
      20, // cellX
      currentPositionY, // cellY
      176, // cellWidth
      7, // cellHeight
      titulo,
    );

    const textHeight = doc.getTextDimensions(contenido, {
      align: 'justify',
      maxWidth: 175,
    }).h;

    if (
      currentPositionY + textHeight + 25
      > doc.internal.pageSize.height - 20
    ) {
      doc.addPage();
      currentPositionY = 20; // Reiniciar la posición vertical en la nueva página
    }

    doc.setFont('helvetica');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(contenido, 20, currentPositionY + 15, {
      align: 'justify',
      maxWidth: 175,
    });

    currentPositionY += textHeight + 20; // Espacio después del texto
  }

  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setFillColor(69, 133, 244);
  crearCelda(doc, 150, 40, 45, 7, 'FDP05');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(69, 133, 244);
  doc.text('TRAYECTORIA EDUCATIVA Y TUTORÍA DE LOS ESTUDIANTES', 20, 55);

  crearSeccionConTexto(
    doc,
    '1. PROGRAMA DE SEGUIMIENTO DE LA TRAYECTORIA ACADÉMICA DE LOS ESTUDIANTES',
    `${solicitud.programa.trayectoria.programaSeguimiento}`,
  );

  crearSeccionConTexto(
    doc,
    '2. FUNCIÓN TUTORIAL',
    `${solicitud.programa.trayectoria.programaSeguimiento}`,
  );

  crearSeccionConTexto(
    doc,
    '3. TIPO DE TUTORIA',
    `${solicitud.programa.trayectoria.tipoTutoria}`,
  );

  crearSeccionConTexto(
    doc,
    '4. TASA DE EGRESOS',
    `${solicitud.programa.trayectoria.tasaEgreso}`,
  );

  currentPositionY += 20;

  crearSeccion(
    doc,
    '                                                            BAJO PROTESTA DE DECIR VERDAD                                                                                                                   GUILLERMO GÓNGORA CHALITA',
    'left',
  );

  const totalPages = doc.internal.getNumberOfPages();
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const pageNumberText = `Página ${i} de ${totalPages}`;
    const pageNumberTextWidth = (doc.getStringUnitWidth(pageNumberText)
    * doc.internal.getFontSize())
      / doc.internal.scaleFactor;
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
      imgBottomLeftHeight,
    );

    const pdfDataUri = doc.output('dataurlnewwindow');

    // Abrir el PDF en una nueva pestaña
    window.open(pdfDataUri, '_blank');
  }
}
