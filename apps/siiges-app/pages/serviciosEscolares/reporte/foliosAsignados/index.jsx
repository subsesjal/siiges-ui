import { Layout } from '@siiges-ui/shared';
import React, { useState } from 'react';
import { FormFoliosAsignados } from '@siiges-ui/serviciosescolares';
import { Divider } from '@mui/material';
import FoliosTable from '@siiges-ui/serviciosescolares/src/Components/FoliosAsignados/FoliosTable';

export default function Reporte() {
  const [folios, setFolios] = useState([]);

  const handleFirmaSuccess = (id) => {
    setFolios((prevFolios) => prevFolios.map((folio) => (folio.id === id
      ? { ...folio, Estatus_Firmado: 'exitoso' }
      : folio)));
  };

  return (
    <Layout title="Reporte de Folios Asignados">
      <FormFoliosAsignados setFolios={setFolios} folios={folios} />
      <Divider sx={{ marginTop: 2 }} />
      {folios.length > 0 && (
        <FoliosTable
          folios={folios}
          onFirmaSuccess={handleFirmaSuccess}
        />
      )}
    </Layout>
  );
}
