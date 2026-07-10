import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Box, Grid, Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import {
  ButtonSimple,
  DefaultModal,
  Layout,
  Loading,
  useAuth,
  useNotification,
} from '@siiges-ui/shared';
import UsersTable from '../UsersTable';
import UsersSkeleton from '../UsersSkeleton';
import UsersEmptyState from '../UsersEmptyState';
import UsersErrorState from '../UsersErrorState';
import useUsersData from '../../hooks/useUsersData';
import { getUserPermissions } from '../../utils/permissions';
import { deleteUser } from '../../services/usuarios.service';

export default function UsersPage() {
  const router = useRouter();
  const { session } = useAuth();
  const notify = useNotification();
  const [refreshKey, setRefreshKey] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const deleteAbortRef = useRef(null);

  const permissions = useMemo(() => getUserPermissions(session?.rol), [session?.rol]);
  const listState = useUsersData({ session, refreshKey });

  const openCreate = useCallback(() => {
    router.push('/usuarios/crear');
  }, [router]);

  const openEdit = useCallback((user) => {
    router.push(`/usuarios/editar/${user.id}`);
  }, [router]);

  const openView = useCallback((user) => {
    router.push(`/usuarios/consultar/${user.id}`);
  }, [router]);

  const reloadUsers = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const openDelete = useCallback((user) => {
    setDeleteTarget(user);
  }, []);

  const closeDelete = useCallback(() => {
    if (deleteLoading) return;
    setDeleteTarget(null);
  }, [deleteLoading]);

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget?.id || deleteLoading) {
      return;
    }

    const controller = new AbortController();
    deleteAbortRef.current = controller;
    setDeleteLoading(true);

    try {
      await deleteUser({
        session,
        usuarioId: deleteTarget.id,
        signal: controller.signal,
      });
      notify.success('Usuario eliminado correctamente.');
      setDeleteTarget(null);
      reloadUsers();
    } catch (error) {
      if (error?.name !== 'AbortError') {
        notify.error(error?.message || 'No fue posible eliminar el usuario.');
      }
    } finally {
      deleteAbortRef.current = null;
      setDeleteLoading(false);
    }
  }, [deleteLoading, deleteTarget?.id, notify, reloadUsers, session]);

  useEffect(() => {
    if (listState.error) {
      notify.error(
        listState.error.message || 'No fue posible cargar la lista de usuarios.',
      );
    }
  }, [listState.error, notify]);

  useEffect(() => () => {
    if (deleteAbortRef.current) {
      deleteAbortRef.current.abort();
    }
  }, []);

  const { canCreate } = permissions;
  const { canEdit } = permissions;
  const { canDelete } = permissions;
  const isSessionReady = Boolean(session?.rol);
  const isRouteLoading = !isSessionReady || listState.loading;
  const hasError = Boolean(listState.error);
  const isEmpty = !listState.loading && !hasError && listState.data.length === 0;

  const errorMessage = useMemo(
    () => listState.error?.message || 'No fue posible cargar los usuarios.',
    [listState.error],
  );

  let content = null;

  if (!isSessionReady) {
    content = <UsersSkeleton />;
  } else if (!permissions.canView) {
    content = <UsersErrorState message="No tienes permisos para ver usuarios." />;
  } else {
    content = (
      <>
        {listState.loading && <UsersSkeleton />}
        {hasError && (
          <UsersErrorState message={errorMessage} onRetry={reloadUsers} />
        )}
        {isEmpty && (
          <UsersEmptyState canCreate={canCreate} onCreate={openCreate} />
        )}
        {!listState.loading && !hasError && listState.data.length > 0 && (
          <UsersTable
            data={listState.data}
            loading={listState.loading}
            canEdit={canEdit}
            canDelete={canDelete}
            canCreate={canCreate}
            onView={openView}
            onEdit={openEdit}
            onDelete={openDelete}
            onCreate={openCreate}
            onReload={reloadUsers}
          />
        )}
      </>
    );
  }

  return (
    <Layout title="Usuarios">
      <Loading loading={isRouteLoading} />
      <Box sx={{ paddingX: 2, paddingTop: 1 }}>
        {content}
      </Box>
      <DefaultModal
        open={Boolean(deleteTarget)}
        setOpen={closeDelete}
        title="Eliminar usuario"
      >
        <Typography>
          ¿Desea eliminar el usuario
          {' '}
          {deleteTarget?.usuario}
          ?
        </Typography>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <ButtonSimple
              text="Cancelar"
              design="cancel"
              onClick={closeDelete}
            />
          </Grid>
          <Grid item>
            <ButtonSimple
              text="Confirmar"
              disabled={deleteLoading}
              onClick={confirmDelete}
            />
          </Grid>
        </Grid>
      </DefaultModal>
    </Layout>
  );
}
