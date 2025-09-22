import Tooltip from '@mui/material/Tooltip';
import { IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import {
  ButtonsForm, Context, DefaultModal, deleteRecord,
} from '@siiges-ui/shared';
import CiclosEscolaresModal from './CiclosEscolaresModal';

export default function ButtonsCiclosEscolares({ row, handleSuccess }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { setNoti } = useContext(Context);

  const handleDelete = async () => {
    const response = await deleteRecord({ endpoint: `/ciclosEscolares/${row.id}` });

    if (response.statusCode === 200) {
      handleSuccess();
    } else {
      setNoti({
        open: true,
        message: response.errorMessage || 'Error al eliminar el ciclo escolar',
        type: 'error',
      });
    }

    setOpenDelete(false);
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        {row && (
          <>
            <Tooltip title="Editar" placement="top">
              <IconButton
                aria-label="Ciclos Escolares Editar"
                onClick={() => setOpenEdit(true)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Eliminar" placement="top">
              <IconButton
                aria-label="Ciclos Escolares Eliminar"
                onClick={() => setOpenDelete(true)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>

      <CiclosEscolaresModal
        open={openEdit}
        setOpen={setOpenEdit}
        onSuccess={handleSuccess}
        type="edit"
        data={row}
      />

      <DefaultModal
        open={openDelete}
        setOpen={setOpenDelete}
        title="Confirmar Eliminación"
      >
        <p>¿Estás seguro de que deseas eliminar este ciclo escolar?</p>
        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
          <ButtonsForm confirm={handleDelete} cancel={() => setOpenDelete(false)} confirmText="Eliminar" />
        </Stack>
      </DefaultModal>
    </>
  );
}

ButtonsCiclosEscolares.propTypes = {
  row: PropTypes.number.isRequired,
  handleSuccess: PropTypes.func.isRequired,
};
