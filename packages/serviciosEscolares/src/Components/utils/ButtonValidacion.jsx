import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import {
  IconButton, Stack, Menu, MenuItem,
} from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { getData, updateRecord, useUI } from '@siiges-ui/shared';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PropTypes from 'prop-types';
import Link from 'next/link';

const SITUACION_DOCUMENTO_OPTIONS = [
  { id: 1, nombre: 'Auténtico' },
  { id: 2, nombre: 'Apócrifo' },
  { id: 3, nombre: 'En trámite' },
  { id: 4, nombre: 'Pendiente' },
];

export default function ButtonsValidacion({
  id, url, programa, institucion, situacionValidacionId, onUpdated,
}) {
  const { setNoti, setLoading } = useUI();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const linkUrl = `${url}?id=${id}&programa=${programa}&institucion=${institucion}`;

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectSituacion = async (situacionId) => {
    handleCloseMenu();

    if (situacionId === situacionValidacionId) return;

    setLoading(true);
    try {
      const endpoint = `/alumnos/${id}/validaciones`;
      const data = { situacionValidacionId: situacionId };
      const response = await updateRecord({ data, endpoint });

      if (response && (response.statusCode === 200 || response.statusCode === 201)) {
        setNoti({
          open: true,
          message: '¡Situación de documento actualizada correctamente!',
          type: 'success',
        });
        const selectedOption = SITUACION_DOCUMENTO_OPTIONS.find((opt) => opt.id === situacionId);
        if (onUpdated) onUpdated(id, situacionId, selectedOption?.nombre);
      } else {
        throw new Error('¡La API no obtuvo éxito!');
      }
    } catch (error) {
      setNoti({
        open: true,
        message: error.message || 'Error al actualizar la situación del documento',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerarPDF = async (alumnoId) => {
    setLoading(true);
    try {
      const response = await getData({
        endpoint: `/files?tipoEntidad=ALUMNO&entidadId=${alumnoId}&tipoDocumento=ARCHIVO_VALIDACION_ALUMNO`,
      });
      if (response.errorMessage) {
        setNoti({ open: true, message: response.errorMessage, type: 'error' });
        return;
      }
      if (response.data?.url) {
        window.open(response.data.url, '_blank');
      } else if (typeof response.data === 'string') {
        window.open(response.data, '_blank');
      } else {
        setNoti({ open: true, message: 'No se pudo obtener el PDF', type: 'error' });
      }
    } catch (error) {
      setNoti({ open: true, message: error.message || 'Error al generar el PDF', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      {id && (
        <Link href={linkUrl} passHref>
          <Tooltip title="Validar Alumno" placement="top">
            <IconButton aria-label="Consultar Alumno" component="a">
              <VisibilityOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Link>
      )}
      {id && (
        <>
          <Tooltip title="Situación de documento" placement="top">
            <IconButton
              aria-label="Editar situación de documento"
              onClick={handleOpenMenu}
            >
              <PlaylistAddCheckIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleCloseMenu}
          >
            {SITUACION_DOCUMENTO_OPTIONS.map((option) => (
              <MenuItem
                key={option.id}
                selected={option.id === situacionValidacionId}
                onClick={() => handleSelectSituacion(option.id)}
              >
                {option.nombre}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
      <Tooltip title="Ver PDF" placement="top">
        <IconButton
          onClick={() => handleGenerarPDF(id)}
          color="primary"
        >
          <PictureAsPdfIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

ButtonsValidacion.propTypes = {
  id: PropTypes.number.isRequired,
  programa: PropTypes.number.isRequired,
  institucion: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  situacionValidacionId: PropTypes.number,
  onUpdated: PropTypes.func,
};

ButtonsValidacion.defaultProps = {
  situacionValidacionId: null,
  onUpdated: null,
};
