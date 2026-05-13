# Plan de Migración de Context a Hooks Personalizados
## Análisis de 28 Archivos JSX - siiges-app/pages

---

## 📊 RESUMEN EJECUTIVO

| Métrica | Valor |
|---------|-------|
| Total de archivos analizados | 28 |
| Archivos que usan `useAuth` | 14 (50%) |
| Archivos que usan `useUI` | 18 (64.3%) |
| Archivos con ambos | 8 (28.6%) |
| Archivos con navegación (useNavigation) | 5 (17.9%) |
| Complejidad Baja | 8 (28.6%) |
| Complejidad Media | 14 (50%) |
| Complejidad Alta | 6 (21.4%) |

---

## 🔍 PATRONES IDENTIFICADOS

### **PATRÓN 1: Autenticación Simple (50% - 14 archivos)**
```leaf
Característica: Solo usan `session` de Context
Archivos: 14
Ejemplos: instituciones/index.jsx, usuarios/crear/index.jsx
Migración: useAuth() → { session, user, loading }
Complejidad: BAJA
```

**Archivos afectados:**
- instituciones/index.jsx
- serviciosEscolares/programas/[id]/editPrograma.jsx
- notificaciones/index.jsx
- usuarios/consultar/[usuarioId]/index.jsx
- usuarios/crear/index.jsx
- usuarios/editar/[usuarioId]/index.jsx
- usuarios/perfilUsuario/index.jsx
- solicitudes/index.jsx

### **PATRÓN 2: UI State Management (64.3% - 18 archivos)**
```leaf
Característica: Usan setLoading, setNoti, y/o loading
Archivos: 18
Ejemplos: nuevaInspeccion.jsx, egresados/index.jsx
Migración: useUI() → { setLoading, setNoti, loading }
Complejidad: MEDIA a ALTA
```

**Archivos afectados:**
- nuevaInspeccion.jsx
- misInspecciones/index.jsx
- egresados/index.jsx
- Equivalencias/procesar/index.jsx
- Equivalencias/revisar/index.jsx
- Revalidacion/procesar/index.jsx
- Revalidacion/revisar/index.jsx
- servicioSocial/crear/index.jsx
- solicitudesFolios/admin/[id]/folios.jsx
- solicitudesFolios/alumnos/[id]/certificados/index.jsx
- solicitudesFolios/alumnos/[id]/titulos/index.jsx
- solicitudesFolios/index.jsx
- titulacion/index.jsx
- tituloElectronico/[folio]/consultarFolio.jsx

### **PATRÓN 3: Session + UI State (28.6% - 8 archivos)**
```leaf
Característica: Combinan session + setLoading/setNoti
Archivos: 8
Ejemplos: misInspecciones/index.jsx, solicitud detalles/index.jsx
Migración: useAuth() + useUI()
Complejidad: ALTA
```

**Archivos afectados:**
- misInspecciones/index.jsx
- instituciones/consultar/[institucionId]/index.jsx
- instituciones/editar/[institucionId]/index.jsx
- instituciones/miInstitucion/index.jsx
- solicitudesFolios/index.jsx
- solicitudes/detallesSolicitudes/[id]/index.jsx
- solicitudes/detallesSolicitudes/[id]/recepcionFormatos/index.jsx

### **PATRÓN 4: Operaciones con Navegación (17.9% - 5 archivos)**
```leaf
Característica: Usan router.back() o router.push() después de operaciones
Archivos: 5
Ejemplos: Equivalencias/procesar/index.jsx
Migración: useUI() + useNavigation() (si se crea)
Complejidad: MEDIA
```

**Archivos afectados:**
- Equivalencias/procesar/index.jsx
- Equivalencias/revisar/index.jsx
- Revalidacion/procesar/index.jsx
- Revalidacion/revisar/index.jsx

---

## 📈 ESTADÍSTICAS POR TIPO DE DESTRUCTURACIÓN

### Uso de `session`
**14 archivos (50%)**
- Patrones: Acceso a `session.id`, `session.rol`, validaciones de permisos
- Frecuencia de acceso: 1-3 veces por archivo
- Uso en props a componentes: SÍ (11 archivos)

### Uso de `setLoading`
**16 archivos (57.1%)**
- Patrones: Mostrar/ocultar spinner durante API calls
- Frecuencia: 1-5 llamadas por archivo
- Archivos complejos (5+ llamadas): 6 archivos

### Uso de `setNoti`
**14 archivos (50%)**
- Patrones: Notificaciones de éxito/error
- Estructura típica: `{ open: true, message: string, type: 'success'|'error' }`
- Ubicación: En catch blocks, respuestas de API

### Uso de `loading`
**2 archivos (7.1%)** - Menos común
- Equivalencias/revisar/index.jsx
- tituloElectronico/[folio]/consultarFolio.jsx

