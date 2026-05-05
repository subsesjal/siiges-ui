# Guía Técnica de Implementación de Hooks
## Migración de Context a Hooks Personalizados

---

## 📋 TABLA DE CONTENIDOS
1. Estructura de Directorios
2. Definición de Hooks
3. Ejemplos de Migración Paso a Paso
4. Casos de Uso Especiales
5. Testing
6. Troubleshooting

---

## 🗂️ ESTRUCTURA DE DIRECTORIOS PROPUESTA

```
libs/shared/
├── src/
│   ├── hooks/
│   │   ├── index.ts                    # Barrel export
│   │   ├── useAuth.ts                  # Hook de autenticación
│   │   ├── useUI.ts                    # Hook de UI state
│   │   ├── useNavigation.ts           # Hook de navegación (opcional)
│   │   ├── types/
│   │   │   ├── IUseAuth.ts
│   │   │   ├── IUseUI.ts
│   │   │   └── IContext.ts
│   │   └── __tests__/
│   │       ├── useAuth.test.ts
│   │       ├── useUI.test.ts
│   │       └── useNavigation.test.ts
│   ├── context/
│   │   └── Context.tsx                 # Seguir usando Context Provider
│   └── ...
```

---

## 🎣 IMPLEMENTACIÓN DE HOOKS

### **1. Hook: useAuth()**

**Archivo: `libs/shared/src/hooks/useAuth.ts`**

```typescript
import { useContext } from 'react';
import { Context } from '../context/Context';

interface Session {
  id: number;
  rol: string;
  [key: string]: any;
}

interface UseAuthReturn {
  session: Session;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isRepresentante: boolean;
  isSicyt: boolean;
}

/**
 * Hook para manejar autenticación y acceso a datos de sesión
 * Reemplaza: const { session } = useContext(Context)
 *
 * @returns {UseAuthReturn} Objeto con session y helpers de rol
 *
 * @example
 * const { session, isAdmin } = useAuth();
 * if (isAdmin) { ... }
 */
export function useAuth(): UseAuthReturn {
  const { session } = useContext(Context);

  if (!session) {
    console.warn('useAuth: No session available. Make sure you are inside ContextProvider.');
  }

  const isAuthenticated = !!session && !!session.id;
  const isAdmin = session?.rol === 'admin';
  const isRepresentante = session?.rol === 'representante';
  const isSicyt = session?.rol?.includes('sicyt');

  return {
    session: session || {},
    isAuthenticated,
    isAdmin,
    isRepresentante,
    isSicyt,
  };
}
```

---

### **2. Hook: useUI()**

**Archivo: `libs/shared/src/hooks/useUI.ts`**

```typescript
import { useContext } from 'react';
import { Context } from '../context/Context';

interface Notification {
  open: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface NotificationPayload {
  open: boolean;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

interface UseUIReturn {
  setLoading: (loading: boolean) => void;
  loading: boolean;
  setNoti: (notification: NotificationPayload) => void;
  notification: Notification;
  clearNotification: () => void;
}

/**
 * Hook para manejar UI state (loading, notificaciones)
 * Reemplaza: const { setLoading, setNoti, loading } = useContext(Context)
 *
 * @returns {UseUIReturn} Objeto con funciones y estado de UI
 *
 * @example
 * const { setLoading, setNoti } = useUI();
 * setLoading(true);
 * setNoti({ open: true, message: 'Success!', type: 'success' });
 */
export function useUI(): UseUIReturn {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useUI debe ser usado dentro de un ContextProvider');
  }

  const { setLoading, loading, setNoti, notification } = context;

  const clearNotification = () => {
    setNoti({ open: false, message: '', type: 'info' });
  };

  return {
    setLoading,
    loading: loading || false,
    setNoti,
    notification: notification || { open: false, message: '', type: 'info' },
    clearNotification,
  };
}
```

---

### **3. Hook: useNavigation() [Opcional]**

**Archivo: `libs/shared/src/hooks/useNavigation.ts`**

