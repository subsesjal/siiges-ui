import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import {
  Layout,
  Loading,
  useAuth,
  useNotification,
} from '@siiges-ui/shared';
import VIEW_STATE from '../../constants/viewState';
import UserPanel from '../UserPanel';
import { getUserPermissions } from '../../utils/permissions';
import useUserDetail from '../../hooks/useUserDetail';
import { createUser, updateUser } from '../../services/usuarios.service';

export default function UserRoutePage({ mode }) {
  const router = useRouter();
  const { session } = useAuth();
  const notify = useNotification();
  const [actionLoading, setActionLoading] = useState(false);
  const actionAbortRef = useRef(null);

  const permissions = getUserPermissions(session?.rol);
  const usuarioId = router.query?.usuarioId;
  const needsDetail = mode === VIEW_STATE.EDIT || mode === VIEW_STATE.VIEW;

  const detailState = useUserDetail({
    session,
    usuarioId,
    enabled: Boolean(needsDetail && router.isReady && usuarioId),
    initialData: null,
  });

  const closePanel = useCallback(() => {
    router.push('/usuarios');
  }, [router]);

  const executeAction = useCallback(async (requestFn, successMessage) => {
    const controller = new AbortController();
    actionAbortRef.current = controller;
    setActionLoading(true);

    try {
      await requestFn(controller.signal);
      notify.success(successMessage);
      closePanel();
      return true;
    } catch (error) {
      if (error?.name !== 'AbortError') {
        notify.error(error?.message || 'No fue posible completar la operacion.');
      }
      return false;
    } finally {
      actionAbortRef.current = null;
      setActionLoading(false);
    }
  }, [closePanel, notify]);

  const handleCreate = useCallback((payload) => executeAction(
    (signal) => createUser({ session, data: payload, signal }),
    'Usuario creado correctamente.',
  ), [executeAction, session]);

  const handleUpdate = useCallback((targetUserId, payload) => executeAction(
    (signal) => updateUser({
      session,
      usuarioId: targetUserId,
      data: payload,
      signal,
    }),
    'Usuario actualizado correctamente.',
  ), [executeAction, session]);

  useEffect(() => {
    if (detailState.error) {
      notify.error(
        detailState.error.message || 'No fue posible cargar el detalle del usuario.',
      );
    }
  }, [detailState.error, notify]);

  useEffect(() => () => {
    if (actionAbortRef.current) {
      actionAbortRef.current.abort();
    }
  }, []);

  let canRenderMode;

  if (mode === VIEW_STATE.VIEW) {
    canRenderMode = permissions.canView;
  } else if (mode === VIEW_STATE.CREATE) {
    canRenderMode = permissions.canCreate;
  } else {
    canRenderMode = permissions.canEdit;
  }
  const isSessionReady = Boolean(session?.rol);
  const isRouteLoading = !isSessionReady
    || (needsDetail && detailState.loading && !detailState.data);

  return (
    <Layout title="Usuarios V2">
      <Loading loading={isRouteLoading} />
      <Box sx={{ paddingX: 2, paddingTop: 1 }}>
        {!canRenderMode ? (
          <Box sx={{ padding: 2 }}>
            No tienes permisos para acceder a esta vista de usuarios.
          </Box>
        ) : (
          <UserPanel
            mode={mode}
            user={detailState.data}
            loading={detailState.loading}
            error={detailState.error}
            actionLoading={actionLoading}
            onClose={closePanel}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onNotify={notify}
            sessionRole={session?.rol || ''}
            sessionUserId={session?.id}
          />
        )}
      </Box>
    </Layout>
  );
}

UserRoutePage.propTypes = {
  mode: PropTypes.oneOf([VIEW_STATE.CREATE, VIEW_STATE.EDIT, VIEW_STATE.VIEW]).isRequired,
};
