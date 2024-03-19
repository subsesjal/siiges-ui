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

  console.log(width, textoWidth, textoX);

  doc.text(texto, textoX, y + 5); // Usar la posición X centrada
};

const createSection = (doc, contenido, currentPositionY, alineacion = 'justify') => {
  const margenIzquierdo = 20;

  // Contenido de la sección
  doc.setFont('helvetica');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  const textHeight = doc.getTextDimensions(contenido, { maxWidth: 175 }).h;

  if (currentPositionY + textHeight > doc.internal.pageSize.height - 20) {
    doc.addPage();
    // currentPositionY = 20; // Reiniciar la posición vertical en la nueva página
  }

  // Calcular la posición X según la alineación
  const textX = alineacion === 'right'
    ? doc.internal.pageSize.width - margenIzquierdo
    : margenIzquierdo;

  doc.text(textX, currentPositionY, contenido, {
    maxWidth: 175,
    align: alineacion,
  });

  // currentPositionY += textHeight + 5; // Espacio después de cada sección
};

export {
  createCell,
  createSection,
};