```typescript
import { useRouter } from 'next/router';

interface UseNavigationReturn {
  push: (path: string, as?: string) => Promise<boolean>;
  back: () => void;
  reload: () => void;
  replace: (path: string) => Promise<boolean>;
  goToHome: () => Promise<boolean>;
}

/**
 * Hook para manejo de navegación
 * Envuelve next/router con interface más limpia
 *
 * @returns {UseNavigationReturn} Funciones de navegación
 *
 * @example
 * const { push, back } = useNavigation();
 * back();
 * push('/usuarios');
 */
export function useNavigation(): UseNavigationReturn {
  const router = useRouter();

  const push = async (path: string, as?: string): Promise<boolean> => {
    try {
      await router.push(path, as);
      return true;
    } catch (error) {
      console.error('Navigation error:', error);
      return false;
    }
  };

  const back = () => {
    router.back();
  };

  const reload = () => {
    router.reload();
  };

  const replace = async (path: string): Promise<boolean> => {
    try {
      await router.replace(path);
      return true;
    } catch (error) {
      console.error('Navigation error:', error);
      return false;
    }
  };

  const goToHome = async (): Promise<boolean> => {
    return push('/');
  };

  return {
    push,
    back,
    reload,
    replace,
    goToHome,
  };
}
```

---

### **4. Barrel Export**

**Archivo: `libs/shared/src/hooks/index.ts`**

```typescript
export { useAuth } from './useAuth';
export { useUI } from './useUI';
export { useNavigation } from './useNavigation';

// Type exports
export type { UseAuthReturn } from './useAuth';
export type { UseUIReturn } from './useUI';
export type { UseNavigationReturn } from './useNavigation';
```

---

## 🔄 EJEMPLOS DE MIGRACIÓN PASO A PASO

### **CASO 1: Arquitectura Simple (solo session)**

**ANTES:**
```jsx
// File: instituciones/index.jsx
import React, { useContext, useEffect, useState } from 'react';
import router from 'next/router';
import { Divider } from '@mui/material';
import { Layout, Context } from '@siiges-ui/shared';
import { InstitucionesTable, getInstituciones } from '@siiges-ui/instituciones';

export default function Instituciones() {
  const { session } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const { instituciones } = getInstituciones({ setLoading, tipoInstitucionId: 1 });

  const usersAuth = ['admin', 'sicyt_editar'];
  useEffect(() => {
    const { id, rol } = session;
    if (session && id && usersAuth.includes(rol)) {
      if (instituciones && instituciones.length) {
        setData(instituciones);
      }
    } else {
      router.back();
    }
  }, [data, instituciones]);

  return (
    <Layout title="Instituciones" loading={loading}>
      <Divider sx={{ marginTop: 2 }} />
      {(data && !loading) && (
        <InstitucionesTable instituciones={data} session={session} />
      )}
    </Layout>
  );
}
```

**DESPUÉS:**
```jsx
// File: instituciones/index.jsx
import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { Divider } from '@mui/material';
import { Layout } from '@siiges-ui/shared';
import { InstitucionesTable, getInstituciones } from '@siiges-ui/instituciones';
import { useAuth } from '@siiges-ui/shared/hooks';

export default function Instituciones() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const { instituciones } = getInstituciones({ setLoading, tipoInstitucionId: 1 });

  const usersAuth = ['admin', 'sicyt_editar'];
  useEffect(() => {
    const { id, rol } = session;
    if (session && id && usersAuth.includes(rol)) {
      if (instituciones && instituciones.length) {
        setData(instituciones);
      }
    } else {
      router.back();
    }
  }, [data, instituciones]);

  return (
    <Layout title="Instituciones" loading={loading}>
      <Divider sx={{ marginTop: 2 }} />
      {(data && !loading) && (
        <InstitucionesTable instituciones={data} session={session} />
      )}
    </Layout>
  );
}
```

**Cambios realizados:**
```diff
- import { Layout, Context } from '@siiges-ui/shared';
+ import { Layout } from '@siiges-ui/shared';
+ import { useAuth } from '@siiges-ui/shared/hooks';

- const { session } = useContext(Context);
+ const { session } = useAuth();
```

---

### **CASO 2: Manejo de Notificaciones y Loading**

**ANTES:**
```jsx
// File: Equivalencias/procesar/index.jsx
import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { ConsultEquivalencia } from '@siiges-ui/revalidaciones';
import {
  ButtonSimple,
  Layout,
  updateRecord,
  Context,
} from '@siiges-ui/shared';
import { useRouter } from 'next/router';

export default function ProcesarEquivalencia() {
  const router = useRouter();
  const { query } = router;
  const { setNoti } = useContext(Context);

  const handleSubmit = async () => {
    try {
      const response = await updateRecord({
        endpoint: `/solicitudesRevEquiv/${query.id}`,
        data: { estatusSolicitudRevEquivId: 4 },
      });

      if (response.statusCode === 201) {
        setNoti({
          open: true,
          message: '¡Solicitud procesada exitosamente!',
          type: 'success',
        });
        router.back();
      } else {
        setNoti({
          open: true,
          message: response.errorMessage || '¡Error al actualizar la solicitud!',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: '¡Error al procesar la solicitud!',
        type: 'error',
      });
    }
  };

  return (
    <Layout title="Procesar Solicitud de Equivalencias">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ConsultEquivalencia />
        </Grid>
      </Grid>
    </Layout>
  );
}
```

