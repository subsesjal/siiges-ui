import { Grid } from '@mui/material';
import { DataTable, getData, useUI } from '@siiges-ui/shared';
import React, { useState, useEffect } from 'react';
import getColumnsCatalogoCiclosEscolares from '../../../Tables/catalogoCiclosEscolares';
import ModalCatalogoCicloEscolar from '../../utils/ModalCatalogoCicloEscolar';

export default function CatalogoCiclosEscolares() {
  const [open, setOpen] = useState(false);
  const [ciclos, setCiclos] = useState([]);
  const [fetchCiclos, setFetchCiclos] = useState(false);
  const { setNoti } = useUI();

  useEffect(() => {
    const fetchData = async () => {
      const { statusCode, data, errorMessage } = await getData({
        endpoint: '/ciclosEscolares/catalogo',
        query: '?all=true',
      });

      if (statusCode !== 200) {
        setNoti({
          open: true,
          message: errorMessage || 'Error al consultar el catálogo de ciclos escolares.',
          type: 'error',
        });
        return;
      }

      setCiclos(data || []);
    };

    fetchData();
  }, [fetchCiclos]);

  const handleSuccess = () => setFetchCiclos((prev) => !prev);

  const columnsCatalogoCiclosEscolares = getColumnsCatalogoCiclosEscolares({
    onSuccess: handleSuccess,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataTable
          title="Catálogo de Ciclos Escolares"
          columns={columnsCatalogoCiclosEscolares}
          rows={ciclos || []}
          buttonAdd
          buttonText="Agregar Ciclo Escolar"
          buttonType="add"
          buttonClick={() => setOpen(true)}
          initialState={{
            sorting: { sortModel: [{ field: 'id', sort: 'asc' }] },
          }}
        />
      </Grid>
      <ModalCatalogoCicloEscolar
        open={open}
        setOpen={setOpen}
        onSuccess={handleSuccess}
      />
    </Grid>
  );
}
