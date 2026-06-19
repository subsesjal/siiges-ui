import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import {
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

export default function UsersPage() {
  const router = useRouter();
  const { session } = useAuth();
  const notify = useNotification();
  const [refreshKey, setRefreshKey] = useState(0);

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

  useEffect(() => {
    if (listState.error) {
      notify.error(
        listState.error.message || 'No fue posible cargar la lista de usuarios.',
      );
    }
  }, [listState.error, notify]);

  const { canCreate } = permissions;
  const { canEdit } = permissions;
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
            canCreate={canCreate}
            onView={openView}
            onEdit={openEdit}
            onCreate={openCreate}
            onReload={reloadUsers}
          />
        )}
      </>
    );
  }

  return (
    <Layout title="Usuarios V2">
      <Loading loading={isRouteLoading} />
      <Box sx={{ paddingX: 2, paddingTop: 1 }}>
        {content}
      </Box>
    </Layout>
  );
}
