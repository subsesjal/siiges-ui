# Guía de Migración: Context Legacy → Split Contexts

## 📋 Resumen de Cambios

Se ha refactorizado el contexto monolítico en 4 contextos especializados para mejorar el performance y la mantenibilidad:

1. **AuthContext** - Autenticación y sesión
2. **UIContext** - Notificaciones y loading
3. **UserContext** - Avatar y datos de usuario
4. **NavigationContext** - Navegación y secciones

## 🔄 Migración de Componentes

### ❌ Antes (Legacy Context)

```jsx
import { Context } from '@siiges-ui/shared';
import { useContext } from 'react';

function MiComponente() {
  const {
    session,
    auth,
    noti,
    setNoti,
    section,
    setSection,
    loading,
    setLoading,
    avatarUrl,
    refreshAvatar,
    activateAuth,
    removeAuth,
  } = useContext(Context);

  return (
    <div>
      <p>Usuario: {session.nombre}</p>
      {loading && <p>Cargando...</p>}
    </div>
  );
}
```

### ✅ Después (Split Contexts)

```jsx
import { useAuth, useUI, useUser, useNavigation } from '@siiges-ui/shared';

function MiComponente() {
  // Solo importa los contextos que necesitas
  const { session, auth, activateAuth, removeAuth } = useAuth();
  const { loading, setLoading, showSuccess, showError } = useUI();
  const { avatarUrl, refreshAvatar } = useUser();
  const { section, setSection } = useNavigation();

  return (
    <div>
      <p>Usuario: {session.nombre}</p>
      {loading && <p>Cargando...</p>}
    </div>
  );
}
```

## 📚 Casos de Uso Comunes

### 1. Componente que solo necesita autenticación

```jsx
// ✅ CORRECTO - Solo usa AuthContext
import { useAuth } from '@siiges-ui/shared';

function ProtectedComponent() {
  const { session, auth, removeAuth } = useAuth();

  if (!auth) {
    return <p>No autorizado</p>;
  }

  return (
    <div>
      <p>Bienvenido, {session.nombre}</p>
      <button onClick={removeAuth}>Cerrar sesión</button>
    </div>
  );
}
```

### 2. Componente que solo muestra notificaciones

```jsx
// ✅ CORRECTO - Solo usa UIContext (o mejor, useNotification)
import { useNotification } from '@siiges-ui/shared';

function FormComponent() {
  const notify = useNotification();

  const handleSubmit = async () => {
    try {
      await saveData();
      notify.success('Datos guardados correctamente');
    } catch (error) {
      notify.error('Error al guardar los datos');
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 3. Componente que maneja loading

```jsx
// ✅ CORRECTO - Solo usa UIContext
import { useUI } from '@siiges-ui/shared';

function DataFetcher() {
  const { loading, setLoading } = useUI();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getData();
      // procesar data
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? <p>Cargando...</p> : <DataDisplay />}
    </div>
  );
}
```

### 4. Componente que muestra avatar del usuario

```jsx
// ✅ CORRECTO - Usa AuthContext + UserContext
import { useAuth, useUser } from '@siiges-ui/shared';

function UserProfile() {
  const { session } = useAuth();
  const { avatarUrl, refreshAvatar, isLoadingAvatar } = useUser();

  return (
    <div>
      <h2>{session.nombre}</h2>
      {isLoadingAvatar ? (
        <div>Cargando avatar...</div>
      ) : (
        <img src={avatarUrl || '/default-avatar.png'} alt="Avatar" />
      )}
      <button onClick={refreshAvatar}>Actualizar avatar</button>
    </div>
  );
}
```

### 5. Layout component (usa múltiples contextos)

```jsx
// ✅ CORRECTO - Usa los contextos necesarios
import { useAuth, useUI, useNavigation } from '@siiges-ui/shared';

