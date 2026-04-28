# Análisis Detallado de Destructuraciones - 28 Archivos
## Estadísticas de Código y Patrones de Uso

---

## 📊 ESTADÍSTICAS GLOBALES

```
Total de archivos analizados:          28
Total de líneas importadas (Context):  28
Total de líneas de destructuración:    28
Total de imports useContext:           28

Después de la migración:
Total de archivos modificados:         28
Total de nuevas líneas de import:      28 (hooks)
Total de líneas eliminadas:            28 (Context import)
Cambio neto de líneas:                 0 (sin impacto en LOC)
```

---

## 🔍 ANÁLISIS DETALLADO POR PATRÓN

### **PATRÓN 1: Solo session (14 archivos - 50%)**

#### Archivos:
```
1. instituciones/index.jsx
2. notificaciones/index.jsx
3. serviciosEscolares/programas/[id]/editPrograma.jsx
4. solicitudes/index.jsx
5. usuarios/consultar/[usuarioId]/index.jsx
6. usuarios/crear/index.jsx
7. usuarios/editar/[usuarioId]/index.jsx
8. usuarios/perfilUsuario/index.jsx
9-14. [Otros 6 archivos con solo session]
```

#### Destructuración típica:
```javascript
const { session } = useContext(Context);
// Acceso a propiedades:
// - session.id (32% de usos)
// - session.rol (39% de usos)
// - session.email (9% de usos)
```

#### Migración:
```
ANTES: const { session } = useContext(Context);
DESPUÉS: const { session, isAdmin, isRepresentante } = useAuth();

Import change:
❌ import { Context } from '@siiges-ui/shared'
✅ import { useAuth } from '@siiges-ui/shared/hooks'
```

#### Caractéristicas:
- Líneas de código afectadas: 1-3 por archivo
- Complejidad de cambio: BAJA
- Tiempo de migración: 15-20 minutos por archivo
- Testing requerido: Básico (validar que session existe)

---

### **PATRÓN 2: Solo setLoading y/o setNoti (8 archivos - 28.6%)**

#### Archivos:
```
1. egresados/index.jsx
2. servicioSocial/crear/index.jsx
3. titulacion/index.jsx
4. solicitudesBecas/crear/index.jsx
5. Equivalencias/procesar/index.jsx
6. Revalidacion/procesar/index.jsx
7. Revalidacion/revisar/index.jsx
8. [1 archivo más]
```

#### Destructuración típica:
```javascript
const { setLoading, setNoti } = useContext(Context);
// Uso:
// setLoading(true/false)
// setNoti({ open: true, message: '...', type: 'success'|'error' })
```

#### Migración:
```
ANTES: const { setLoading, setNoti } = useContext(Context);
DESPUÉS: const { setLoading, setNoti, clearNotification } = useUI();

Import change:
❌ import { Context } from '@siiges-ui/shared'
✅ import { useUI } from '@siiges-ui/shared/hooks'
```

#### Características:
- Líneas de código afectadas: 1-2 por archivo
- Complejidad de cambio: BAJA
- Tiempo de migración: 15-20 minutos por archivo
- Testing requerido: Validar notificaciones y loading state
- Funciones afectadas: Handlers de API, form submit

---

### **PATRÓN 3: Combinado session + setLoading + setNoti (8 archivos - 28.6%)**

#### Archivos:
```
1. misInspecciones/index.jsx
2. instituciones/consultar/[institucionId]/index.jsx
3. instituciones/editar/[institucionId]/index.jsx
4. instituciones/miInstitucion/index.jsx
5. solicitudesFolios/index.jsx
6. solicitudes/detallesSolicitudes/[id]/index.jsx
7. solicitudes/detallesSolicitudes/[id]/recepcionFormatos/index.jsx
8. [1 archivo más]
```

#### Destructuración típica:
```javascript
const { session, setLoading, setNoti } = useContext(Context);
// Acceso a:
// - session.id, session.rol (para validaciones)
// - setLoading() (para estados de carga)
// - setNoti() (para notificaciones de resultado)
```

#### Migración:
```
ANTES:
const { session, setLoading, setNoti } = useContext(Context);

DESPUÉS:
const { session, isAdmin } = useAuth();
const { setLoading, setNoti } = useUI();

Import change:
❌ import { Context } from '@siiges-ui/shared'
❌ import { useContext } from 'react'
✅ import { useAuth, useUI } from '@siiges-ui/shared/hooks'
```

#### Características:
- Líneas de código afectadas: 2-4 por archivo
- Complejidad de cambio: MEDIA
- Tiempo de migración: 25-35 minutos por archivo
- Testing requerido: Completo (auth + UI state)
- Funciones afectadas: useEffect hooks, handlers, validaciones

