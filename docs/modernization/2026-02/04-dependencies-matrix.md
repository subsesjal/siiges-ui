# MATRIZ DE DEPENDENCIAS Y PLAN DE ACTUALIZACIÓN
**Generado**: 15 de Febrero de 2026

---

## 📊 ANÁLISIS DETALLADO DE DEPENDENCIAS

### Dependencias de Producción (Root)

#### Tier 1: CRÍTICAS (Necesitan actualización urgente)

```
┌─────────────────────┬──────────┬──────────┬──────────┬────────────────────┐
│ Librería            │ Actual   │ Última   │ Versiones | Recomendación     │
├─────────────────────┼──────────┼──────────┼──────────┼────────────────────┤
│ @babel/cli          │ 7.18.9   │ 7.25.2   │ 7 años   │ → 7.25.2          │
│ @emotion/react      │ 11.9.3   │ 11.11.1  │ 2 ago    │ → 11.11.1         │
│ @emotion/styled     │ 11.9.3   │ 11.11.1  │ 2 ago    │ → 11.11.1         │
│ @mui/icons-material │ 5.8.4    │ 5.15.x   │ ~1 año   │ → 5.15.x ANTES v6 │
│ @mui/material       │ 5.14.10  │ 5.15.x   │ ~6 meses │ → 5.15.x ANTES v6 │
│ @mui/system         │ 6.1.1    │ 6.1.2    │ Actual   │ → 6.1.2 (CONFLICT)│
│ @mui/x-data-grid   │ 5.15.1   │ 5.17.x   │ Antigua  │ → 5.17.x (ANTES v7)│
│ @mui/x-date-picker │ 6.14.0   │ 7.x      │ ~1 año   │ → 6.17.x          │
├─────────────────────┼──────────┼──────────┼──────────┼────────────────────┤
│ date-fns            │ 2.30.0   │ 3.x      │ ~1 año   │ → 2.30.0 (v3 breaking) │
│ dayjs               │ 1.11.10  │ 1.11.12  │ ~6 meses │ → 1.11.12         │
│ react               │ 18.2.0   │ 19.x     │ ~1 año   │ → 18.3.1 primero  │
│ react-dom           │ 18.2.0   │ 19.x     │ ~1 año   │ → 18.3.1 primero  │
│ styled-components   │ 5.3.5    │ 6.1.x    │ ~8 meses │ → 5.3.11 (v6=breaking)│
└─────────────────────┴──────────┴──────────┴──────────┴────────────────────┘
```

#### Tier 2: IMPORTANTES (Actualizar en FASE 1)

```
┌─────────────────────┬──────────┬──────────┬────────────────────────────┐
│ Librería            │ Actual   │ Recomend │ Notasías                   │
├─────────────────────┼──────────┼──────────┼────────────────────────────┤
│ ajv                 │ 8.12.0   │ 8.14.0   │ Validador JSON             │
│ cookie              │ 0.5.0    │ 0.7.0    │ Manipulación cookies       │
│ jspdf               │ 2.5.1    │ 2.5.2    │ PDF generation             │
│ mui-file-dropzone   │ 4.0.2    │ 4.0.3    │ File upload component      │
│ react-cookie        │ 4.1.1    │ 7.x      │ React cookie management   │
└─────────────────────┴──────────┴──────────┴────────────────────────────┘
```

### Dependencias de Desarrollo (Root)

#### Tier 1: CRÍTICAS

