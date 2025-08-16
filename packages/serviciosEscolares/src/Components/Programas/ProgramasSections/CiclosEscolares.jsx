import { Grid } from '@mui/material';
import { Button, DataTable, Context } from '@siiges-ui/shared';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import getColumnsCiclosEscolares from '../../../Tables/ciclosEscolaresTable';
import CiclosEscolaresModal from '../../utils/CiclosEscolaresModal';
import getCiclosEscolares from '../../utils/getCiclosEscolares';

export default function CiclosEscolares() {
  const [open, setOpen] = useState(false);
  const [ciclos, setCiclos] = useState([]);
  const [fetchCiclos, setFetchCiclos] = useState(false);
  const { setNoti } = useContext(Context);

  const router = useRouter();
  const { id: programaId } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ciclosEscolaresData = await getCiclosEscolares(programaId);
        const ciclosFiltered = ciclosEscolaresData;

        setCiclos(ciclosFiltered);
      } catch (error) {
        setNoti({
          open: true,
          message: 'Error al consultar los ciclos escolares',
          type: 'error',
        });
      }
    };

    if (programaId) fetchData();
  }, [fetchCiclos]);

  const handleSuccess = () => {
    setOpen(false);
    setFetchCiclos((prev) => !prev); // triggers table refresh
    setNoti({
      open: true,
      message: 'Ciclo escolar guardado exitosamente.',
      type: 'success',
    });
  };

  const columnsCiclosEscolares = getColumnsCiclosEscolares({ handleSuccess });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          text="Agregar Ciclo Escolar"
          type="add"
          onClick={() => setOpen(true)}
        />
      </Grid>
      <Grid item xs={12}>
        <DataTable
          title="Tabla de Ciclos Escolares"
          columns={columnsCiclosEscolares}
          rows={ciclos || []}
          initialState={{
            sorting: { sortModel: [{ field: 'nombre', sort: 'asc' }] },
          }}
        />
      </Grid>
      <CiclosEscolaresModal
        open={open}
        setOpen={setOpen}
        type="new"
        data={{ programaId }}
        onSuccess={handleSuccess}
      />
    </Grid>
  );
}