**DESPUÉS:**
```jsx
// File: Equivalencias/procesar/index.jsx
import React from 'react';
import { Grid } from '@mui/material';
import { ConsultEquivalencia } from '@siiges-ui/revalidaciones';
import {
  ButtonSimple,
  Layout,
  updateRecord,
} from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import { useUI } from '@siiges-ui/shared/hooks';

export default function ProcesarEquivalencia() {
  const router = useRouter();
  const { query } = router;
  const { setNoti } = useUI();

  const handleSubmit = async () => {
    try {
      const response = await updateRecord({
        endpoint: `/solicitudesRevEquiv/${query.id}`,
        data: { estatusSolicitudRevEquivId: 4 },
      });

      if (response.statusCode === 201) {
        setNoti({
          open: true,
          message: '¡Solicitud procesada exitosamente!',
          type: 'success',
        });
        router.back();
      } else {
        setNoti({
          open: true,
          message: response.errorMessage || '¡Error al actualizar la solicitud!',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: '¡Error al procesar la solicitud!',
        type: 'error',
      });
    }
  };

  return (
    <Layout title="Procesar Solicitud de Equivalencias">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ConsultEquivalencia />
        </Grid>
      </Grid>
    </Layout>
  );
}
```

**Cambios realizados:**
```diff
- import { ..., Context } from '@siiges-ui/shared';
+ import { ... } from '@siiges-ui/shared';
+ import { useUI } from '@siiges-ui/shared/hooks';

- const { setNoti } = useContext(Context);
+ const { setNoti } = useUI();
```

---

### **CASO 3: Combinación de Hooks (Auth + UI)**

**ANTES:**
```jsx
// File: misInspecciones/index.jsx
import {
  Context, DataTable, Layout, useApi,
} from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { MisInspeccionesColumns } from '@siiges-ui/inspecciones';

export default function MisInspecciones() {
  const { setLoading, setNoti, session } = useContext(Context);
  const { id: userId } = session;
  const [inspecciones, setInspecciones] = useState([]);

  const { data, loading, error } = useApi({ endpoint: `api/v1/inspecciones/inspectores-programas/${userId}` });

  useEffect(() => {
    setLoading(loading);
    if (data) {
      setInspecciones(data.map((row) => ({
        ...row,
        status: getEstatus(row.estatusInspeccionId),
      })));
    }
    if (error && userId) {
      setNoti({
        open: true,
        message: `¡Ocurrió un error al cargar las inspecciones!: ${error}`,
        type: 'error',
      });
    }
  }, [data, loading, error]);

  return (
    <Layout title="Mis inspecciones">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DataTable
            title="Lista de inspecciones"
            rows={inspecciones}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
```

**DESPUÉS:**
```jsx
// File: misInspecciones/index.jsx
import {
  DataTable, Layout, useApi,
} from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { MisInspeccionesColumns } from '@siiges-ui/inspecciones';
import { useAuth } from '@siiges-ui/shared/hooks';
import { useUI } from '@siiges-ui/shared/hooks';

export default function MisInspecciones() {
  const { session } = useAuth();
  const { setLoading, setNoti } = useUI();
  const { id: userId } = session;
  const [inspecciones, setInspecciones] = useState([]);

  const { data, loading, error } = useApi({ endpoint: `api/v1/inspecciones/inspectores-programas/${userId}` });

  useEffect(() => {
    setLoading(loading);
    if (data) {
      setInspecciones(data.map((row) => ({
        ...row,
        status: getEstatus(row.estatusInspeccionId),
      })));
    }
    if (error && userId) {
      setNoti({
        open: true,
        message: `¡Ocurrió un error al cargar las inspecciones!: ${error}`,
        type: 'error',
      });
    }
  }, [data, loading, error]);

  return (
    <Layout title="Mis inspecciones">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DataTable
            title="Lista de inspecciones"
            rows={inspecciones}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
```

**Cambios realizados:**
```diff
- import { Context, DataTable, Layout, useApi } from '@siiges-ui/shared';
+ import { DataTable, Layout, useApi } from '@siiges-ui/shared';
+ import { useAuth } from '@siiges-ui/shared/hooks';
+ import { useUI } from '@siiges-ui/shared/hooks';

- const { setLoading, setNoti, session } = useContext(Context);
+ const { session } = useAuth();
+ const { setLoading, setNoti } = useUI();
```