---

## 🎯 HOOKS RECOMENDADOS A CREAR

### 1. **useAuth()** - Para manejo de autenticación
```typescript
interface UseAuthReturn {
  session: { id: number; rol: string; [key: string]: any };
  isAuthenticated: boolean;
  isAdmin: boolean;
  isRepresentante: boolean;
}

// Reemplaza:
const { session } = useContext(Context);
```

### 2. **useUI()** - Para manejo de UI state (loading, notificaciones)
```typescript
interface UseUIReturn {
  setLoading: (bool: boolean) => void;
  loading: boolean;
  setNoti: (noti: NotificationPayload) => void;
  notification: NotificationState;
}

// Reemplaza:
const { setLoading, setNoti, loading } = useContext(Context);
```

### 3. **useNavigation()** - Opcional, para manejo de rutas
```typescript
interface UseNavigationReturn {
  push: (route: string) => Promise<boolean>;
  back: () => void;
  reload: () => void;
}

// Uso en: Equivalencias/*, Revalidacion/*
```

---

## 📋 PLAN DE MIGRACIÓN POR FASES

### **FASE 1: Preparación (Baja Complejidad)**
**Duración estimada: 2-3 días**
**Archivos: 8**

Crear hooks en `libs/shared/hooks/`:
1. ~~`useAuth.ts`~~ → Posiblemente ya existe
2. ~~`useUI.ts`~~ → Posiblemente ya existe
3. `useNavigation.ts` (opcional)

Archivos de prueba (migración inicial):
```javascript
1. egresados/index.jsx
2. servicioSocial/crear/index.jsx
3. titulacion/index.jsx
4. solicitudesBecas/crear/index.jsx
```

### **FASE 2: Patrones Simples**
**Duración estimada: 3-4 días**
**Archivos: 14 (Complejidad Media)**

Migración de archivos con patrón de autenticación:
```javascript
1. instituciones/index.jsx
2. usuarios/crear/index.jsx
3. usuarios/consultar/[usuarioId]/index.jsx
4. solicitudes/index.jsx
... (10 más)
```

### **FASE 3: Patrones Complejos**
**Duración estimada: 4-5 días**
**Archivos: 6 (Complejidad Alta)**

Archivos con múltiples destructuraciones:
```javascript
1. nuevaInspeccion.jsx
2. misInspecciones/index.jsx
3. solicitudesFolios/admin/[id]/folios.jsx
4. tituloElectronico/[folio]/consultarFolio.jsx
5. solicitudes/detallesSolicitudes/[id]/recepcionFormatos/index.jsx
6. Equivalencias/revisar/index.jsx
```

---

## 🔄 EJEMPLOS DE MIGRACIÓN

### Ejemplo 1: Patrón Simple (Solo session)
**Archivo: `instituciones/index.jsx`**

**ANTES:**
```jsx
import React, { useContext } from 'react';
import { Context } from '@siiges-ui/shared';

export default function Instituciones() {
  const { session } = useContext(Context);

  useEffect(() => {
    const { id, rol } = session;
    if (session && id && usersAuth.includes(rol)) {
      // lógica...
    }
  }, [data, instituciones]);
}
```

**DESPUÉS:**
```jsx
import React from 'react';
import { useAuth } from '@siiges-ui/shared/hooks';

export default function Instituciones() {
  const { session } = useAuth();

  useEffect(() => {
    const { id, rol } = session;
    if (session && id && usersAuth.includes(rol)) {
      // lógica...
    }
  }, [data, instituciones]);
}
```

**Cambios:**
- ❌ Eliminar: `import { Context } from '@siiges-ui/shared'`
- ❌ Eliminar: `const { session } = useContext(Context)`
- ✅ Agregar: `import { useAuth } from '@siiges-ui/shared/hooks'`
- ✅ Agregar: `const { session } = useAuth()`

---

### Ejemplo 2: Patrón UI State (setLoading + setNoti)
**Archivo: `Equivalencias/procesar/index.jsx`**

**ANTES:**
```jsx
import React, { useContext } from 'react';
import { Context, Layout } from '@siiges-ui/shared';

export default function ProcesarEquivalencia() {
  const { setNoti } = useContext(Context);

  const handleSubmit = async () => {
    try {
      const response = await updateRecord({ ... });
      if (response.statusCode === 201) {
        setNoti({
          open: true,
          message: '¡Solicitud procesada exitosamente!',
          type: 'success',
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
}
```

**DESPUÉS:**
```jsx
import React from 'react';
import { Layout } from '@siiges-ui/shared';
import { useUI } from '@siiges-ui/shared/hooks';

export default function ProcesarEquivalencia() {
  const { setNoti } = useUI();

  const handleSubmit = async () => {
    try {
      const response = await updateRecord({ ... });
      if (response.statusCode === 201) {
        setNoti({
          open: true,
          message: '¡Solicitud procesada exitosamente!',
          type: 'success',
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
}
```