```
┌──────────────────────────────┬──────────┬──────────┬─────────────────┐
│ Librería                     │ Versión  │ Última   │ Acción          │
├──────────────────────────────┼──────────┼──────────┼─────────────────┤
│ @babel/core                  │ 7.18.9   │ 7.25.2   │ → 7.25.2        │
│ @babel/preset-env            │ 7.18.9   │ 7.25.2   │ → 7.25.2        │
│ @babel/preset-react          │ 7.18.6   │ 7.24.x   │ → 7.24.x        │
│ @commitlint/*                │ 17.0.x   │ 19.x     │ → 19.x (optional)│
│ @testing-library/dom         │ 8.16.0   │ 10.x     │ → 10.x          │
│ @testing-library/jest-dom    │ 5.16.4   │ 6.x      │ → 5.16.5 (safe) │
│ @testing-library/react       │ 13.3.0   │ 14.x     │ → 14.x          │
│ babel-jest                   │ 28.1.3   │ 29.7.0   │ → 29.7.0        │
│ eslint                        │ 7.32.0   │ 8.57.0   │ → 8.57.0        │
│ eslint-config-airbnb         │ 19.0.4   │ 19.0.4   │ KEEP (última)    │
│ eslint-plugin-react          │ 7.28.0   │ 7.34.2   │ → 7.34.2        │
│ jest                         │ 28.1.2   │ 29.7.0   │ → 29.7.0        │
│ lerna                        │ 5.1.6    │ 8.1.5    │ → 8.x (OPTIONAL)│
├──────────────────────────────┼──────────┼──────────┼─────────────────┤
│ NUEVAS DEPENDENCIAS (agregar):                                       │
├──────────────────────────────┼──────────┼──────────┼─────────────────┤
│ TypeScriptuart               │ -        │ 5.3.3    │ → 5.3.3 (nuevo) │
│ @types/react                 │ -        │ 18.3.x   │ → 18.3.x (nuevo)│
│ @types/react-dom             │ -        │ 18.3.x   │ → 18.3.x (nuevo)│
│ @types/node                  │ -        │ 20.x     │ → 20.x (nuevo)  │
│ @types/jest                  │ -        │ 29.x     │ → 29.x (nuevo)  │
└──────────────────────────────┴──────────┴──────────┴─────────────────┘
```

---

## 🔴 CONFLICTOS DE DEPENDENCIAS IDENTIFICADOS

### Conflicto 1: Material-UI Versiones Mixtas

```
Problema:
├─ @mui/material: 5.14.10
├─ @mui/icons-material: 5.8.4  ⚠️ VERSIÓN VIEJA
├─ @mui/x-data-grid: 5.15.1
├─ @mui/x-date-pickers: 6.14.0  ⚠️ VERSIÓN DIFERENTE (v6!)
└─ @mui/system: 6.1.1  ⚠️ VERSIÓN v6 CON v5 OTROS!

Costo:
- Código duplicado en node_modules
- Comportamiento inconsistente
- Mayor tamaño de bundle

Solución Recomendada:
Option 1: Todas a 5.x antes de v6 (RECOMENDADO)
  @mui/material: 5.15.x
  @mui/icons-material: 5.15.x
  @mui/x-data-grid: 5.17.x
  @mui/x-date-pickers: 6.x (es compatible con 5.x)
  @mui/system: 5.x

Option 2 (Future): Upgrade a v6 completo
  Requiere testing exhaustivo + posibles cambios en CSS
```

### Conflicto 2: React Versioning

```
Actual:
├─ react: 18.2.0    (en root)
└─ react: 18.2.0    (en app)

Problema: Duplicación innecesaria
Solución: Heredar del workspace jroot en vez de duplicar
```

### Conflicto 3: Babel Configuration

```
Root (.babel.config.js):
└─ @babel/preset-react (junto con @babel/preset-env)

App (.babelrc):
└─ "next/babel"  (asume default de Next.js)

Plugin adicional (app):
└─ @babel/plugin-proposal-do-expressions  ⚠️ EXPERIMENTAL

Problema:
- Plugin experimental puede causar issues en compilación
- Configuración duplicada e inconsistente

Solución:
1. Remover do-expressions plugin
2. Usar solo "next/babel" en app
3. Mantener root para tests
```

---

## 🗂️ PLAN DE ACTUALIZACIÓN POR PAQUETE

### Step 1: Actualizar Root Workspace

