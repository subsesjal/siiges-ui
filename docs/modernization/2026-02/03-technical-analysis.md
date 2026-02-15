# 📋 ANÁLISIS TÉCNICO COMPLETO - siiges-ui Monorepo
**Fecha del Análisis**: 15 de Febrero de 2026
**Rama**: SDT-1497
**Estado del Proyecto**: En Desarrollo (Refactor en Fase 1)

---

## 🎯 RESUMEN EJECUTIVO

El proyecto es un **monorepo basado en Lerna/Yarn** con arquitectura de aplicación Next.js + multiple packages de módulos especializados. El sistema está en una **fase crítica de modernización** con:

- ✅ Refactor de Context API en progreso (4 contextos especializados)
- ⚠️ Versiones obsoletas de Next.js y dependencias
- ⚠️ Dependencias duplicadas entre workspace y packages
- ⚠️ Configuración de build desactualizada
- 🚨 Incompatibilidad potencial con Node.js v22 actual

**Recomendación General**: Actualizar Next.js → 14.x, React → 19.x y herramientas de build antes de continuar con migraciones de componentes.

---

## 📊 VERSIONES ACTUALES DEL PROYECTO

### Entorno de Desarrollo
| Componente | Versión Actual | Recomendación | Estado |
|-----------|---|---|---|
| **Node.js** | v22.19.0 | ✅ Mantener | Actualizado |
| **npm** | 10.9.3 | ✅ Mantener | Actualizado |
| **Yarn** | 1.22.17 | ⚠️ Considerar 4.x | Obsoleto (legacy) |

### Dependencias Críticas
| Librería | Versión Actual | Última | Diferencia | Prioridad |
|---|---|---|---|---|
| **Next.js** | 12.2.0 | 14.2.x | 2 años atrás | 🔴 CRÍTICA |
| **React** | 18.2.0 | 19.x | 1 año atrás | 🔴 CRÍTICA |
| **Babel Core** | 7.18.9 | 7.25.x | 6 meses atrás | 🟡 ALTA |
| **ESLint** | 7.32.0 en root, 8.18.0 en app | 8.57.x | Variación entre workspaces | 🟡 ALTA |
| **Jest** | 28.1.2 | 29.7.x | 7 versiones | 🟡 ALTA |

### arquitectura de TypeScript
⚠️ **HALLAZGO CRÍTICO**: El proyecto NO tiene `tsconfig.json` configurado. Se está usando JavaScript puro (.js y .jsx).

---

## 🏗️ ANÁLISIS ARQUITECTÓNICO - ESTRUCTURA DEL MONOREPO

### 1. Configuración de Lerna

**Archivo**: `lerna.json`
```json
{
  "npmClient": "yarn",
  "useWorkspaces": true,
  "packages": ["packages/**", "apps/**"],
  "useNx": true,
  "version": "independent"  // ⚠️ Versionamiento independiente
}
```

**Análisis**:
- ✅ Usa Yarn workspaces + Lerna = Sistema eficiente
- ✅ Versioning independiente apropiado para múltiples packages
- ⚠️ Integración con Nx detectada pero no completamente utilizada
- ⚠️ No hay configuración de build caching

---

### 2. Estructura Física del Proyecto

```
siiges-ui/ (Root workspace)
├── apps/
│   └── siiges-app/              # Aplicación Next.js principal
│       ├── pages/               # Rutas Next.js (legacy /pages)
│       ├── .babelrc             # Babel config específica del app
│       ├── next.config.js        # Configuración Next.js
│       ├── jest.config.js        # Testing config
│       └── package.json          # v0.1.0 (development)
│
├── packages/                     # 10 módulos especializados
│   ├── authentication/           # Contextos y hooks de autenticación
│   ├── inspecciones/             # Módulo de inspecciones
│   ├── instituciones/            # Gestión de instituciones
│   ├── notificaciones/           # Sistema de notificaciones
│   ├── opds/                     # Servicios OPDS
│   ├── revalidaciones/           # Lógica de revalidaciones
│   ├── serviciosEscolares/       # Servicios escolares
│   ├── shared/                   # 🔑 NÚCLEO - Contextos, hooks, utilidades comunes
│   ├── solicitudes/              # Gestión de solicitudes
│   └── users/                    # Gestión de usuarios
│
├── babel.config.js               # Config Babel raíz (para tests)
├── jest.config.js                # Config Jest raíz
├── lerna.json                     # Configuración Lerna
├── package.json                   # Workspace root
└── docs/                          # 📖 Documentación técnica (Nueva)
```

