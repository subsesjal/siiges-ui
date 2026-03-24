import React, { useContext, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Grid, IconButton, Typography } from '@mui/material';
import {
  DataTable, createRecord, Context, DefaultModal, ButtonsForm,
} from '@siiges-ui/shared';
import ArticleIcon from '@mui/icons-material/Article';
import {
  RuleOutlined, Send, VisibilityOutlined, DoneAll, ForwardToInbox,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';

export default function AdminTable({
  tipoDocumento,
  tipoSolicitud,
  estatus,
  programa,
  plantel,
  solicitudes,
  isAdmin,
  isCeSicyt,
}) {
  const router = useRouter();
  const { setNoti } = useContext(Context);
  const [confirmModal, setConfirmModal] = useState({ open: false, id: null, folio: null });

  const columns = [
    {
      field: 'id', headerName: 'ID', width: 70, hide: true,
    },
    { field: 'tipoDocumentoNombre', headerName: 'Tipo de documento', width: 180 },
    { field: 'tipoSolicitudFolio', headerName: 'Tipo solicitud', width: 150 },
    { field: 'folioSolicitud', headerName: 'Folio de captura', width: 150 },
    { field: 'programaNombre', headerName: 'Plan de estudios', width: 250 },
    {
      field: 'rvoe',
      headerName: 'RVOE',
      width: 180,
      valueGetter: (params) => params.row.rvoe || 'N/A',
    },
    { field: 'estatusSolicitudFolioNombre', headerName: 'Estatus', width: 250 },
    { field: 'plantelNombre', headerName: 'Plantel', width: 300 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => {
        const handleAddClick = () => {
          let accion = 'consultar';

          if (params.row.estatusSolicitudFolioId === 2) accion = 'revisar';
          if (params.row.estatusSolicitudFolioId === 3) accion = 'envio';

          sessionStorage.setItem('foliosAccion', accion);
          router.push(
            `/serviciosEscolares/solicitudesFolios/admin/${params.id}/folios`,
          );
        };

        const handleOpenConfirm = () => {
          setConfirmModal({
            open: true,
            id: params.id,
            folio: params.row.folioSolicitud,
          });
        };

        const goToConsult = () => {
          sessionStorage.setItem('foliosAccion', 'consultar');
          router.push({
            pathname: `/serviciosEscolares/solicitudesFolios/admin/${params.id}/folios`,
            query: { status: 'consultar' },
          });
        };

        const canConsult = isAdmin || isCeSicyt;
        const esDocumentoTitulo = params.row.tipoDocumentoId === 1;

        const estatusIconMap = {
          ...(isAdmin && { 1: { icon: EditIcon, tooltip: 'Editar solicitud' } }),
          2: { icon: ArticleIcon, tooltip: 'Revisar' },
          ...(esDocumentoTitulo && { 3: { icon: Send, tooltip: 'Envío a titulación' } }),
          6: { icon: DoneAll, tooltip: 'Envío completo' },
          7: { icon: RuleOutlined, tooltip: 'Envío parcial' },
        };

        const estatusConfig = estatusIconMap[params.row.estatusSolicitudFolioId] ?? null;
        const IconComponent = estatusConfig?.icon ?? null;
        const tooltipTitle = estatusConfig?.tooltip ?? '';

        if (isAdmin || isCeSicyt) {
          return (
            <>
              {canConsult && (
              <Tooltip title="Consultar" placement="top">
                <IconButton onClick={goToConsult}>
                  <VisibilityOutlined />
                </IconButton>
              </Tooltip>
              )}

              {IconComponent && (
              <Tooltip title={tooltipTitle} placement="top">
                <IconButton onClick={handleAddClick}>
                  <IconComponent />
                </IconButton>
              </Tooltip>
              )}

              {params.row.estatusSolicitudFolioId === 3 && (
              <Tooltip title="Reenviar correo" placement="top">
                <IconButton onClick={handleOpenConfirm}>
                  <ForwardToInbox />
                </IconButton>
              </Tooltip>
              )}
            </>
          );
        }
        return null;
      },
    },
  ];
  const mappedSolicitudes = solicitudes
    .filter((solicitud) => {
      if (isCeSicyt) {
        return solicitud.estatusSolicitudFolioId !== 1;
      }
      return true;
    })
    .map((solicitud) => ({
      id: solicitud.id,
      folioSolicitud: solicitud.folioSolicitud,
      programaId: solicitud.programa?.id,
      tipoDocumentoId: solicitud.tipoDocumentoId,
      tipoSolicitudFolioId: solicitud.tipoSolicitudFolioId,
      estatusSolicitudFolioId: solicitud.estatusSolicitudFolioId,
      programaNombre: solicitud.programa?.nombre || '',
      tipoSolicitudFolio: solicitud.tipoSolicitudFolio?.nombre || '',
      tipoDocumentoNombre: solicitud.tipoDocumento?.nombre || '',
      rvoe: solicitud.programa?.acuerdoRvoe || '',
      estatusSolicitudFolioNombre: solicitud.estatusSolicitudFolio?.nombre || '',
      plantelNombre: solicitud.programa?.plantel
        ? `${solicitud.programa.plantel.domicilio.calle} ${solicitud.programa.plantel.domicilio.numeroExterior}`
        : '',
    }));

  const filteredSolicitudes = mappedSolicitudes.filter((solicitud) => {
    const matchesTipoDocumento = !tipoDocumento || solicitud.tipoDocumentoId === tipoDocumento;
    const matchesTipoSolicitud = !tipoSolicitud || solicitud.tipoSolicitudFolioId === tipoSolicitud;
    const matchesEstatus = !estatus.length || estatus.includes(solicitud.estatusSolicitudFolioId);
    const matchesPrograma = !programa || solicitud.programaId === programa;
    const matchesPlantel = !plantel || solicitud.plantelNombre === plantel;

    // eslint-disable-next-line max-len
    return matchesTipoDocumento && matchesTipoSolicitud && matchesEstatus && matchesPrograma && matchesPlantel;
  });

  const handleResendEmail = async () => {
    const { id: solicitudId } = confirmModal;
    setConfirmModal({ open: false, id: null, folio: null });
    setNoti({
      open: true,
      message: 'Enviando correo, por favor espere...',
      type: 'info',
    });
    try {
      const response = await createRecord({
        data: { tipoNotificacion: 'foliosAsignados' },
        endpoint: `/solicitudesFolios/${solicitudId}/envioNotificacion`,
      });
      if (response.statusCode === 200 || response.statusCode === 201) {
        setNoti({
          open: true,
          message: '¡Correo reenviado correctamente!',
          type: 'success',
        });
      } else {
        setNoti({
          open: true,
          message: response.message || '¡Error al reenviar el correo!',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: `¡Error al reenviar el correo!: ${error.message}`,
        type: 'error',
      });
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DataTable title="Solicitudes de Folios" rows={filteredSolicitudes} columns={columns} />
        </Grid>
      </Grid>

      <DefaultModal
        title="Reenviar notificación"
        open={confirmModal.open}
        setOpen={(val) => setConfirmModal((prev) => ({ ...prev, open: val }))}
      >
        <Typography>
          ¿Estás seguro de reenviar la notificación de folios asignados de la solicitud
          {' '}
          <strong>{confirmModal.folio}</strong>
          ?
        </Typography>
        <ButtonsForm
          cancel={() => setConfirmModal({ open: false, id: null, folio: null })}
          confirm={handleResendEmail}
          confirmText="Confirmar"
        />
      </DefaultModal>
    </>
  );
}

AdminTable.propTypes = {
  tipoDocumento: PropTypes.string,
  tipoSolicitud: PropTypes.string,
  estatus: PropTypes.arrayOf(PropTypes.string),
  programa: PropTypes.string,
  plantel: PropTypes.string,
  solicitudes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      folioSolicitud: PropTypes.string,
      programaNombre: PropTypes.string,
      estatusSolicitudFolioNombre: PropTypes.string,
      plantelNombre: PropTypes.string,
    }),
  ).isRequired,
  isAdmin: PropTypes.bool,
  isCeSicyt: PropTypes.bool,
};

AdminTable.defaultProps = {
  tipoDocumento: null,
  tipoSolicitud: null,
  estatus: [],
  programa: null,
  plantel: null,
  isAdmin: false,
  isCeSicyt: false,
};