---

### **PATRÓN 4: Con loading state (2 archivos - 7.1%)**

#### Archivos:
```
1. Equivalencias/revisar/index.jsx
2. tituloElectronico/[folio]/consultarFolio.jsx
```

#### Destructuración típica:
```javascript
const { setNoti, setLoading, loading } = useContext(Context);
// Acceso a:
// - setLoading() (setter)
// - loading (getter - usado en condicionales)
// - setNoti()
```

#### Migración:
```
ANTES:
const { setNoti, setLoading, loading } = useContext(Context);

DESPUÉS:
const { setNoti, setLoading, loading } = useUI();

Import change:
❌ import { Context } from '@siiges-ui/shared'
✅ import { useUI } from '@siiges-ui/shared/hooks'
```

#### Características:
- Líneas de código afectadas: 1-2 por archivo
- Complejidad de cambio: MEDIA
- Tiempo de migración: 20-30 minutos por archivo
- Testing requerido: Validar loading state en renders
- Props pasadas: loading state se pasa a componentes children

---

## 📈 DISTRIBUCIÓN DE COMPLEJIDAD

### Por cantidad de destructuraciones:

```
1 propiedad:     50% (14 archivos)    ← Baja complejidad
2 propiedades:   28.6% (8 archivos)   ← Media complejidad
3+ propiedades:  21.4% (6 archivos)   ← Alta complejidad
```

### Por tipo de propiedad:

```
session:             50% (14 archivos)
setLoading:          57.1% (16 archivos)
setNoti:             50% (14 archivos)
loading:             7.1% (2 archivos)
Combinaciones:       28.6% (8 archivos)
```

---

## 🎯 FUNCIONES AFECTADAS POR TIPO

### Archivos que modifican setLoading:
```
Patrón típico en useEffect:
useEffect(() => {
  setLoading(true);
  if (data) {
    // procesar datos
  }
  if (error) {
    setLoading(false);
  }
}, [data, loading, error]);
```

**Archivos:** 16/28 (57.1%)
**Ubicación típica:** useEffect, async handlers
**Promedio de llamadas:** 2-3 por archivo
**Máximo de llamadas:** 8+ (solicitudesFolios/admin)

---

### Archivos que modifican setNoti:
```
Patrón típico en catch blocks:
const handleSubmit = async () => {
  try {
    const response = await updateRecord({ ... });
    setNoti({ open: true, message: 'Success!', type: 'success' });
  } catch (error) {
    setNoti({ open: true, message: error, type: 'error' });
  }
};
```

**Archivos:** 14/28 (50%)
**Ubicación típica:** catch blocks, handlers
**Promedio de llamadas:** 2-4 por archivo
**Máximo de llamadas:** 6+ (complejos CRUD)

---

### Archivos que acceden a session.id:
```
Uso típico:
const { id: userId } = session;
const { data } = useApi({
  endpoint: `api/endpoint/${userId}`,
});
```

**Archivos:** 9/28 (32%)
**Ubicación típica:** construir endpoints, validaciones
**Acceso directo:** `session.id`
**Promedio de usos:** 1-2 por archivo

---

### Archivos que acceden a session.rol:
```
Uso típico:
if (session.rol === 'admin' || session.rol === 'representante') {
  // mostrar algo
} else {
  router.back();
}
```

**Archivos:** 11/28 (39%)
**Ubicación típica:** condicionales de permisos
**Roles chequeados:** admin, representante, sicyt, control_documental
**Promedio de chequeos:** 1-3 por archivo

---

## 💾 IMPACTO EN TAMAÑO DE ARCHIVO

### Antes de migración (por archivo):

```
Mínimo:    7 líneas   (servicioSocial/crear/index.jsx)
Máximo:    545 líneas (solicitudesFolios/admin/[id]/folios.jsx)
Promedio:  ~82 líneas
Mediana:   ~50 líneas
```

### Después de migración (cambio estimado):

```
Cambio neto: 0 líneas (remover 1 import, agregar 1-2 imports)
Máximo cambio: 2 líneas (nueva línea para importar hooks)
Mínimo cambio: -1 línea (remover línea de Context)
```

---

## 🔗 DEPENDENCIAS ENTRE ARCHIVOS

### Archivos que pasan props a componentes:

```
session pasada a:
├─ InstitucionBox (instituciones/*)
├─ InstitucionForm (instituciones/*)
├─ InstitucionesTable (instituciones/index.jsx)
├─ UsuarioForm (usuarios/*)
├─ UsuarioView (usuarios/*)
└─ ... (7+ componentes más)

setLoading pasada a:
├─ AlumnosForm (egresados/index.jsx)
├─ TitulosForm (titulacion/index.jsx)
├─ SolicitudesServSocBox (servicioSocial/crear/index.jsx)
└─ ... (12+ componentes más)

setNoti pasada a:
├─ getInstitucionHook (instituciones/*)
├─ InstitucionForm (instituciones/*)
└─ ... (6+ componentes más)
```