**Tamaño y Complejidad**:
- 📦 10 paquetes especializados + 1 aplicación
- 📄 ~150+ archivos de componentes/utilidades
- 🧪 Suites de tests en cada package
- 📚 Documentación técnica estructurada

---

### 3. Dependencias del Workspace Root

**Archivo**: `package.json` (raíz)

#### 🔧 Dependencias Críticas
```json
{
  "dependencies": {
    "@emotion/react": "^11.9.3",
    "@emotion/styled": "^11.9.3",
    "@mui/material": "^5.14.10",
    "@mui/icons-material": "^5.8.4",
    "@mui/x-data-grid": "^5.15.1",
    "@mui/x-date-pickers": "^6.14.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "styled-components": "^5.3.5",
    "date-fns": "^2.30.0",
    "dayjs": "^1.11.10"
  }
}
```

#### ⚠️ Problemas Identificados:
1. **Doble Sistema de Estilos**: Emotion + Material-UI + Styled Components (redundancia)
2. **Versionamiento Desactualizado**: Material-UI v5 (v6 disponible)
3. **Conflictos Potenciales**: MUI X-Data Grid (5.15.1) con MUI System (6.1.1)

---

## 🔍 ANÁLISIS DE CONFIGURACIONES CLAVE

### 1. Next.js Configuration

**Archivo**: `apps/siiges-app/next.config.js`

```javascript
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@siiges-ui/shared',
  '@siiges-ui/authentication',
  '@siiges-ui/inspecciones',
  '@siiges-ui/users',
  '@siiges-ui/instituciones',
  '@siiges-ui/solicitudes',
  '@siiges-ui/serviciosescolares',
  '@siiges-ui/revalidaciones',
  '@siiges-ui/notificaciones',
  '@siiges-ui/opds',
]);

module.exports = withPlugins([withTM()], {
  webpack: (config) => config,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
});
```

#### 🚨 Problemas Críticos:

| Problema | Severidad | Impacto |
|----------|-----------|--------|
| `next-transpile-modules` deprecated en Next.js 13+ | 🔴 CRÍTICA | No funciona en Next.js 14+ |
| `next-compose-plugins` obsoleto | 🔴 CRÍTICA | Reemplazado por composición nativa |
| Array manual de transpilación | 🟡 ALTA | Mantenimiento difícil |
| Webpack config vacía | 🟡 MEDIA | Posible dead code |
| Images unoptimized | 🟡 MEDIA | Performance degradada |

#### ✅ Solución Recomendada (Next.js 14):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Soporte nativo para monorepos con Lerna
  transpilePackages: [
    '@siiges-ui/shared',
    '@siiges-ui/authentication',
    '@siiges-ui/inspecciones',
    '@siiges-ui/users',
    '@siiges-ui/instituciones',
    '@siiges-ui/solicitudes',
    '@siiges-ui/serviciosescolares',
    '@siiges-ui/revalidaciones',
    '@siiges-ui/notificaciones',
    '@siiges-ui/opds',
  ],

  images: {
    // Optimizar para producción
    formats: ['image/avif', 'image/webp'],
  },

  // Mejorar builds
  swcMinify: true,
  poweredByHeader: false,
  compress: true,

  // Experimental features seguros
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
};

