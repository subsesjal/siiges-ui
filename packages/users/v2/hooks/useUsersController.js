import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useAuth, useNotification } from '@siiges-ui/shared';
import VIEW_STATE from '../constants/viewState';
import useUsersData from './useUsersData';
import useUserDetail from './useUserDetail';
import { getUserPermissions } from '../utils/permissions';
import { createUser, updateUser } from '../services/usuarios.service';

const initialState = {
  view: VIEW_STATE.LIST,
  selectedId: null,
  selectedUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_CREATE':
      return { view: VIEW_STATE.CREATE, selectedId: null, selectedUser: null };
    case 'OPEN_EDIT':
      return {
        view: VIEW_STATE.EDIT,
        selectedId: action.payload.id,
        selectedUser: action.payload.user || null,
      };
    case 'OPEN_VIEW':
      return {
        view: VIEW_STATE.VIEW,
        selectedId: action.payload.id,
        selectedUser: action.payload.user || null,
      };
    case 'CLOSE_PANEL':
      return initialState;
    default:
      return state;
  }
};

const useUsersController = () => {
  const { session } = useAuth();
  const notify = useNotification();
  const permissions = useMemo(() => getUserPermissions(session?.rol), [session?.rol]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [refreshKey, setRefreshKey] = useState(0);
  const [actionLoading, setActionLoading] = useState(false);
  const actionAbortRef = useRef(null);
  const listState = useUsersData({ session, refreshKey });
  const detailState = useUserDetail({
    session,
    usuarioId: state.selectedId,
    enabled: state.view === VIEW_STATE.EDIT || state.view === VIEW_STATE.VIEW,
    initialData: state.selectedUser,
  });

  const openCreate = useCallback(() => dispatch({ type: 'OPEN_CREATE' }), []);
  const openEdit = useCallback(
    (user) => dispatch({ type: 'OPEN_EDIT', payload: { id: user.id, user } }),
    [],
  );
  const openView = useCallback(
    (user) => dispatch({ type: 'OPEN_VIEW', payload: { id: user.id, user } }),
    [],
  );
  const closePanel = useCallback(() => dispatch({ type: 'CLOSE_PANEL' }), []);
  const refresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const notifyError = useCallback((message) => {
    notify.error(message || 'Ocurrio un error.');
  }, [notify]);

  const notifySuccess = useCallback((message) => {
    notify.success(message);
  }, [notify]);

  const executeAction = useCallback(
    async (requestFn, successMessage) => {
      const controller = new AbortController();
      actionAbortRef.current = controller;
      setActionLoading(true);

      try {
        await requestFn(controller.signal);
        notifySuccess(successMessage);
        refresh();
        closePanel();
        return true;
      } catch (error) {
        if (error?.name !== 'AbortError') {
          notifyError(error?.message || 'No fue posible completar la operacion.');
        }
        return false;
      } finally {
        actionAbortRef.current = null;
        setActionLoading(false);
      }
    },
    [closePanel, notifyError, notifySuccess, refresh],
  );

  const handleCreate = useCallback((payload) => executeAction(
    (signal) => createUser({ session, data: payload, signal }),
    'Usuario creado correctamente.',
  ), [executeAction, session]);

  const handleUpdate = useCallback((usuarioId, payload) => executeAction(
    (signal) => updateUser({
      session,
      usuarioId,
      data: payload,
      signal,
    }),
    'Usuario actualizado correctamente.',
  ), [executeAction, session]);

  useEffect(() => {
    if (listState.error) {
      notifyError(
        listState.error.message || 'No fue posible cargar la lista de usuarios.',
      );
    }
  }, [listState.error, notifyError]);

  useEffect(() => {
    if (detailState.error) {
      notifyError(
        detailState.error.message || 'No fue posible cargar el detalle del usuario.',
      );
    }
  }, [detailState.error, notifyError]);

  useEffect(() => () => {
    if (actionAbortRef.current) {
      actionAbortRef.current.abort();
    }
  }, []);

  return {
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
    reloadUsers: refresh,
    handleCreate,
    handleUpdate,
    notify,
  };
};

export default useUsersController;
