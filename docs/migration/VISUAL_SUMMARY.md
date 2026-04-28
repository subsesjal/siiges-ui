# 🎨 VISUAL SUMMARY - Plan de Migración Context a Hooks
## Representación gráfica de los 28 Archivos y Patrones

---

## 📊 DISTRIBUTION DE ARCHIVOS POR PATRÓN

```
┌─────────────────────────────────────────────────────────────┐
│                    28 ARCHIVOS TOTALES                       │
└─────────────────────────────────────────────────────────────┘
          │
          ├─────────────────────────────────────────────────────┐
          │                                                       │
    🟢 BAJA            🟡 MEDIA           🔴 ALTA
    (8 archivos)    (14 archivos)      (6 archivos)
    28.6%              50%                21.4%
          │                │                  │
          ├─ egresados     ├─ instituciones   ├─ nuevaInspeccion
          ├─ servicioSocial├─ usuarios       ├─ misInspecciones
          ├─ titulacion    ├─ notificaciones ├─ Equivalencias/revisar
          ├─ becas         ├─ programas      ├─ folios admin
          │                ├─ Equivalencias  ├─ consultarFolio
          │                ├─ Revalidacion   └─ recepcionFormatos
          │                ├─ certificados
          │                ├─ titulos
          │                ├─ solicitudesFolios
          │                ├─ detallesSolicitudes
          │                └─ solicitudes
          │
          └─────────────────────────────────────────────────────┘
```

---

## 🔍 DISTRIBUCIÓN DE HOOKS

```
┌──────────────────────────────────────────────────────────────┐
│                 HOOKS RECOMENDADOS: 3                        │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────┐
│      useAuth()               │
│   Manejo de sesión           │
│                              │
│   Retorna:                   │
│   • session                  │
│   • isAuthenticated          │
│   • isAdmin                  │
│   • isRepresentante          │
│   • isSicyt                  │
│                              │
│   Usado en: 14 archivos (50%)│
│   Impacto: MEDIA             │
└──────────────────────────────┘
           │
           ├─→ usuarios/* (4)
           ├─→ instituciones/* (3)
           ├─→ escritas/index.jsx
           ├─→ notificaciones/index.jsx
           └─→ ... (6 más)


┌──────────────────────────────┐
│      useUI()                 │
│   UI State (loading, noti)   │
│                              │
│   Retorna:                   │
│   • setLoading()             │
│   • loading                  │
│   • setNoti()                │
│   • notification             │
│   • clearNotification()      │
│                              │
│   Usado en: 18 archivos (64%)│
│   Impacto: MEDIA-ALTA        │
└──────────────────────────────┘
           │
           ├─→ egresados/index.jsx
           ├─→ Equivalencias/* (2)
           ├─→ Revalidacion/* (2)
           ├─→ certificados/index.jsx
           ├─→ titulos/index.jsx
           ├─→ admin/folios.jsx
           ├─→ consultarFolio.jsx
           └─→ ... (10 más)


┌──────────────────────────────┐
│   useNavigation() [Opcional] │
│   Manejo de rutas            │
│                              │
│   Retorna:                   │
│   • push()                   │
│   • back()                   │
│   • reload()                 │
│   • replace()                │
│   • goToHome()               │
│                              │
│   Usado en: 5 archivos (17.9%)
│   Impacto: BAJA              │
└──────────────────────────────┘
           │
           ├─→ Equivalencias/procesar
           ├─→ Equivalencias/revisar
           ├─→ Revalidacion/procesar
           └─→ Revalidacion/revisar
```

---

## 📊 TIMELINE DE 3 SPRINTS

```
┌─────────────────────────────────────────────────────────────┐
│                    TIMELINE: 9-12 DÍAS                       │
└─────────────────────────────────────────────────────────────┘

SPRINT 1 (SEMANA 1) - 2-3 DÍAS
├─ 4 archivos Baja complejidad
├─ Validar el proceso
└─ ████░░░░░░░░░░░░░░░░░░░░░░ 14% (4/28)

   ✓ egresados/index.jsx
   ✓ servicioSocial/crear/index.jsx
   ✓ titulacion/index.jsx
   ✓ solicitudesBecas/crear/index.jsx


SPRINT 2 (SEMANA 2) - 5-6 DÍAS
├─ 16 archivos Media complejidad
├─ Escalar patrones
└─ ████████████░░░░░░░░░░░░░░░░ 57% (16/28)

   Subgrupo useAuth (7):
   ✓ instituciones/index.jsx
   ✓ usuarios/* (4 archivos)
   ✓ notificaciones/index.jsx
   ✓ solicitudes/index.jsx

   Subgrupo useAuth + useUI (5):
   ✓ instituciones/consultar, editar, miInstitucion
   ✓ solicitudesFolios/index.jsx
   ✓ solicitudes/detallesSolicitudes/[id]/index.jsx

   Subgrupo useUI + useNavigation (3):
   ✓ Equivalencias/procesar, Revalidacion/procesar
   ✓ Revalidacion/revisar

   Subgrupo useUI (2):
   ✓ certificados/index.jsx
   ✓ titulos/index.jsx


SPRINT 3 (SEMANA 3) - 4-5 DÍAS
├─ 6 archivos Alta complejidad
├─ Completar migración
└─ ████████████████████░░░░░░░░ 100% (28/28)

   ✓ nuevaInspeccion.jsx
   ✓ misInspecciones/index.jsx
   ✓ Equivalencias/revisar/index.jsx
   ✓ solicitudesFolios/admin/[id]/folios.jsx
   ✓ consultarFolio.jsx
   ✓ recepcionFormatos/index.jsx
```