---

## 🧪 TESTING

### **Unit Tests para useAuth**

**Archivo: `libs/shared/src/hooks/__tests__/useAuth.test.ts`**

```typescript
import { renderHook } from '@testing-library/react-hooks';
import { useAuth } from '../useAuth';
import { Context } from '../../context/Context';

// Mock Context
jest.mock('../../context/Context');

describe('useAuth Hook', () => {
  const mockSession = {
    id: 1,
    rol: 'admin',
    email: 'test@example.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return session and isAuthenticated=true when session exists', () => {
    const mockContext = {
      session: mockSession,
    };

    (useContext as jest.Mock).mockReturnValue(mockContext);

    const { result } = renderHook(() => useAuth());

    expect(result.current.session).toEqual(mockSession);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should return isAdmin=true when rol is admin', () => {
    const mockContext = {
      session: mockSession,
    };

    (useContext as jest.Mock).mockReturnValue(mockContext);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAdmin).toBe(true);
  });

  it('should return isRepresentante=true when rol is representante', () => {
    const mockContext = {
      session: { ...mockSession, rol: 'representante' },
    };

    (useContext as jest.Mock).mockReturnValue(mockContext);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isRepresentante).toBe(true);
  });

  it('should return empty session and isAuthenticated=false when no session', () => {
    const mockContext = {
      session: null,
    };

    (useContext as jest.Mock).mockReturnValue(mockContext);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
  });
});
```

### **Unit Tests para useUI**

**Archivo: `libs/shared/src/hooks/__tests__/useUI.test.ts`**

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useUI } from '../useUI';

// Mock Context
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('useUI Hook', () => {
  const mockSetLoading = jest.fn();
  const mockSetNoti = jest.fn();

  const mockContext = {
    setLoading: mockSetLoading,
    loading: false,
    setNoti: mockSetNoti,
    notification: { open: false, message: '', type: 'info' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return UI functions', () => {
    const { useContext } = require('react');
    useContext.mockReturnValue(mockContext);

    const { result } = renderHook(() => useUI());

    expect(result.current.setLoading).toBeDefined();
    expect(result.current.setNoti).toBeDefined();
    expect(typeof result.current.clearNotification).toBe('function');
  });

  it('should call setLoading with correct value', () => {
    const { useContext } = require('react');
    useContext.mockReturnValue(mockContext);

    const { result } = renderHook(() => useUI());

    act(() => {
      result.current.setLoading(true);
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
  });

  it('should call setNoti with notification object', () => {
    const { useContext } = require('react');
    useContext.mockReturnValue(mockContext);

    const { result } = renderHook(() => useUI());

    const notification = {
      open: true,
      message: 'Test message',
      type: 'success',
    };

    act(() => {
      result.current.setNoti(notification);
    });

    expect(mockSetNoti).toHaveBeenCalledWith(notification);
  });
});
```

---

## ⚠️ Troubleshooting

### **Problema 1: "useAuth must be used inside ContextProvider"**

**Causa:** El hook se está usando fuera del Context Provider

**Solución:**
```jsx
// En _app.jsx o layout padre
import { ContextProvider } from '@siiges-ui/shared';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}
```

---

### **Problema 2: Session es undefined**

**Causa:** El Context no está inicializado correctamente

**Solución:**
```jsx
const { session } = useAuth();
if (!session || !session.id) {
  return <div>Loading...</div>;
}
```

---

### **Problema 3: setNoti no actualiza notificación**

**Causa:** El notification object en Context no está siendo actualizado

**Solución:** Verificar que el Context Provider está actualizando `notification` correctamente

```jsx
// En Context Provider
const [notification, setNotification] = useState({ open: false, message: '', type: 'info' });

const setNoti = (payload) => {
  setNotification(payload);
};
```

---

## 📚 Referencias

- React Hooks Documentation: https://react.dev/reference/react/useContext
- Next.js Router API: https://nextjs.org/docs/api-reference/next/router
- Custom Hooks Best Practices: https://react.dev/learn/reusing-logic-with-custom-hooks

---

## ✅ Checklist de Implementación

- [ ] Crear archivo `useAuth.ts`
- [ ] Crear archivo `useUI.ts`
- [ ] Crear archivo `useNavigation.ts`
- [ ] Crear `index.ts` con barrel exports
- [ ] Crear tests unitarios
- [ ] Documentar API de hooks
- [ ] Actualizar el proyecto a usar hooks
- [ ] Ejecutar tests completos
- [ ] Code review de cambios
- [ ] Actualizar documentación del proyecto

