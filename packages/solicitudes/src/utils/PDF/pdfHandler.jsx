const img1 = 'https://i.postimg.cc/HsNJnDCb/img1.png';
const img2 = 'https://i.postimg.cc/FszdhFw9/img2.png';

function header({ doc }) {
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  return null; // Since this component doesn't render anything
}

const createCell = (doc, x, y, width, height, texto) => {
  doc.rect(x, y, width, height, 'F');
  doc.rect(x, y, width, height, 'S');

  doc.setFont('helvetica');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  const textoWidth = (
    doc.getStringUnitWidth(texto) * doc.internal.getFontSize()
  ) / doc.internal.scaleFactor;
  const textoX = x + (width - textoWidth) / 2; // Calcula la posición X centrada

  doc.text(texto, textoX, y + 5); // Usar la posición X centrada
};

const createSection = (doc, contenido, setCurrentPositionY, currentPositionY, alineacion = 'justify') => {
  const margenIzquierdo = 20;

  // Contenido de la sección
  doc.setFont('helvetica');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  const textHeight = doc.getTextDimensions(contenido, { maxWidth: 175 }).h;

  if (currentPositionY + textHeight > doc.internal.pageSize.height - 20) {
    doc.addPage();
    setCurrentPositionY(20); // Reiniciar la posición vertical en la nueva página
  }

  // Calcular la posición X según la alineación
  const textX = alineacion === 'right'
    ? doc.internal.pageSize.width - margenIzquierdo
    : margenIzquierdo;

  doc.text(textX, currentPositionY, contenido, {
    maxWidth: 175,
    align: alineacion,
  });

  setCurrentPositionY(currentPositionY + textHeight + 5); // Espacio después de cada sección
};

export {
  header,
  createCell,
  createSection,
};