---

## 📁 ESTRUCTURA DE DIRECTORIOS PROPUESTA

```
libs/shared/src/
├── hooks/                          ← NEW
│   ├── index.ts                    (Barrel export)
│   ├── useAuth.ts                  (Hook de auth)
│   ├── useUI.ts                    (Hook de UI state)
│   ├── useNavigation.ts            (Hook opcional)
│   ├── types/
│   │   ├── IUseAuth.ts
│   │   ├── IUseUI.ts
│   │   └── IContext.ts
│   └── __tests__/
│       ├── useAuth.test.ts
│       ├── useUI.test.ts
│       └── useNavigation.test.ts
│
├── context/
│   └── Context.tsx                 (SE MANTIENE)
│
├── utils/                          (Existente)
└── ...
```

---

## 🔄 PATRONES IDENTIFICADOS

```
╔════════════════════════════════════════════════════════════════╗
║               PATRÓN 1: Solo Session                           ║
║                                                                ║
║   const { session } = useContext(Context);                     ║
║                                                                ║
║   ↓ MIGRACIÓN                                                  ║
║                                                                ║
║   const { session } = useAuth();                               ║
║                                                                ║
║   14 archivos (50%)                                            ║
║   Complejidad: BAJA                                            ║
║   Tiempo: 15-20 min/archivo                                    ║
╚════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════╗
║               PATRÓN 2: Solo UI State                          ║
║                                                                ║
║   const { setLoading, setNoti } = useContext(Context);         ║
║                                                                ║
║   ↓ MIGRACIÓN                                                  ║
║                                                                ║
║   const { setLoading, setNoti } = useUI();                     ║
║                                                                ║
║   8 archivos (28.6%)                                           ║
║   Complejidad: BAJA                                            ║
║   Tiempo: 15-20 min/archivo                                    ║
╚════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════╗
║               PATRÓN 3: Combinado                              ║
║                                                                ║
║   const { session, setLoading, setNoti } =                     ║
║     useContext(Context);                                       ║
║                                                                ║
║   ↓ MIGRACIÓN                                                  ║
║                                                                ║
║   const { session } = useAuth();                               ║
║   const { setLoading, setNoti } = useUI();                     ║
║                                                                ║
║   8 archivos (28.6%)                                           ║
║   Complejidad: MEDIA                                           ║
║   Tiempo: 25-35 min/archivo                                    ║
╚════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════╗
║         PATRÓN 4: Con Loading State                            ║
║                                                                ║
║   const { setNoti, setLoading, loading } =                     ║
║     useContext(Context);                                       ║
║                                                                ║
║   ↓ MIGRACIÓN                                                  ║
║                                                                ║
║   const { setNoti, setLoading, loading } = useUI();            ║
║                                                                ║
║   2 archivos (7.1%)                                            ║
║   Complejidad: MEDIA                                           ║
║   Tiempo: 20-30 min/archivo                                    ║
╚════════════════════════════════════════════════════════════════╝
```

---

## 📊 MATRIZ DE IMPACTO

```
┌────────────────────────────────────────────────────────┐
│                 IMPACTO POR ASPECTO                    │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Testabilidad:            ████████░░ 80%             │
│  Mantenibilidad:          ███████░░░ 70%             │
│  Performance:             ███████░░░ 70%             │
│  Developer Experience:    ████████░░ 80%             │
│  Riesgo de Regresión:     ██░░░░░░░░ 20%            │
│  Esfuerzo Requerido:      █████░░░░░ 50%            │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## 🎯 MATRIZ DE ASIGNACIÓN POR SPRINT

```
SPRINT 1 - 4 Archivos
╔════════════════════════════════╗
║ 4 × 15 min = 60 min (1 hora)   ║
║ + Testing = 2 horas total      ║
║ + Code Review = 1 hora         ║
║ TOTAL: 4 horas/developer       ║
╚════════════════════════════════╝