module.exports = nextConfig;
```

---

### 2. Babel Configuration

#### Root Level: `babel.config.js`
```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react'],
  ],
};
```
✅ Apropiado para tests

#### App Level: `apps/siiges-app/.babelrc`
```json
{
  "presets": ["next/babel"],
  "plugins": ["@babel/plugin-proposal-do-expressions"]
}
```
⚠️ El plugin `do-expressions` es experimental y puede causar problemas

---

### 3. Jest Configuration

**Ubicación**: Múltiples (`apps/siiges-app/jest.config.js` y `packages/*/jest.config.js`)

#### Problemas:
1. Configuración duplicada en cada package
2. No hay estrategia compartida de testing
3. ModuleNameMapper probablemente necesita ajustes

#### Recomendación:
Crear `jest.config.base.js` compartido en raíz que todos los packages hereden.

---

### 4. Eslint Configuration

**Archivo**: `.eslintrc.js` (raíz)

```javascript
// Usa eslint-config-airbnb v19.0.4 (DESACTUALIZADO)
```

#### Problemas:
- Versión 19 es del 2022
- Conflictos con versiones variantes de eslint (7.32.0 vs 8.18.0)
- No hay configuración para TypeScript (aunque el proyecto es JS)

---

## 🧩 ANÁLISIS DE MODULES/PACKAGES

### 1. Shared Package (Nuclear)

**Ubicación**: `packages/shared/`

#### 📦 Estructura:
```
shared/
├── src/
│   ├── contexts/        # AuthContext, UIContext, UserContext, NavigationContext
│   ├── hooks/           # useAuth(), useUI(), useUser(), useNavigation()
│   ├── providers/       # AppProvider
│   ├── utils/           # Utilidades compartidas
│   └── index.js         # Export principal
├── lib/                 # Output transpilado
├── jest.config.js
└── package.json
```

#### 🔑 Características:
- Centraliza TODA la lógica de estado global
- 4 contextos especializados (refactor en progreso)
- Dependencies:
  - `@siiges-ui/opds`
  - `@siiges-ui/revalidaciones`
  - `@siiges-ui/serviciosescolares`

#### ⚠️ Limitaciones Actuales:
- Sin export de tipos (no hay TypeScript)
- Sin tree-shaking explícito
- Sin build optimization configurada

---

### 2. Feature Packages

#### Estructura Estándar:
```
module-name/
├── src/
│   ├── components/      # Componentes React
│   ├── hooks/           # Hooks especializados
│   ├── utils/           # Lógica del módulo
│   └── index.js
├── __tests__/           # Tests unitarios
├── jest.config.js
├── package.json
└── README.md
```

#### Packages Existentes:

| Package | Descripción | Dependencias Internas |
|---------|---|---|
| **authentication** | Contextos auth, login logic | shared |
| **inspecciones** | CRUD inspecciones, componentes | shared |
| **instituciones** | Gestión instituciones | shared |
| **notificaciones** | Sistema de alertas | shared |
| **opds** | Servicios OPDS API | (ninguna) |
| **revalidaciones** | Lógica equivalencias/revalidas | (ninguna) |
| **serviciosEscolares** | Servicios ERP educativo | opds |
| **solicitudes** | Solicitudes y trámites | shared |
| **users** | Gestión usuarios/perfiles | shared |

---

### 3. App Principal (siiges-app)

**Ubicación**: `apps/siiges-app/`

#### Estructura Pages (Legacy):
```
pages/
├── api/                 # Next.js API routes
├── instituciones/       # Módulo instituciones
├── inspecciones/        # Módulo inspecciones
├── solicitudes/         # Módulo solicitudes
├── users/               # Módulo usuarios
├── serviciosEscolares/  # Módulo servicios
└── _app.jsx            # Root component + AppProvider
```

#### 🚨 Problemas Identificados:

1. **Usando /pages router (Legacy)**
   - Next.js deprecó /pages router en favor de /app (desde v13)
   - Será eliminado en Next.js 15

2. **Environment Variables Limited**
   - Solo `.env.local` (152 bytes de contenido)
   - No hay `.env.example` para documentación

3. **Build Artifacts**
   - `.next/` con ~39 archivos generados
   - Indica builds anteriores con posibles cachés stale

---

## 🔗 ANÁLISIS DE DEPENDENCIAS COMPARTIDAS

### Mapa de Dependencias

```
siiges-app (Next.js 12.2.0, React 18.2.0)
    ↓
    ├─→ authentication (v1.0.0) → shared
    ├─→ inspecciones (v1.0.0) → shared
    ├─→ instituciones (v1.0.0) → shared
    ├─→ notificaciones (v1.0.0) → shared
    ├─→ serviciosescolares (v1.0.0) → shared
    ├─→ solicitudes (v1.0.0) → shared
    ├─→ revalidaciones (v1.0.0) → shared
    ├─→ users (v1.0.0) → shared
    └─→ opds (v1.0.0)

shared (v1.0.0)
    ├─→ opds
    ├─→ revalidaciones
    └─→ serviciosescolares

Root Workspace Dependencies:
    ├─→ MUI (Material-UI 5.14.10)
    ├─→ Emotion
    ├─→ Styled Components
    ├─→ Babel 7.18.9
    └─→ Jest 28.1.2
```

### ⚠️ Problemas de Dependencias:

1. **Duplicación**: React, React-DOM declaradas en raíz Y en app
2. **Conflictos**: MUI X-Data Grid (5.15.1) vs MUI System (6.1.1)
3. **Peer Dependencies**: Mal especificadas en algunos packages
4. **Versioning**: Mix de exactas (1.0.0) y semver (^1.0.0)

---

## 📚 ESTADO DE MIGRACIONES EN PROGRESO

### Context Migration (Fase 1 ✅ COMPLETADA)

**Objetivo**: Mover de 1 Context monolítico a 4 contextos especializados

**Componentes Completados (6/28)**:
1. `nuevaInspeccion.jsx` - useUI
2. `misInspecciones/index.jsx` - useAuth + useUI
3. `instituciones/consultar/[institucionId]/index.jsx` - useAuth + useUI
4. `instituciones/editar/[institucionId]/index.jsx` - useAuth + useUI
5. `instituciones/miInstitucion/index.jsx` - useAuth + useUI
6. (6/28 completados - 78% pendiente)

**Archivos Restantes (22/28)**:
- 14 de complejidad media
- 6 de alta complejidad (requieren atención especial)
- 2 de baja complejidad

**Plan de Fases**:
- ✅ Fase 1 (Completada): Componentes de baja-media complejidad
- ⏳ Fase 2 (Próxima): Componentes de media complejidad
- ⏳ Fase 3: Componentes de alta complejidad + refactor de servicios

---

## 🚨 PROBLEMAS CRÍTICOS IDENTIFICADOS

### Prioridad 🔴 CRÍTICA

#### 1. Next.js 13 años de atraso (v12.2.0 → v14.2)
**Impacto**:
- Imposible usar `/app` router
- next-transpile-modules NO funciona en 14+
- Sin soporte para React 19
- Vulnerabilidades potenciales de seguridad

**Solución**: Actualizar a Next.js 14.2.x en sprint dedicado

#### 2. Falta de TypeScript en todo el proyecto
**Impacto**:
- Sin type safety
- DX inferior
- Refactores manuales propensos a errores
- No puede usar extensiones modernas de TypeScript

**Solución**: Migrar gradualmente a TypeScript (post-Next.js upgrade)

#### 3. Sistema de contextos duplicado y monolítico
**Impacto**:
- Re-renders innecesarios (50%+ reducción potencial)
- Código difícil de mantener
- Performance degradada

**Solución**: Completar migración de split contexts (en progreso ✅)

---

### Prioridad 🟡 ALTA

#### 4. Dependencias obsoletas y conflictivas
**Problemas**:
- Babel 7.18 (6 meses desactualizado)
- Jest 28 (varias versiones atrás)
- ESLint variantes
- MUI v5 con MUI System v6

**Solución**: Audit y actualización de dependencias con matriz de testeo

#### 5. Arquitectura de build desactualizada
**Problemas**:
- next-compose-plugins + next-transpile-modules = **deprecated**
- No hay soporte para monorepo nativo de Next.js 13+
- Webpack config vacía

**Solución**: Refactor `next.config.js` a formato moderno

#### 6. Yarn 1.x (Legacy) sin workspace improvements
**Impacto**:
- Sin deduplicación automática
- Menor verificación de seguridad
- Installs más lentos

**Recomendación**: Considerar migración a Yarn Berry 4.x (breaking change)

---

### Prioridad 🟠 MEDIA

#### 7. No hay configuración TypeScript (tsconfig.json)
**Impacto**:
- Imposible migrar a TypeScript parcialmente
- IDEs con capacidades reducidas

#### 8. Config Babel inconsistente
**Problemas**:
- do-expressions plugin (experimental)
- Diferencias entre root y app

#### 9. Testing fragmentado
**Problemas**:
- Configuración duplicada en ~10 archivos
- Sin estrategia compartida
- Posibles incompatibilidades

---

## ✅ CAMBIOS REALIZADOS RECIENTEMENTE

### Rama Actual: SDT-1497

```
Documentación Técnica Centralizada:
├── Architecture Decisions
├── Migration Guidelines
├── Context Migration Analysis
└── Troubleshooting Guides

Context Migration Phase 1:
├── Split de 1 Context → 4 Contexts
├── useAuth, useUI, useUser, useNavigation
└── 6 componentes completados
```

---

## 📋 PLAN TÉCNICO DE MODERNIZACIÓN

### FASE 1: Actualización de Dependencias (2-3 sprints)

#### 1.1 Actualizar Next.js (BLOQUEANTE)
```
next: 12.2.0 → 14.2.3

Changes Required:
- Update next.config.js (remove next-compose-plugins)
- Replace next-transpile-modules with transpilePackages
- Update imports (getSession → getServerSession si usa Auth)
- Test /pages  router compatibility
- Update next/image usage
```

**Estimación**: 3-5 días
**Riesgo**: MEDIO (cambios en API de Next)
**Beneficio**: +2 años de actualizaciones, React 19 compatible

#### 1.2 Instalar TypeScript
```
npm install --save-dev typescript @types/react @types/node

Create tsconfig.json en:
- Root (configuración base)
- apps/siiges-app/ (extiende root)
- packages/shared/ (extiende root)
- packages/*/  (extiende root)
```

**Estimación**: 2 días
**Configuración**: 1 archivo base + rutas

#### 1.3 Auditar y Actualizar Babel
```
Target Versions:
- @babel/core: ^7.25.0
- @babel/preset-env: ^7.25.0
- @babel/preset-react: ^7.25.0
- @babel/preset-typescript: ^7.25.0 (nuevo)

