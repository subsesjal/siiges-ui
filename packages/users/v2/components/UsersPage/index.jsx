import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { Layout } from '@siiges-ui/shared';
import VIEW_STATE from '../../constants/viewState';
import useUsersController from '../../hooks/useUsersController';
import UsersToolbar from '../UsersToolbar';
import UsersTable from '../UsersTable';
import UsersSkeleton from '../UsersSkeleton';
import UsersEmptyState from '../UsersEmptyState';
import UsersErrorState from '../UsersErrorState';
import UserPanel from '../UserPanel';

export default function UsersPage() {
  const {
    session,
    permissions,
    state,
    listState,
    detailState,
    actionLoading,
    openCreate,
    openEdit,
    openView,
    closePanel,
    reloadUsers,
    handleCreate,
    handleUpdate,
    notify,
  } = useUsersController();

  const canCreate = permissions.canCreate;
  const canEdit = permissions.canEdit;
  const isSessionReady = Boolean(session?.rol);
  const isListView = state.view === VIEW_STATE.LIST;
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
  } else if (isListView) {
    content = (
      <>
        <UsersToolbar
          canCreate={canCreate}
          onCreate={openCreate}
          onReload={reloadUsers}
        />
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
            onView={openView}
            onEdit={openEdit}
          />
        )}
      </>
    );
  } else {
    content = (
      <UserPanel
        mode={state.view}
        user={detailState.data}
        loading={detailState.loading}
        error={detailState.error}
        actionLoading={actionLoading}
        onClose={closePanel}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onNotify={notify}
        sessionRole={session?.rol}
      />
    );
  }

  return (
    <Layout title="Usuarios V2">
      <Box sx={{ paddingX: 2, paddingTop: 1 }}>
        {content}
      </Box>
    </Layout>
  );
}
