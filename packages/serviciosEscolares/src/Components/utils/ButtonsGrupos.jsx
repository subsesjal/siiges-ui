import Tooltip from '@mui/material/Tooltip';
import { IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import {
  ButtonsForm, Context, DefaultModal, deleteRecord,
} from '@siiges-ui/shared';
import GruposModal from './GruposModal';

export default function ButtonsGrupos({ id, handleSuccess }) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { setLoading, setNoti, session } = useContext(Context);
  const params = {
    cicloEscolarId: id.cicloEscolarId,
    gradoId: id.gradoId,
    gradoNombre: id.gradoNombre,
  };

  const handleDelete = async () => {
    setLoading(true);
    const endpoint = `/grupos/${id.id}`;

    const response = await deleteRecord({ endpoint });

    if (response.statusCode === 200) {
      setNoti({
        open: true,
        message: '¡Grupo eliminado correctamente!',
        type: 'success',
      });
      setOpenDelete(false);
      handleSuccess();
    } else {
      setNoti({
        open: true,
        message: response.errorMessage || '¡Error al eliminar el grupo!',
        type: 'error',
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        {id && (
          <>
            <Tooltip title="Editar" placement="top">
              <IconButton
                aria-label="Ciclos Escolares Editar"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            {session.rol === 'admin' && (
            <Tooltip title="Eliminar" placement="top">
              <IconButton
                aria-label="Ciclos Escolares Eliminar"
                onClick={() => {
                  setOpenDelete(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            )}
          </>
        )}
      </Stack>
      <GruposModal
        open={open}
        setOpen={setOpen}
        type="edit"
        data={id}
        params={params}
        onSuccess={handleSuccess}
      />
      <DefaultModal title="Eliminar grupo" open={openDelete} setOpen={setOpenDelete}>
        ¿Esta seguro de eliminar este grupo?
        <ButtonsForm confirm={handleDelete} cancel={() => { setOpenDelete(false); }} />
      </DefaultModal>
    </>
  );
}

ButtonsGrupos.propTypes = {
  id: PropTypes.number.isRequired,
  handleSuccess: PropTypes.func.isRequired,
};