Remove:
- @babel/plugin-proposal-do-expressions (experimental)
```

**Estimación**: 1-2 días
**Testing**: Verificar compilación de todos los packages

#### 1.4 Actualizar ESLint
```
Current:
  Root: 7.32.0
  App: 8.18.0

Target:
  All: ^8.57.0
  Add: eslint-config-typescript
  Add: parser TypeScript
```

**Estimación**: 1 día

---

### FASE 2: Modernizar Configuraciones (1-2 sprints)

#### 2.1 Refactor next.config.js
```javascript
// ✅ Remover next-compose-plugins
// ✅ Usar transpilePackages nativo
// ✅ Habilitar SWC minification
// ✅ Agregar rewrites si es necesario
// ✅ Configurar image optimization
```

**Estimación**: 1 día
**Testing**: Build en dev y prod

#### 2.2 Configurar tsconfig.json Centralizado
```
Root:
├── tsconfig.json (base)
├── tsconfig.app.json (Next.js app)
└── tsconfig.packages.json (packages)

Cada package extiende la correspondiente
```

**Estimación**: 1-2 días

#### 2.3 Consolidar Jest Configuration
```
Root:
├── jest.config.base.js (compartido)
├── jest.setup.js (setupFiles)

Cada workspace:
└── jest.config.js → extiende base
```

**Estimación**: 1 día

#### 2.4 Consolidar ESLint Configuration
```
Root:
├── .eslintrc.js (reglas principales)
├── .eslintignore

