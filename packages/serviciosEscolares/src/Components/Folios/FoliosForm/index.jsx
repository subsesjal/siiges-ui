import React, { useState, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Select, Context } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import {
  getInstituciones,
  getPlantelesByInstitucion,
  getProgramas,
} from '@siiges-ui/instituciones';

const mockData = [
  {
    id: 1,
    name: 'John Doe',
    folio: '12345',
    date: '2024-06-01',
  },
  {
    id: 2,
    name: 'Jane Smith',
    folio: '67890',
    date: '2024-06-02',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    folio: '54321',
    date: '2024-06-03',
  },
];

export default function FoliosForm({
  setTipoSolicitud,
  setTipoDocumento,
  setSolicitudes,
  setPrograma,
  setLoading,
}) {
  const { instituciones } = getInstituciones({
    esNombreAutorizado: true,
    tipoInstitucionId: 1,
    setLoading,
  });

  const { setNoti, session } = useContext(Context);

  const [selectedInstitucion, setSelectedInstitucion] = useState('');
  const [planteles, setPlanteles] = useState([]);
  const [selectedPlantel, setSelectedPlantel] = useState('');
  const [programas, setProgramas] = useState([]);
  const [selectedPrograma, setSelectedPrograma] = useState('');
  const isRepresentante = session.rol === 'representante';

  // eslint-disable-next-line no-unused-vars
  const fetchFolios = (programaId) => {
    setSolicitudes(mockData);
  };

  useEffect(() => {
    if (isRepresentante && instituciones?.length) {
      const findIndexIntitucion = instituciones.findIndex(
        ({ usuarioId }) => usuarioId === session.id,
      );
      setSelectedInstitucion(instituciones[findIndexIntitucion].id);
    }
  }, [isRepresentante, instituciones]);

  const handleProgramaChange = (event) => {
    const programaId = event.target.value;
    setPrograma(programaId);
    setSelectedPrograma(programaId);
    if (programaId) {
      fetchFolios(programaId);
    } else {
      setSolicitudes([]);
    }
  };

  const fetchProgramas = (plantelId) => {
    getProgramas(plantelId, (error, data) => {
      if (error) {
        setNoti({
          open: true,
          message: `Error al obtener programas: ${error.message}`,
          type: 'error',
        });
        setProgramas([]);
      } else {
        const transformedProgramas = data.programas.map((programa) => ({
          id: programa.id,
          nombre: programa.nombre,
        }));
        setProgramas(transformedProgramas);
      }
    });
  };

  const handlePlantelChange = (event) => {
    const plantelId = event.target.value;
    setSelectedPlantel(plantelId);
    if (plantelId) {
      fetchProgramas(plantelId);
    } else {
      setProgramas([]);
    }
  };

  const handleSolicitudChange = (event) => {
    const tipoSolicitud = event.target.value;
    setTipoSolicitud(tipoSolicitud);
  };

  const handleDocumentoChange = (event) => {
    const tipoDocumento = event.target.value;
    setTipoDocumento(tipoDocumento);
  };

  const fetchPlanteles = (institucionId) => {
    getPlantelesByInstitucion(institucionId, (error, data) => {
      if (error) {
        setNoti({
          open: true,
          message: `Error al obtener planteles: ${error.message}`,
          type: 'error',
        });
        setPlanteles([]);
      } else {
        const transformedPlanteles = data.planteles.map((plantel) => ({
          id: plantel.id,
          nombre: `${plantel.domicilio.calle} ${plantel.domicilio.numeroExterior}`,
        }));
        setPlanteles(transformedPlanteles);
      }
    });
  };

  useEffect(() => {
    if (selectedInstitucion) {
      fetchPlanteles(selectedInstitucion);
    } else setPlanteles([]);
  }, [selectedInstitucion]);

  const documentos = [
    { id: 1, nombre: 'Titulos' },
    { id: 2, nombre: 'Certificados' },
  ];

  const solicitudes = [
    { id: 1, nombre: 'Total' },
    { id: 2, nombre: 'Parcial' },
    { id: 3, nombre: 'Duplicado' },
  ];

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4}>
        <Select
          title="Instituciones"
          name="instituciones"
          value={selectedInstitucion}
          options={instituciones || []}
          onchange={(event) => setSelectedInstitucion(event.target.value)}
          disabled={isRepresentante}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Planteles"
          name="planteles"
          value={selectedPlantel}
          options={planteles || []}
          onchange={handlePlantelChange}
          disabled={!selectedInstitucion}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Programas"
          name="programas"
          value={selectedPrograma}
          options={programas || []}
          onchange={handleProgramaChange}
          disabled={!selectedPlantel}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Tipo de documento"
          name="documento"
          options={documentos || []}
          onchange={handleDocumentoChange}
          disabled={!selectedPrograma}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Tipo de solicitud"
          name="solicitud"
          options={solicitudes || []}
          onchange={handleSolicitudChange}
          disabled={!selectedPrograma}
        />
      </Grid>
    </Grid>
  );
}

FoliosForm.propTypes = {
  setTipoSolicitud: PropTypes.func.isRequired,
  setTipoDocumento: PropTypes.func.isRequired,
  setSolicitudes: PropTypes.func.isRequired,
  setPrograma: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