---

### Ejemplo 3: Patrón Combinado (session + setLoading + setNoti)
**Archivo: `misInspecciones/index.jsx`**

**ANTES:**
```jsx
import React, { useContext } from 'react';
import { Context } from '@siiges-ui/shared';

export default function MisInspecciones() {
  const { setLoading, setNoti, session } = useContext(Context);
  const { id: userId } = session;

  useEffect(() => {
    setLoading(loading);
    if (error && userId) {
      setNoti({
        open: true,
        message: `¡Ocurrió un error!: ${error}`,
        type: 'error',
      });
    }
  }, [data, loading, error]);
}
```

**DESPUÉS:**
```jsx
import React from 'react';
import { useAuth } from '@siiges-ui/shared/hooks';
import { useUI } from '@siiges-ui/shared/hooks';

export default function MisInspecciones() {
  const { session } = useAuth();
  const { setLoading, setNoti } = useUI();
  const { id: userId } = session;

  useEffect(() => {
    setLoading(loading);
    if (error && userId) {
      setNoti({
        open: true,
        message: `¡Ocurrió un error!: ${error}`,
        type: 'error',
      });
    }
  }, [data, loading, error]);
}
```

---

## ⚠️ CONSIDERACIONES Y RIESGOS

### Riesgos Identificados:

1. **Acceso directo a propiedades de session**
   - Riesgo: 11 archivos pasan `session` a componentes hijo
   - Mitigación: Asegurar que hooks retornen el objeto `session` completo

2. **Dependencia de propiedades dinámicas**
   - Riesgo: Algunos archivos acceden a `session[rol]` dinámicamente
   - Mitigación: Documentar estructura esperada de `session`

3. **Archivos con lógica compleja**
   - Riesgo: 6 archivos de complejidad alta tienen múltiples destructuraciones
   - Mitigación: Hacer migración con pruebas exhaustivas

4. **Context Provider aún en uso**
   - Riesgo: Si Layout o Layout aún usa Context, habrá conflicto
   - Mitigación: Verificar que hooks lean del mismo provider

---

## ✅ CHECKLIST DE MIGRACIÓN

### Pre-migración
- [ ] Verificar existencia de `useAuth()` hook
- [ ] Verificar existencia de `useUI()` hook
- [ ] Crear `useNavigation()` si es necesario
- [ ] Crear archivo de tipos/interfaces para Context properties
- [ ] Hacer backup de archivos originales

### Migración FASE 1 (Baja complejidad)
- [ ] egresados/index.jsx
- [ ] servicioSocial/crear/index.jsx
- [ ] titulacion/index.jsx
- [ ] solicitudesBecas/crear/index.jsx
- [ ] Ejecutar tests

### Migración FASE 2 (Media complejidad)
- [ ] instituciones/index.jsx
- [ ] usuarios/* (4 archivos)
- [ ] notificaciones/index.jsx
- [ ] solicitudes/index.jsx
- [ ] Ejecutar tests

### Migración FASE 3 (Alta complejidad)
- [ ] misInspecciones/index.jsx
- [ ] solicitudesFolios/* (5 archivos)
- [ ] Equivalencias/* (2 archivos)
- [ ] Revalidacion/* (2 archivos)
- [ ] tituloElectronico/[folio]/consultarFolio.jsx
- [ ] Ejecutar tests exhaustivos

### Post-migración
- [ ] Verificar que no hay imports de Context en pages/
- [ ] Ejecutar suite completa de tests
- [ ] Verificar que Layout aún funciona
- [ ] Testing manual en browser

---

## 📊 MATRIZ DE COMPATIBILIDAD

| Hook | Patrón 1 | Patrón 2 | Patrón 3 | Patrón 4 |
|------|----------|----------|----------|----------|
| useAuth() | ✅ | ❌ | ✅ | ❌ |
| useUI() | ❌ | ✅ | ✅ | ✅ |
| useNavigation() | ❌ | ❌ | ❌ | ✅ |

---

## 🎓 CONCLUSIÓN

**Estimación de esfuerzo total:** 9-12 días de desarrollo

**Beneficios esperados:**
- ✅ Mejor separación de responsabilidades
- ✅ Código más testeable
- ✅ Reducción de prop drilling
- ✅ Mejor mantenibilidad

**Próximos pasos:**
1. Crear/verificar hooks en `libs/shared/hooks/`
2. Ajustar esta guía según hallazgos
3. Iniciar FASE 1 con archivos de baja complejidad
4. Escalar a fases 2 y 3 después de validación
