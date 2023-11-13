import { Grid } from '@mui/material';
import { Button, DataTable } from '@siiges-ui/shared';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import columnsCiclosEscolares from '../../../Tables/ciclosEscolaresTable';
import CiclosEscolaresModal from '../../utils/CiclosEscolaresModal';
import getCiclosEscolares from '../../utils/getCiclosEscolares';

export default function CiclosEscolares() {
  const [open, setOpen] = useState(false);
  const [ciclos, setCiclos] = useState([]);

  const router = useRouter();
  const { id: programaId } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ciclosEscolaresData = await getCiclosEscolares(programaId);
        setCiclos(ciclosEscolaresData);
      } catch (error) {
        console.error('Error fetching ciclos escolares:', error);
      }
    };

    fetchData();
  }, [open, setOpen]);

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
          rows={ciclos || []}
          columns={columnsCiclosEscolares}
          title="Tabla de Ciclos escolares"
        />
      </Grid>
      <CiclosEscolaresModal
        open={open}
        setOpen={setOpen}
        type="new"
        data={{ programaId }}
      />
    </Grid>
  );
}