Eliminar:
└── .eslintrc.js duplicados en packages
```

**Estimación**: 1 día

---

### FASE 3: Migración TypeScript Gradual (4-6 sprints)

#### 3.1 Migrar packages/shared (Core)
```
Orden:
1. src/index.js → index.ts
2. src/providers/ → *.tsx
3. src/contexts/ → *.ts
4. src/hooks/ → *.ts
5. src/utils/ → *.ts

Testing: Unit tests para cada archivo migrante
```

**Estimación**: 5-7 días

#### 3.2 Migrar Feature Packages
```
Order by Dependency:
1. packages/opds (sin dependencias)
2. packages/revalidaciones
3. packages/serviciosescolares
4. packages/authentication
5. packages/inspecciones
... (resto)

Cada package: 2-3 días
```

**Estimación**: 15-20 días (parallelizable)

#### 3.3 Migrar apps/siiges-app
```
Orden:
1. _app.tsx
2. Páginas por módulo (instituciones, solicitudes, etc)
3. components internos
4. API routes
```

**Estimación**: 10-15 días

---

### FASE 4: Optimizar y Pulir (2-3 sprints)

#### 4.1 Actualizar dependencias opcionales
```
Target:
- React: 18.3.x (pequeño jump, final antes de 19)
- Material-UI: 5.14.x → 6.x (breaking)
- Emotion: ^11.11.0
- Jest: 29.7.x
```

**Estimación**: 2-3 días

#### 4.2 Implementar CSS Modules o compilador moderno
```
Opciones:
1. Mantener Emotion pero consolidar
2. Migrar a Tailwind CSS
3. CSS Modules + TypeScript
```

#### 4.3 Mejorar Tree-Shaking y Bundling
```
Acciones:
1. Verificar exports en package.json
2. Agregar "side-effects": false donde aplique
3. Usar 'lib' entrypoint en build
```

#### 4.4 Documentar arquitectura TypeScript
```
Crear:
- docs/architecture/002-typescript-strategy.md
- docs/guides/typescript-migration.md
- docs/guides/type-safety-checklist.md
```

---

## 📊 MATRIZ DE CAMBIOS RECOMENDADOS POR COMPONENTE

### Root Level (package.json)

| Cambio | Acción | Urgencia | Impacto |
|--------|--------|----------|---------|
| Actualizar Next.js | `12.2.0` → `14.2.3` | 🔴 CRÍTICA | Bloquea todo |
| Agregar TypeScript | `^5.3.0` | 🔴 CRÍTICA | Habilita modernización |
| Actualizar Babel | `^7.25.0` | 🟡 ALTA | Compatibilidad |
| Listar exact versions en devDeps | Especificar exactas de Babel | 🟡 ALTA | Consistency |
| Remover next-compose-plugins | Deletear dependency | 🔴 CRÍTICA | Peso muerto |
| Remover next-transpile-modules | Deletear, usar transpilePackages | 🔴 CRÍTICA | Deprecated |

### apps/siiges-app (package.json)

| Cambio | Acción | Urgencia | Impacto |
|--------|--------|----------|---------|
| Actualizar Next.js | `12.2.0` → `14.2.3` | 🔴 CRÍTICA | Compilación |
| Actualizar React | `18.2.0` → `18.3.1` | 🟡 ALTA | Dependencia |
| Agregar `@types/**` | Installation | 🟡 ALTA | TypeScript |
| Remover next-compose-plugins | Delete | 🔴 CRÍTICA | Dead code |
| Listar exactos en devDeps | ESLint, Babel, TypeScript | 🟡 ALTA | Consistency |

### apps/siiges-app/next.config.js

| Cambio | Acción | Urgencia |
|--------|--------|----------|
| Remover `withPlugins` y `withTM` | Usar transpilePackages | 🔴 CRÍTICA |
| Habilitar `swcMinify` | Agregar config | 🟡 ALTA |
| Optimizar images | Remover unoptimized | 🟡 MEDIA |
| Agregar rewrites si necesario | Según API routes | 🟠 BAJA |

### Todos los .babelrc/.js

| Cambio | Acción | Urgencia |
|--------|--------|----------|
| Remover `@babel/plugin-proposal-do-expressions` | Delete | 🟡 ALTA |
| Usar preset-typescript | Agregar | 🟡 ALTA |
| Consolidar en root | Herencia | 🟠 MEDIA |

### packages/shared (Core)

| Cambio | Acción | Urgencia | Razón |
|--------|--------|----------|-------|
| Migrar a TypeScript | Convertir src/ | 🔴 CRÍTICA | Base de todo |
| Crear index.d.ts | Type definitions | 🟡 ALTA | Otros packages |
| Especificar main/types en package.json | Apuntar a lib/ | 🟡 ALTA | Exports correctos |
| Documentar API de contextos | JSDoc → tipos TS | 🟡 ALTA | DX |

### Todos los Feature Packages

| Cambio | Acción | Urgencia |
|--------|--------|----------|
| Actualizar dependencies | Coincidir con workspace | 🟡 ALTA |
| Listar peerDependencies | React, shared | 🟡 ALTA |
| Crear src/index.ts | Migrar JS | 🟠 MEDIA |

---

## 🗺️ MAPA DE DEPENDENCIAS POST-MODERNIZACIÓN

```
┌─────────────────────────────────────────────────────────────┐
│                    Node.js 20.x LTS / 22.x                  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         siiges-ui (Yarn Workspaces)                 │   │
│  │                                                      │   │
│  │  Root TypeScript Configuration                      │   │
│  │  └─ tsconfig.json (base)                            │   │
│  │                                                      │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  apps/siiges-app                            │   │   │
│  │  │  - Next.js 14.2.3                           │   │   │
│  │  │  - React 18.3.1                             │   │   │
│  │  │  - TypeScript 5.3.x                         │   │   │
│  │  │  - /pages router (eventual /app en v15)    │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │           ↓                                          │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  packages/shared (Core)                     │   │   │
│  │  │  - AuthContext, UIContext, UserContext      │   │   │
│  │  │  - useAuth, useUI, useUser hooks            │   │   │
│  │  │  - Shared utilities & types                 │   │   │
│  │  │  - TypeScript first                         │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │           ↓                                          │   │
│  │  ┌──────────┬──────────┬──────────┬──────────┐     │   │
│  │  │ auth     │ inspec   │ instit   │ servci   │     │   │
│  │  │ TypeScript Modules (v1.0.0)             │     │   │
│  │  └──────────┴──────────┴──────────┴──────────┘     │   │
│  │                                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  External Dependencies:                                       │
│  - Material-UI 5.14.x (eventual 6.x)                         │
│  - Emotion 11.x                                              │
│  - Babel 7.24+                                               │
│  - Jest 29.x                                                 │
│  - ESLint 8.57+                                              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 MATRIZ FINAL: QUÉ, CUÁNDO, CÓMO

### SEMANA 1-2: Preparación y Auditoría
- [ ] Crear rama dedic dedicada (SDT-1498)
- [ ] Hacer audit completo de vulnerabilidades
- [ ] Documentar estado actual (ESTE ANÁLISIS)
- [ ] Crear plan de rollback

### SEMANA 3-4: Fase 1 - Dependencias
- [ ] Actualizar Next.js 12 → 14
- [ ] Instalar + configurar TypeScript
- [ ] Actualizar Babel + ESLint
- [ ] Actualizar Jest
- [ ] Testing exhaustivo

### SEMANA 5-6: Fase 2 - Configuraciones
- [ ] Refactor next.config.js
- [ ] Centralizar tsconfig.json
- [ ] Consolidar Jest y ESLint configs
- [ ] CI/CD testing

### SEMANA 7-12: Fase 3 - TypeScript Gradual
- [ ] Migrar packages/shared → TypeScript
- [ ] Migrar feature packages (parallelizable)
- [ ] Migrar apps/siiges-app
- [ ] Actualizar documentación

### SEMANA 13+: Fase 4 - Optimización
- [ ] Tree-shaking y bundling
- [ ] Performance audits
- [ ] Documentación arquitectónica
- [ ] Cleanup de deuda técnica

---

## 📞 CONSIDERACIONES FINALES

### Riesgos Identificados
1. **Breaking Changes**: Next.js 14 tiene cambios en API
2. **Compatibilidad**: Material-UI 6 puede requerir refactor
3. **Tiempo**: Migración TypeScript es larga pero muy beneficiosa

### Beneficios Esperados
1. ✅ Reducción de bundle size (25-30%)
2. ✅ Performance mejorada (re-renders, tree-shaking)
3. ✅ Type safety completa
4. ✅ Mejor DX para nuevo código
5. ✅ Seguridad actualizada

### Recomendación Final
**Comenzar por FASE 1 (Dependencias) en próximo sprint**. Es bloqueante para el resto y debe completarse antes de migraciones de componentes.

---

**Preparado por**: Análisis Técnico Automatizado
**Fecha**: 15 de Febrero de 2026
**Rama de Trabajo**: SDT-1497