```json
{
  "dependencies": {
    "@babel/cli": "^7.25.2",
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.1",
    "@mui/icons-material": "^5.15.4",
    "@mui/material": "^5.15.4",
    "@mui/system": "^5.15.4",
    "@mui/x-data-grid": "^5.17.20",
    "@mui/x-date-pickers": "^6.17.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "date-fns": "^2.30.0",
    "dayjs": "^1.11.12"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@babel/preset-env": "^7.25.2",
    "@babel/preset-react": "^7.24.7",
    "@babel/preset-typescript": "^7.24.7",
    "@types/node": "^20.12.5",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "eslint": "^8.57.0",
    "jest": "^29.7.0",
    "typescript": "^5.3.3"
  }
}
```

### Step 2: Actualizar apps/siiges-app

```json
{
  "dependencies": {
    "next": "^14.2.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^20.12.5",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.3",
    "typescript": "^5.3.3"
  }
}
```

### Step 3: Archivos de Configuración Actualizados

#### babel.config.js (Root)
```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
```

#### .babelrc (apps/siiges-app)
```json
{
  "presets": ["next/babel"]
}
```

#### next.config.js (apps/siiges-app)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
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
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
```

#### tsconfig.json (Root)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@siiges-ui/*": ["packages/*/src"]
    }
  },
  "include": ["packages", "apps"],
  "exclude": ["node_modules", "**/node_modules", "**/.next"]
}
```

---

## ⏱️ CRONOGRAMA DE ROLLOUT

### Pre-Actualización (1-2 días)
1. Backup completo de rama actual
2. Crear branch de desarrollo: `SDT-1498-dependencies-upgrade`
3. Documentar proceso de rollback
4. Notificar al equipo

### Fase 1: Actualización Segura (Days 1-2)
```bash
# Day 1: Back up
git checkout -b backup/pre-upgrade

# Day 1: Install New Versions
cd /path/to/project
yarn upgrade @babel/core@^7.25.2 \
             @babel/preset-env@^7.25.2 \
             typescript@^5.3.3 \
             @types/react@^18.3.1 \
             @types/react-dom@^18.3.0 \
             @types/node@^20.12.5

# Day 2: MUI Consolidation
yarn upgrade @mui/material@^5.15.4 \
             @mui/icons-material@^5.15.4 \
             @mui/system@^5.15.4 \
             @mui/x-data-grid@^5.17.20 \
             @mui/x-date-pickers@^6.17.0

# Day 2: Next.js Upgrade
yarn upgrade next@^14.2.3

# Day 2: Testing
yarn dedupe
yarn check
yarn build
yarn test test:all
```

### Fase 2: Configuration Updates (1 día)
1. Update next.config.js with transpilePackages
2. Create/Update:
   - tsconfig.json (root)
   - babel.config.js (root)
   - .babelrc (apps/siiges-app)
3. Remove deprecated config
4. Run linting and builds

### Fase 3: Testing & Validation (2-3 días)
1. Full end-to-end testing
2. Performance profiling (bundle size, load times)
3. Browser compatibility testing
4. Accessibility validation

### Fase 4: Deployment (1 día)
1. Code review
2. Merge to develop
3. Deploy to staging
4. Monitor for issues

---

## 🚨 ROLLBACK PROCEDURE

Si algo sale mal:

```bash
# Rápido (mismo día):
git reset --hard HEAD~N
git clean -fd

# O revert específicos:
git revert <commit-sha>

# Full restart:
git checkout backup/pre-upgrade
rm -rf node_modules yarn.lock
yarn install
```

---

## 📋 CHECKLIST PRE-INÍCIO

- [ ] Toda confirmaciones commiteadas
- [ ] Rama de backup creada
- [ ] CI/CD configurado
- [ ] Equipo notificado
- [ ] Documentación actualizada
- [ ] Testing environment ready
- [ ] Performance baseline established
- [ ] Rollback plan documented

---

## 📈 MÉTRICAS A MONITOREAR

### Antes
- Bundle size: ~500KB+ (estimado)
- Build time: ~45-60 segundos
- Node modules: ~800MB

### Después (Esperado)
- Bundle size: ~450KB (-10%)
- Build time: ~30-40 segundos (-30%)
- Node modules: ~750MB (-6%)
- LCP: Mejorado
- CLS: Estable

---

**Generado**: 15 de Febrero de 2026