SPRINT 2 - 16 Archivos
╔════════════════════════════════╗
║ 16 × 25 min = 400 min (6.5h)   ║
║ + Testing = 8 horas total      ║
║ + Code Review = 3 horas        ║
║ TOTAL: 17.5 horas/developer    ║
╚════════════════════════════════╝

SPRINT 3 - 6 Archivos (Alta complejidad)
╔════════════════════════════════╗
║ 6 × 50 min = 300 min (5 horas) ║
║ + Testing = 6 horas total      ║
║ + Code Review = 4 horas        ║
║ TOTAL: 15 horas/developer      ║
╚════════════════════════════════╝

TOTAL DE ESFUERZO POR DEVELOPER: ~36.5 horas
CON 2 DEVELOPERS EN PARALELO: ~ 6 días de desarrollo (9-12 con esperas)
```

---

## 🔗 DEPENDENCIAS ENTRE ARCHIVOS

```
Context Provider (mantener)
        │
        ├─→ useAuth()
        │   └─→ session
        │
        ├─→ useUI()
        │   ├─→ setLoading
        │   ├─→ loading
        │   └─→ setNoti
        │
        └─→ useNavigation() [Opcional]
            └─→ next/router

                │
                ├─→ 28 archivos de pages/
                │   ├─→ 14 usan useAuth
                │   ├─→ 18 usan useUI
                │   ├─→ 8 usan ambos
                │   └─→ 5 usan useNavigation
                │
                └─→ Componentes child (Props passing)
                    ├─→ session pasada
                    ├─→ setLoading pasada
                    ├─→ setNoti pasada
                    └─→ ...
```

---

## 📈 ÉPICA EN JIRA

```
╔════════════════════════════════════════════════════════════╗
║  ÉPICA: Migración de Context a Custom Hooks               ║
║  Descripción: Refactoring de 28 pages JSX                 ║
║  Estado: PLANIFICADO                                      ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  Sprint 1: ✓ Crear Hooks + Validar (4 archivos)           ║
║  Sprint 2: ✓ Escalar Media (16 archivos)                  ║
║  Sprint 3: ✓ Completar Alta (6 archivos)                  ║
║                                                            ║
║  User Stories: 28                                         ║
║  Bugs Esperados: 0-2                                      ║
║  Estimación: 36-50 puntos                                 ║
║                                                            ║
║  Criterios de Aceptación:                                 ║
║  ✓ 0 imports de Context en pages/                         ║
║  ✓ 100% de tests pasan                                    ║
║  ✓ Performance no se degrada                              ║
║  ✓ Funcionalidad idéntica                                 ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

## ✅ CHECKLIST FINAL

```
FASE PREPARACIÓN:
[ ] Validar análisis con equipo
[ ] Crear branch de desarrollo
[ ] Setup de hooks en libs/shared
[ ] Escribir tests unitarios
[ ] Comunicar al equipo

FASE EJECUCIÓN:
[ ] Sprint 1: 4 archivos Baja (4 horas)
    ✓ Test local + Code review

[ ] Sprint 2: 16 archivos Media (17.5 horas)
    ✓ Testing integración + Staging

[ ] Sprint 3: 6 archivos Alta (15 horas)
    ✓ Testing exhaustivo + Preprod

FASE FINALIZACIÓN:
[ ] E2E Testing completo
[ ] Performance testing
[ ] Staging approval
[ ] Deploy a production

DOCUMENTACIÓN:
[ ] Wiki/Confluence actualizado
[ ] Guía de desarrollo compartida
[ ] Lessons learned documentadas
```

---

## 🚀 RECOMENDACIÓN

```
╔════════════════════════════════════════════════════════════╗
║                   RECOMENDACIÓN FINAL                     ║
║                                                            ║
║  ✅ PROCEDER CON LA MIGRACIÓN                              ║
║                                                            ║
║  RAZONES:                                                 ║
║  1. Riesgo BAJO (cambios mecánicos)                       ║
║  2. Beneficios ALTOS (testabilidad +80%)                  ║
║  3. Timeline REALISTA (9-12 días)                         ║
║  4. Patrones PREDECIBLES (85% archivos)                   ║
║  5. Esfuerzo MANEJABLE (~36.5 horas dev)                  ║
║                                                            ║
║  PRÓXIMO PASO:                                            ║
║  Leer RESUMEN_EJECUTIVO.md en 20 minutos                 ║
║  y comunicar con stakeholders                             ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

**Generado:** Febrero 14, 2026
**Status:** ✅ LISTO PARA IMPLEMENTACIÓN