function Layout({ children }) {
  const { session } = useAuth();
  const { loading } = useUI();
  const { section, setSection } = useNavigation();

  return (
    <div>
      <Navbar session={session} section={section} setSection={setSection} />
      {loading && <Loading />}
      <main>{children}</main>
    </div>
  );
}
```

## 🎣 API de Hooks Disponibles

### useAuth()
```typescript
{
  session: {
    id: string;
    nombre: string;
    rol: string;
    token: string;
  };
  auth: boolean;
  activateAuth: (userData) => void;
  removeAuth: () => void;
}
```

### useUI()
```typescript
{
  noti: {
    open: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
  };
  setNoti: (noti) => void;
  showNotification: (message: string, type: string) => void;
  hideNotification: () => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
```

### useNotification() - Shortcut simplificado
```typescript
{
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}
```

### useUser()
```typescript
{
  avatarUrl: string | null;
  isLoadingAvatar: boolean;
  refreshAvatar: () => Promise<void>;
  getAvatar: (userId: string) => Promise<string | null>;
  clearAvatarCache: () => void;
}
```

### useNavigation()
```typescript
{
  section: string | null;
  setSection: (section: string) => void;
  currentRoute: string;
  navigateTo: (path: string) => void;
  navigateBack: () => void;
}
```

## ⚡ Beneficios del Refactor

### Performance
- **Antes**: Cualquier cambio en `loading`, `noti` o `avatarUrl` re-renderizaba TODA la app
- **Después**: Solo se re-renderizan componentes que usan el contexto específico afectado

**Ejemplo:**
```jsx
// Antes: Cambiar loading re-renderizaba estos componentes aunque no lo usen
<Header />         // ❌ Re-render innecesario
<Sidebar />        // ❌ Re-render innecesario
<DataTable />      // ❌ Re-render innecesario
<Footer />         // ❌ Re-render innecesario

// Después: Solo se re-renderiza el componente que usa loading
<Header />         // ✅ No re-render
<Sidebar />        // ✅ No re-render
<LoadingSpinner /> // ✅ Re-render (es el único que usa loading)
<Footer />         // ✅ No re-render
```

### Mantenibilidad
- **Separación de responsabilidades**: Cada contexto tiene un propósito claro
- **Más fácil de testear**: Puedes mockear contextos individuales
- **Mejor Tree-Shaking**: Importa solo lo que necesitas

### Memory Management
- **Avatar Cache mejorado**:
  - LRU cache en memoria (límite de 50 avatares)
  - Usa Blob URLs en lugar de Base64
  - Libera memoria automáticamente
  - No llena localStorage

## 🔧 Tareas de Migración

### Componentes a actualizar:

1. **Layout.jsx** ✅ (Ejemplo arriba)
2. **MainNavbar.jsx**
3. **MenuDrawer.jsx**
4. **Header component**
5. **Todos los formularios** (para usar useNotification)
6. **Páginas con loading states**

### Pasos:

1. Buscar `useContext(Context)` en tu proyecto
2. Identificar qué propiedades usa cada componente
3. Reemplazar con los hooks específicos (`useAuth`, `useUI`, etc.)
4. Probar que la funcionalidad sigue igual
5. Verificar con React DevTools que no hay re-renders extra

## 🧪 Testing

### Ejemplo de test con contextos separados

```jsx
import { render, screen } from '@testing-library/react';
import { AuthProvider, UIProvider } from '@siiges-ui/shared';
import MiComponente from './MiComponente';

test('renderiza el nombre del usuario', () => {
  render(
    <AuthProvider>
      <UIProvider>
        <MiComponente />
      </UIProvider>
    </AuthProvider>
  );
  
  expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument();
});
```

## 📝 Notas Importantes

1. **Context legacy sigue disponible**: Para retrocompatibilidad, el Context original sigue exportándose
2. **Migración gradual**: Puedes migrar componentes uno por uno
3. **No breaking changes**: Si no actualizas nada, el código existente seguirá funcionando
4. **Deprecación futura**: Se recomienda migrar todos los componentes a los nuevos contextos

## 🚨 Problemas Comunes

### Error: "useAuth must be used within AuthProvider"

**Causa**: Estás usando el hook fuera del provider.

**Solución**: Asegúrate que tu componente está dentro de `<AppProvider>` en `_app.jsx`

### Los cambios en loading no actualizan la UI

**Causa**: Tal vez estás usando el Context legacy y el nuevo al mismo tiempo.

**Solución**: Usa solo los nuevos hooks en todo el componente.

## 📞 Soporte

Para dudas o problemas con la migración, revisa:
- Ejemplos en `packages/shared/src/contexts/`
- Tests en `packages/shared/__tests__/`
