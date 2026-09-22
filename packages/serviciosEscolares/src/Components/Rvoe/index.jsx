import React, { useState, useEffect, useMemo } from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { DataTable, Select, useUI } from '@siiges-ui/shared';
import { useRouter } from 'next/router';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

const ESTADO_ID_JALISCO = 14;

const columns = [
  {
    field: 'nombrePrograma', headerName: 'Nombre programa', name: 'Nombre programa', width: 500,
  },
  {
    field: 'acuerdoRvoe', headerName: 'RVOE', name: 'RVOE', width: 150,
  },
  {
    field: 'fechaCreacion', headerName: 'Fecha de creación', name: 'Fecha de creación', width: 160,
  },
  {
    field: 'municipio', headerName: 'Municipio', name: 'Municipio', width: 150,
  },
  {
    field: 'vigencia', headerName: 'Fecha de vigencia', name: 'Vigencia', width: 160,
  },
];

export default function ConsultRvoe() {
  // Estados de selección
  const [selectedMunicipio, setSelectedMunicipio] = useState('');
  const [selectedInstitucion, setSelectedInstitucion] = useState('');
  const [selectedPlantel, setSelectedPlantel] = useState('');

  // Estados de opciones
  const [municipios, setMunicipios] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [planteles, setPlanteles] = useState([]);
  const [rvoes, setRvoes] = useState([]);

  // Estados de carga
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);
  const [loadingInstituciones, setLoadingInstituciones] = useState(false);
  const [loadingPlanteles, setLoadingPlanteles] = useState(false);
  const [loadingRvoes, setLoadingRvoes] = useState(false);
  const { setNoti } = useUI();

  // 1. Municipios (siempre activo, se cargan al montar)
  useEffect(() => {
    const fetchMunicipios = async () => {
      setLoadingMunicipios(true);
      try {
        const response = await fetch(
          `${domain}/api/v1/public/municipios/?estadoId=${ESTADO_ID_JALISCO}`,
          {
            headers: {
              api_key: apiKey,
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        setMunicipios(
          data.data?.filter(
            (municipio) => municipio.estadoId === ESTADO_ID_JALISCO,
          ) || [],
        );
      } catch (error) {
        console.error('¡Error al buscar municipios!:', error);
      } finally {
        setLoadingMunicipios(false);
      }
    };

    fetchMunicipios();
  }, []);

  // 2. Instituciones por municipio
  useEffect(() => {
    const fetchInstituciones = async () => {
      if (!selectedMunicipio) {
        setInstituciones([]);
        return;
      }

      setLoadingInstituciones(true);
      try {
        const response = await fetch(
          `${domain}/api/v1/public/instituciones?municipioId=${selectedMunicipio}`,
          {
            headers: {
              api_key: apiKey,
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        setInstituciones(data.data || []);
      } catch (error) {
        console.error('¡Error al buscar instituciones!:', error);
      } finally {
        setLoadingInstituciones(false);
      }
    };

    fetchInstituciones();
  }, [selectedMunicipio]);

  // 3. Planteles por institución
  useEffect(() => {
    const fetchPlanteles = async () => {
      if (!selectedInstitucion) {
        setPlanteles([]);
        return;
      }

      setLoadingPlanteles(true);
      try {
        const response = await fetch(
          `${domain}/api/v1/public/instituciones/${selectedInstitucion}/planteles`,
          {
            headers: {
              api_key: apiKey,
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        const mappedPlanteles = (data.data || []).map((plantel) => ({
          id: plantel.id,
          nombre: `${plantel.claveCentroTrabajo} - ${plantel.domicilio?.calle ?? ''} #${plantel.domicilio?.numeroExterior ?? ''}`,
        }));
        setPlanteles(mappedPlanteles);
      } catch (error) {
        console.error('¡Error al buscar planteles!:', error);
      } finally {
        setLoadingPlanteles(false);
      }
    };

    fetchPlanteles();
  }, [selectedInstitucion]);

  // 4. RVOEs por plantel
  useEffect(() => {
    const fetchRvoes = async () => {
      if (!selectedPlantel) {
        setRvoes([]);
        return;
      }

      setLoadingRvoes(true);
      try {
        const response = await fetch(
          `${domain}/api/v1/public/rvoes?plantelId=${selectedPlantel}`,
          {
            headers: {
              api_key: apiKey,
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        const rvoesData = data.data || [];
        setRvoes(rvoesData);

        if (rvoesData.length === 0) {
          setNoti({
            open: true,
            type: 'error',
            message: 'No se encontraron RVOEs para el plantel seleccionado.',
          });
        }
      } catch (error) {
        console.error('¡Error al buscar RVOEs!:', error);
      } finally {
        setLoadingRvoes(false);
      }
    };

    fetchRvoes();
  }, [selectedPlantel]);

  // Handlers para la selección en cascada
  const handleMunicipioChange = (event) => {
    const value = event?.target ? event.target.value : event;
    setSelectedMunicipio(value);
    setSelectedInstitucion('');
    setSelectedPlantel('');
  };

  const handleInstitucionChange = (event) => {
    const value = event?.target ? event.target.value : event;
    setSelectedInstitucion(value);
    setSelectedPlantel('');
  };

  const handlePlantelChange = (event) => {
    const value = event?.target ? event.target.value : event;
    setSelectedPlantel(value);
  };

  const isAllSelected = Boolean(selectedMunicipio && selectedInstitucion && selectedPlantel);

  const tableRows = useMemo(() => {
    if (!isAllSelected) return [];
    return rvoes;
  }, [rvoes, isAllSelected]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Select
          title="Municipios"
          options={municipios}
          name="municipio"
          value={selectedMunicipio}
          onChange={handleMunicipioChange}
          loading={loadingMunicipios}
        />
      </Grid>
      <Grid item xs={6}>
        <Select
          title="Institución"
          options={instituciones}
          name="institucion"
          value={selectedInstitucion}
          onChange={handleInstitucionChange}
          disabled={!selectedMunicipio}
          loading={loadingInstituciones}
        />
      </Grid>
      <Grid item xs={12}>
        <Select
          title="Plantel"
          options={planteles}
          name="plantel"
          value={selectedPlantel}
          onChange={handlePlantelChange}
          disabled={!selectedInstitucion}
          loading={loadingPlanteles}
        />
      </Grid>
      <Grid item xs={12}>
        {loadingRvoes ? (
          <CircularProgress size={24} />
        ) : (
          <DataTable
            title="Lista de RVOES"
            rows={tableRows}
            columns={columns}
          />
        )}
      </Grid>
    </Grid>
  );
}