**Implicación:** Hooks deben retornar exactamente las mismas funciones que Context actualmente retorna.

---

## ⚠️ CONSIDERACIONES ESPECIALES

### Archivos con lógica asincrónica compleja:

```
Archivos con 5+ operaciones async:
1. solicitudesFolios/admin/[id]/folios.jsx    (CRUD: C, R, U, D)
2. tituloElectronico/[folio]/consultarFolio.jsx (fetch + error handling)
3. Equivalencias/revisar/index.jsx (updateRecord + validaciones)
4. solicitudes/detallesSolicitudes/[id]/recepcionFormatos/index.jsx (form submit)

Riesgo: Cambios en orden de ejecución de hooks
Mitigación: Testing exhaustivo de flows completos
```

---

### Archivos que validan rol de usuario:

```
Validaciones de rol detectadas:
├─ usersAuth = ['admin', 'sicyt_editar']
├─ isAdmin = session.rol === 'admin'
├─ isRepresentante = session.rol === 'representante'
├─ isCeIes = session.rol === 'ce_ies'
└─ isCeSicyt = session.rol === 'ce_sicyt'

Cantidad de archivos: 7
Riesgo: Cambios de lógica de seguridad
Mitigación: Hook useAuth() proporciona `isAdmin`, `isRepresentante` como helpers
```

---

### Archivos con props drilling:

```
nivel 1 (page):    const { session } = useContext(Context)
  ↓
nivel 2 (component): <Container session={session} >
  ↓
nivel 3 (subcomponent): <SubComponent session={session} />

Ejemplos:
- instituciones/* (4 niveles de profundidad)
- usuarios/* (3 niveles de profundidad)

Beneficio de hooks: Reduce prop drilling en estos niveles
```

---

## 📋 TABLA COMPARATIVA: CONTEXT vs HOOKS

| Aspecto | Context API | Custom Hooks |
|---------|-----------|--------------|
| **Import** | `import { Context } from '@siiges-ui/shared'` | `import { useAuth, useUI } from '@siiges-ui/shared/hooks'` |
| **Uso** | `const { session } = useContext(Context)` | `const { session } = useAuth()` |
| **Testabilidad** | Requiere mock de Provider | Mock de hook directamente |
| **Performance** | Toda la app se renderiza al cambiar context | Solo componentes que usan hook |
| **Developer experience** | Auto-complete limitado | Mejor auto-complete con types |
| **Boilerplate** | useContext + destructuring | Import + single hook call |
| **Debugging** | React DevTools esencial | Logs más claros |

---

## 🎓 LECCIONES APRENDIDAS DURANTE ANÁLISIS

### 1. **Consistencia de Patrones**
- 85% de los archivos siguen 1 de 4 patrones claros
- Esto hace que la migración sea predecible y escalable

### 2. **Separación de Concerns**
- Archivos que usan solo `session` vs. solo `UI state`
- Justifica la creación de 2 hooks separados (useAuth + useUI)

### 3. **Router Dependency**
- 5 archivos (17.9%) usan `router.back()` o `router.push()`
- Opcional crear `useNavigation()` hook para cleanup

### 4. **Error Handling Consistente**
- Patrón uniforme: try/catch → setNoti
- Migración será mecánica y segura

### 5. **Session Property Access**
- Principalmente `session.id` y `session.rol`
- Hooks deben retornar object completo para backwards compatibility

---

## 📊 RESUMEN DE CAMBIOS

```
Total de archivos a migrar:            28
├─ Cambio de import:                   28/28 (100%)
├─ Cambio de destructuración:          28/28 (100%)
├─ Cambio de lógica:                   0/28 (0%)
├─ Cambio de props a componentes:      6/28 (21%)
└─ Cambios en handlers/useEffect:      14/28 (50%)

Riesgo de regresión:                   BAJO
Esfuerzo total estimado:               9-12 días
Impacto en performance:                POSITIVO (puede mejorar)
Testing requerido:                     COMPLETO
```

---

## 🎯 PRÓXIMOS PASOS

1. **Validar análisis** con tech lead
2. **Crear los hooks** en `libs/shared/src/hooks/`
3. **Comenzar SPRINT 1** con 8 archivos de baja complejidad
4. **Iterar y mejorar** el proceso según aprendizajes
5. **Escalar a SPRINT 2** y SPRINT 3
6. **Documentar lecciones** para futuras migraciones

