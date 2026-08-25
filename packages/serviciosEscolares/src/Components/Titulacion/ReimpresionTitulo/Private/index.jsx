import { Grid, IconButton, Tooltip } from '@mui/material';
import {
  ButtonsModal, DataTable, DefaultModal, getData,
} from '@siiges-ui/shared';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import PrintIcon from '@mui/icons-material/Print';
import React, { useEffect, useState } from 'react';

const domain = process.env.NEXT_PUBLIC_URL;

const MOCK_SOLICITUDES = [
  {
    id: 1,
    documentoUrl: '/documentos/solicitud-1.pdf',
    interesado: {
      persona: {
        nombre: 'Juan',
        apellidoPaterno: 'García',
        apellidoMaterno: 'López',
        curp: 'GALJ900101HJCRPN01',
      },
      institucion: 'Universidad de Guadalajara',
      carrera: 'Ingeniería en Sistemas Computacionales',
      correo: 'juan.garcia@email.com',
      telefono: '3312345678',
    },
  },
  {
    id: 2,
    documentoUrl: null,
    interesado: {
      persona: {
        nombre: 'María',
        apellidoPaterno: 'Hernández',
        apellidoMaterno: '',
        curp: 'HEM90202MJCRPN02',
      },
      institucion: 'Instituto Tecnológico de Jalisco',
      carrera: 'Licenciatura en Administración',
      correo: 'maria.hernandez@email.com',
      telefono: '3398765432',
    },
  },
];

export default function ReimpresionTituloPrivate() {
  const [solicitudes, setSolicitudes] = useState(MOCK_SOLICITUDES);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      setLoading(true);
      try {
        // TODO: reemplazar con el endpoint real cuando esté disponible
        const response = await getData({ endpoint: '/reimpresiones-titulo' });
        if (response.statusCode === 200) {
          setSolicitudes(response.data);
        }
      } catch (error) {
        console.error('Error al obtener solicitudes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  const handleOpenModal = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedSolicitud(null);
  };

  const handleConfirm = () => {
    // TODO: llamar endpoint de confirmación de reimpresión con selectedSolicitud.id
    handleCloseModal();
  };

  const getNombreCompleto = (row) => [
    row.interesado?.persona?.nombre,
    row.interesado?.persona?.apellidoPaterno,
    row.interesado?.persona?.apellidoMaterno,
  ].filter(Boolean).join(' ');

  const columns = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 2,
      valueGetter: ({ row }) => getNombreCompleto(row),
    },
    {
      field: 'curp',
      headerName: 'CURP',
      flex: 1,
      valueGetter: ({ row }) => row.interesado?.persona?.curp || '-',
    },
    {
      field: 'institucion',
      headerName: 'Institución',
      flex: 2,
      valueGetter: ({ row }) => row.interesado?.institucion || '-',
    },
    {
      field: 'carrera',
      headerName: 'Carrera',
      flex: 2,
      valueGetter: ({ row }) => row.interesado?.carrera || '-',
    },
    {
      field: 'correo',
      headerName: 'Correo',
      flex: 2,
      valueGetter: ({ row }) => row.interesado?.correo || '-',
    },
    {
      field: 'telefono',
      headerName: 'Teléfono',
      flex: 1,
      valueGetter: ({ row }) => row.interesado?.telefono || '-',
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <>
          <Tooltip title="Ver documento">
            <span>
              <IconButton
                disabled={!row.documentoUrl}
                onClick={() => window.open(`${domain}${row.documentoUrl}`, '_blank', 'noopener,noreferrer')}
              >
                <FileOpenIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Confirmar reimpresión">
            <IconButton onClick={() => handleOpenModal(row)}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataTable
          title="Reimpresión de Certificado de Estudios"
          rows={solicitudes}
          columns={columns}
          loading={loading}
        />
      </Grid>
      <DefaultModal
        title="Confirmar Reimpresión de Certificado de Estudios"
        open={open}
        onClose={handleCloseModal}
      >
        {selectedSolicitud && (
          <p>
            ¿Seguro que deseas reimprimir el certificado de estudios de
            {' '}
            <strong>{getNombreCompleto(selectedSolicitud)}</strong>
            ?
          </p>
        )}
        <ButtonsModal cancel={handleCloseModal} confirm={handleConfirm} />
      </DefaultModal>
    </Grid>
  );
}
