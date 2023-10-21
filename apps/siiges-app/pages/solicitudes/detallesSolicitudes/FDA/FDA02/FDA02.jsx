import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const img1 = 'https://i.postimg.cc/HsNJnDCb/img1.png';
const img2 = 'https://i.postimg.cc/FszdhFw9/img2.png';
const img3 = 'https://i.postimg.cc/c1Xtqt99/img3.png';

let currentPositionY = 67;

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

export default function GenerarFDA02(solicitud, solicitudDetalles) {
  console.log(solicitud);

  const doc = new jsPDF();

  function crearSeccionConTabla1(doc, titulo, tablaData, tableOptions = {}) {
    const pageHeight = doc.internal.pageSize.height;
    const margin = 5;
    const availableSpace = pageHeight - margin;
    const textHeight = doc.getTextDimensions(titulo, {
      align: 'justify',
      maxWidth: 175,
    }).h;

    if (currentPositionY + textHeight + 20 > availableSpace) {
      doc.addPage();
      currentPositionY = margin; // Reiniciar la posición vertical en la nueva página
    }

    // Título de la sección
    doc.setFillColor(172, 178, 183);
    crearCelda(
      doc,
      14, // cellX
      currentPositionY, // cellY
      182, // cellWidth
      7, // cellHeight
      titulo
    );

    const startY = currentPositionY + (tableOptions.spaceBeforeTable || 5);

    const previousY = currentPositionY; // Guardar la posición antes de crear la tabla

    doc.autoTable({
      startY: startY,
      head: [tablaData.headers], // Encabezados de la tabla
      body: tablaData.body, // Datos de la tabla
      theme: 'grid',
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 0.3,
      },
      headStyles: {
        fillColor: [172, 178, 183],
        fontSize: 12,
        textColor: [20, 20, 20],
      },
      ...tableOptions, // Opciones adicionales de la tabla
    });

    const tableHeight = currentPositionY - previousY; // Altura real de la tabla

    currentPositionY += tableHeight + 20; // Espacio después de la tabla
  }

  function generateTable(
    doc,
    headers,
    tableData,
    startY,
    headStyles,
    showHead
  ) {
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: startY,
      theme: 'grid',
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 0.3,
      },
      headStyles: headStyles,
      showHead: showHead,
    });
  }

  function crearSeccionConTabla(doc, solicitud) {
    const headers1 = [
      'NOMBRE DE LA INSTITUCIÓN',
      'NIVEL Y NOMBRE DEL PLAN DE ESTUDIOS',
      'DURACIÓN DEL PROGRAMA',
      'NOMBRE COMPLETO DE LA RAZÓN SOCIAL',
    ];
    const dataColumn1 = [
      solicitud.programa.plantel.institucion.nombre,
      nombreNivel + '   ' + solicitud.programa.nombre,
      solicitud.programa.duracionPeriodos,
      solicitud.programa.plantel.institucion.razonSocial,
    ];

    const tableData1 = headers1.map((header, index) => [
      header,
      dataColumn1[index],
    ]);

    const tableOptions = {
      startY: currentPositionY,
      margin: { right: 15, left: 20 },
      theme: 'grid',
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 0.3,
      },
      headStyles: {
        fontSize: 15,
      },
      showHead: false,
      columnStyles: {
        0: {
          fillColor: [172, 178, 183],
        },
        1: {
          fontStyle: 'bold',
        },
      },
    };

    const textHeight = doc.getTextDimensions(
      tableData1.join('\n'),
      tableOptions
    ).h;

    if (currentPositionY + textHeight > doc.internal.pageSize.height - 20) {
      doc.addPage();
      currentPositionY = 20; // Reiniciar la posición vertical en la nueva página
    }

    doc.autoTable({
      body: tableData1,
      ...tableOptions,
    });

    currentPositionY = doc.previousAutoTable.finalY + 10; // Espacio después de la tabla
  }

  var fechaCreacion = solicitud.createdAt;
  // Convierte la cadena de texto en un objeto de fecha
  var fecha = new Date(fechaCreacion);
  // Obtiene el día, mes y año de la fecha
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1; // Los meses son indexados desde 0, por lo que se suma 1
  var año = fecha.getFullYear();
  // Formatea la fecha en el formato 'día/mes/año'
  var fechaFormateada = dia + '/' + mes + '/' + año;

  var tipoSolicitud = ''; // Esta variable almacenará el nombre de la solicitud.
  if (solicitud.tipoSolicitudId === 1) {
    tipoSolicitud = 'NUEVA SOLICITUD';
  } else if (solicitud.tipoSolicitudId === 2) {
    tipoSolicitud = 'REFRENDO';
  } else if (solicitud.tipoSolicitudId === 3) {
    tipoSolicitud = 'CAMBIO DE DOMICILIO';
  }

  var nombreNivel = '';
  if (solicitud.programa.nivelId === 1) {
    nombreNivel = 'Bachillerato';
  } else if (solicitud.programa.nivelId === 2) {
    nombreNivel = 'Licenciatura';
  } else if (solicitud.programa.nivelId === 3) {
    nombreNivel = 'Técnico Superior Universitario';
  } else if (solicitud.programa.nivelId === 4) {
    nombreNivel = 'Especialidad';
  } else if (solicitud.programa.nivelId === 5) {
    nombreNivel = 'Maestría';
  } else if (solicitud.programa.nivelId === 6) {
    nombreNivel = 'Doctorado';
  }

  var modalidadTipo = '';
  if (solicitud.programa.modalidadId === 1) {
    modalidadTipo = 'Escolarizada';
  } else if (solicitud.programa.modalidadId === 2) {
    modalidadTipo = 'No escolarizada';
  } else if (solicitud.programa.modalidadId === 3) {
    modalidadTipo = 'Mixta';
  } else if (solicitud.programa.modalidadId === 4) {
    modalidadTipo = 'Dual';
  }

  var ciclosTipo = '';
  if (solicitud.programa.modalidadId === 1) {
    ciclosTipo = 'Semestral';
  } else if (solicitud.programa.modalidadId === 2) {
    ciclosTipo = 'Cuatrimestral';
  } else if (solicitud.programa.modalidadId === 3) {
    ciclosTipo = 'Anual';
  } else if (solicitud.programa.modalidadId === 4) {
    ciclosTipo = 'Semestral curriculum flexible';
  } else if (solicitud.programa.modalidadId === 5) {
    ciclosTipo = 'Cuatrimestral curriculum flexible';
  }

  var programaTurnos = solicitud.programa.programaTurnos;
  var tiposDeTurno = [];
  programaTurnos.forEach(function (turno) {
    // Verifica el valor de turnoId y agrega el tipo de turno correspondiente al arreglo tiposDeTurno
    if (turno.turnoId === 1) {
      tiposDeTurno.push('Matutino');
    } else if (turno.turnoId === 2) {
      tiposDeTurno.push('Vespertino');
    } else if (turno.turnoId === 3) {
      tiposDeTurno.push('Nocturno');
    } else if (turno.turnoId === 4) {
      tiposDeTurno.push('Mixto');
    }
  });

  // Convierte el arreglo de tipos de turno en un texto separado por comas
  var turnoTipo = tiposDeTurno.join(', ');

  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 150, 40, 45, 7, 'FDA02');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(69, 133, 244);
  doc.text(`OFICIO DE ENTREGA DE DOCUMENTACIÓN`, 20, 50);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(fechaFormateada, 152, 58);

  crearSeccionConTabla(doc, solicitud);

  currentPositionY = doc.previousAutoTable.finalY + 5;

  const headers = ['NIVEL DE ESTUDIO', 'TURNO', 'MODALIDAD', 'CICLO'];
  const tablePrograma = [[nombreNivel, turnoTipo, modalidadTipo, ciclosTipo]];
  generateTable(doc, headers, tablePrograma, currentPositionY + 5, {
    fillColor: [172, 178, 183],
    fontSize: 12,
    textColor: [20, 20, 20],
  });

  currentPositionY = doc.previousAutoTable.finalY + 5; // Espacio después de la celda

  const tablaData1 = {
    headers: ['CALLE Y NÚMERO', 'COLONIA'],
    body: [
      [
        solicitud.programa.plantel.domicilio.calle +
          '  ' +
          solicitud.programa.plantel.domicilio.numeroExterior,
        solicitud.programa.plantel.domicilio.colonia,
      ],
    ],
  };

  crearSeccionConTabla1(doc, 'DOMICILIO DE LA INSTITUCIÓN', tablaData1, {
    spaceBeforeTable: 7,
  });

  currentPositionY = doc.previousAutoTable.finalY - 20;

  const headers2 = [
    'CÓDIGO POSTAL',
    'DELEGACIÓN O MUNICIPIO',
    'ENTIDAD FEDERATIVA',
  ];
  const tableData2 = [
    [
      solicitud.programa.plantel.domicilio.codigoPostal,
      solicitud.programa.plantel.domicilio.municipio.nombre,
      solicitud.programa.plantel.domicilio.estado.nombre,
    ],
  ];
  generateTable(doc, headers2, tableData2, currentPositionY + 20, {
    fillColor: [172, 178, 183],
    fontSize: 12,
    textColor: [20, 20, 20],
  });

  currentPositionY = doc.previousAutoTable.finalY - 20;

  const headers3 = [
    'NÚMERO TELEFÓNICO',
    'REDES SOCIALES',
    'CORREO ELECTRÓNICO',
  ];
  const tableData3 = [
    [
      `${solicitud.programa.plantel.telefono1},\n${solicitud.programa.plantel.telefono2},\n${solicitud.programa.plantel.telefono3}`,
      solicitud.programa.plantel.institucion.redesSociales,
      `${solicitud.programa.plantel.correo1},\n${solicitud.programa.plantel.correo2},\n${solicitud.programa.plantel.correo3}`,
    ],
  ];
  generateTable(doc, headers3, tableData3, currentPositionY + 20, {
    fillColor: [172, 178, 183],
    fontSize: 12,
    textColor: [20, 20, 20],
  });

  currentPositionY = doc.previousAutoTable.finalY + 5; // Espacio después de la celda

  const tablaRepresentante = {
    headers: ['Nombre', 'datos'],
    body: [
      ['NOMBRE (S)', 'ADRIANA re'],
      ['APELLIDO PATERNO', 'DE LOS REYES re'],
      ['APELLIDO MATERNO', 'MORENO re'],
      ['NACIONALIDAD', 'MEXICANA re'],
    ],
    showHead: false,
    columnStyles: {
      0: {
        fillColor: [172, 178, 183],
      },
      1: {
        fontStyle: 'bold',
      },
    },
  };

  crearSeccionConTabla1(
    doc,
    'DATOS DEL SOLICITANTE (PERSONA FÍSICA O REPRESENTANTE LEGAL DE LA PERSONA JURÍDICA',
    tablaRepresentante,
    {
      spaceBeforeTable: 7,
      ...tablaRepresentante, // Pasa los estilos de la tabla como parte de las opciones
    }
  );

  currentPositionY = doc.previousAutoTable.finalY; // Espacio después de la celda

  const headers6 = ['CALLE Y NÚMERO', 'COLONIA'];
  const tableData6 = [
    [
      solicitud.programa.plantel.domicilio.calle +
        '  ' +
        solicitud.programa.plantel.domicilio.numeroExterior,
      solicitud.programa.plantel.domicilio.estado.nombre,
    ],
  ];
  generateTable(doc, headers6, tableData6, currentPositionY, {
    fillColor: [172, 178, 183],
    fontSize: 12,
    textColor: [20, 20, 20],
  });

  const headers7 = [
    'CÓDIGO POSTAL',
    'DELEGACIÓN O MUNICIPIO',
    'ENTIDAD FEDERATIVA',
  ];
  const tableData7 = [
    [
      solicitud.programa.plantel.domicilio.codigoPostal,
      solicitud.programa.plantel.domicilio.municipio.nombre,
      solicitud.programa.plantel.domicilio.estado.nombre,
    ],
  ];
  generateTable(doc, headers7, tableData7, currentPositionY, {
    fillColor: [172, 178, 183],
    fontSize: 12,
    textColor: [20, 20, 20],
  });
  currentPositionY = doc.previousAutoTable.finalY - 20;
  const headers8 = ['NÚMERO TELEFÓNICO', 'CORREO ELECTRÓNICO'];
  const tableData8 = [['4491910926 repre,', 'tercercorre@gmail.com repre']];
  generateTable(doc, headers8, tableData8, currentPositionY + 20, {
    fillColor: [172, 178, 183],
    fontSize: 12,
    textColor: [20, 20, 20],
  });

  currentPositionY = doc.previousAutoTable.finalY + 10;

  const tablaData9 = {
    headers: ['NOMBRE (S)', 'APELLIDO PATERNO', 'APELLIDO MATERNO'],
    body: [['ADRIANA rector', 'DE LOS REYES rector', 'MORENO rector']],
  };

  crearSeccionConTabla1(doc, 'DATOS DEL RECTOR', tablaData9, {
    spaceBeforeTable: 7,
    ...tablaData9, // Pasa los estilos de la tabla como parte de las opciones
  });

  currentPositionY = doc.previousAutoTable.finalY;

  const headers10 = [
    'CORREO INSTITUCIONAL rector',
    'CORREO PERSONAL rector',
    'TELÉFONO CELULAR rector',
  ];
  const tableData10 = [
    ['primercorreo@hotmail.com', 'tercercorre@gmail.com', '234131313123'],
  ];
  generateTable(doc, headers10, tableData10, currentPositionY, {
    fillColor: [172, 178, 183],
    fontSize: 12,
    textColor: [20, 20, 20],
  });

  const tablaData11 = {
    headers: ['GRADO EDUCATIVO', 'NOMBRE DE LOS ESTUDIOS'],
    body: [['LICENCIATURA rector', 'MEDIOS MASIVOS DE COMUNICACIÓN rector']],
  };

  crearSeccionConTabla1(doc, 'FORMACIÓN ACADÉMICA', tablaData11, {
    spaceBeforeTable: 7,
    ...tablaData11, // Pasa los estilos de la tabla como parte de las opciones
  });

  currentPositionY = doc.previousAutoTable.finalY + 10;
  // const directoresData = directores[0];

  const directores = solicitud.programa.plantel.directores;

  const tablaDirectores = {
    headers: ['NOMBRE (S)', 'APELLIDO PATERNO', 'APELLIDO MATERNO'],
    body: directores.map((director) => [
      director.persona.nombre,
      director.persona.apellidoPaterno,
      director.persona.apellidoMaterno,
    ]),
  };

  crearSeccionConTabla1(doc, 'DATOS DEL DIRECTOR', tablaDirectores, {
    spaceBeforeTable: 7,
    ...tablaDirectores, // Pasa los estilos de la tabla como parte de las opciones
  });

  currentPositionY = doc.previousAutoTable.finalY;

  const headers14 = [
    'CORREO INSTITUCIONAL',
    'CORREO PERSONAL',
    'TELÉFONO CELULAR',
  ];
  const tableData14 = [
    ['primercorreo@hotmail.com', 'tercercorre@gmail.com', '234131313123'],
  ];
  generateTable(doc, headers14, tableData14, currentPositionY, {
    fillColor: [172, 178, 183],
    fontSize: 12,
    textColor: [20, 20, 20],
  });

  const tablaData15 = {
    headers: ['GRADO EDUCATIVO', 'NOMBRE DE LOS ESTUDIOS'],
    body: [
      ['LICENCIATURA director', 'MEDIOS MASIVOS DE COMUNICACIÓN director'],
    ],
  };
  crearSeccionConTabla1(doc, 'FORMACIÓN ACADÉMICA', tablaData15, {
    spaceBeforeTable: 7,
    ...tablaData15, // Pasa los estilos de la tabla como parte de las opciones
  });

  currentPositionY = doc.previousAutoTable.finalY + 5; // Espacio después de la celda

  const diligencias = solicitud.programa.diligencias;

  if (diligencias && diligencias.length) {
    diligencias.forEach((diligente, index) => {
      const tablaDataDiligencia = {
        headers: ['Nombre', 'datos'],
        body: [
          ['NOMBRE COMPLETO', diligente.persona.nombre],
          ['CARGO', diligente.cargo || 'VOCAL ACADÉMICA'],
          ['NÚMERO TELEFÓNICO', diligente.telefono || '4747466124, 3787900984'],
          ['CORREO ELECTRÓNICO', diligente.correo || 'primer@gmail.com'],
          [
            'HORARIO DE ATENCIÓN',
            diligente.horario || '9 A 14 Y DE 16 A 19 HORAS',
          ],
        ],
        showHead: false,
        columnStyles: {
          0: {
            fillColor: [172, 178, 183],
          },
          1: {
            fontStyle: 'bold',
          },
        },
      };

      crearSeccionConTabla1(
        doc,
        `Diligente ${index + 1}`,
        tablaDataDiligencia,
        {
          spaceBeforeTable: 7,
          ...tablaDataDiligencia,
        }
      );
    });
  }

  currentPositionY = doc.previousAutoTable.finalY + 10;

  const tablaData17 = {
    headers: ['Nombre', 'datos'],
    body: [
      ['NOMBRE PROPUESTO No. 1', 'CENTRO EDUCATIVO EL SALTO'],
      ['NOMBRE PROPUESTO No. 2', 'CENTRO DE FORMACIÓN EL SALTO'],
      ['NOMBRE PROPUESTO No. 3', 'CENTRO DE EDUCACIÓN EL SALTO'],
    ],
    showHead: false,
    columnStyles: {
      0: {
        fillColor: [172, 178, 183],
      },
      1: {
        fontStyle: 'bold',
      },
    },
  };

  crearSeccionConTabla1(
    doc,
    'NOMBRES PROPUESTOS PARA LA INSTITUCIÓN EDUCATIVA',
    tablaData17,
    {
      spaceBeforeTable: 7,
      ...tablaData17, // Pasa los estilos de la tabla como parte de las opciones
    }
  );

  currentPositionY += 30;

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

  return;
}