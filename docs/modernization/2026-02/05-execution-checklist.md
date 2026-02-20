# ✅ CHECKLIST DE EJECUCIÓN DETALLADA
**Proyecto**: siiges-ui
**Objetivo**: Modernización de Stack Técnico
**Fecha Inicio**: 15 de Febrero de 2026

---

## 📋 FASE 1: PREPARACIÓN (Duración: 1-2 días)

### 1.1 Setup Inicial
- [ ] Crear rama dedicada
  ```bash
  git checkout main
  git pull origin main
  git checkout -b SDT-1498-dependencies-upgrade
  ```

- [ ] Verificar estado actual
  ```bash
  node --version  # Debe ser v20.x o v22.x
  npm --version
  yarn --version
  git status  # Debe estar limpio
  ```

- [ ] Crear archivo de backup
  ```bash
  cp package.json package.json.backup
  cp yarn.lock yarn.lock.backup
  cp -r node_modules/ node_modules.backup/
  ```

- [ ] Documentar baseline
  ```bash
  yarn list --depth=0 > BASELINE_DEPENDENCIES.txt
  du -sh node_modules > BASELINE_SIZE.txt
  yarn build 2>&1 | tee BASELINE_BUILD.log
  ```

### 1.2 Auditoría de Seguridad
- [ ] Ejecutar audit
  ```bash
  yarn audit
  # Documentar vulnerabilities
  yarn audit > SECURITY_AUDIT.txt
  ```

- [ ] Revisar compatibilidad crítica
  ```bash
  # Verificar que Next.js 14 es compatible con nuestro código
  # Revisar change logs:
  # - https://nextjs.org/blog/next-14
  # - https://blog.getreact.org/react-18-3-release
  ```

- [ ] Documentar decisiones
  ```bash
  cat > UPGRADE_DECISIONS.md << 'EOF'
  ## Decisiones de Actualización

  ### Kept at Current Version
  - date-fns: 2.30.0 (v3.x tiene breaking changes)
  - styled-components: 5.3.x (v6 not adopted yet)
  - lerna: 5.1.6 (migration to 8.x is optional future)

  ### Updated Versions
  - Next.js: 12.2.0 → 14.2.3
  - React: 18.2.0 → 18.3.1
  - Babel: 7.18.9 → 7.25.2
  - TypeScript: NEW → 5.3.3

  ### Rationale
  [Document per version why chosen]
  EOF
  ```

### 1.3 Crear Plan de Testing
- [ ] Identificar conjuntos de pruebas críticos
  ```bash
  # Pages que requieren testing:
  find apps/siiges-app/pages -name "*.jsx" | wc -l
  # ~20-30 páginas principales

  # Componentes críticos:
  find packages/ -path "*/src/**" -name "*.jsx" | wc -l
  # ~100+ componentes
  ```

- [ ] Crear matriz de testing
  ```bash
  cat > TEST_MATRIX.md << 'EOF'
  ## Matrix de Testing

  ### Smoke Tests (Deben pasar TODOS)
  1. App starts: yarn dev
  2. Build succeeds: yarn build
  3. ESLint clean: yarn lint
  4. Tests pass: yarn test

  ### Functional Tests (Muestreo)
  1. Login flow (authentication module)
  2. Institution listing (instituciones module)
  3. Request creation (solicitudes module)
  4. Upload file (file dropzone)

  ### Performance Tests
  1. Bundle size < 500KB
  2. Build time < 60s
  3. LCP < 2s

  ### Browser Tests
  - Chrome/Edge 120+
  - Firefox 122+
  - Safari 17+
  EOF
  ```

---

## 📦 FASE 2: ACTUALIZACIÓN DE DEPENDENCIAS (Duración: 3-4 días)

### 2.1 Actualizar Babel (Día 1)
- [ ] Actualizar packages individuales
  ```bash
  yarn upgrade \
    @babel/core@^7.25.2 \
    @babel/cli@^7.25.2 \
    @babel/preset-env@^7.25.2 \
    @babel/preset-react@^7.24.7 \
    @babel/generator@^7.25.2 \
    @babel/code-frame@^7.24.7
  ```

- [ ] Limpiar duplicados
  ```bash
  yarn dedupe
  ```

- [ ] Verificar build
  ```bash
  yarn build 2>&1 | tee BUILD_AFTER_BABEL.log
  grep -i error BUILD_AFTER_BABEL.log || echo "✓ Build succeeded"
  ```

- [ ] Verificar tamaño
  ```bash
  du -sh node_modules > SIZE_AFTER_BABEL.txt
  ```

### 2.2 Agregar TypeScript (Día 1)
- [ ] Instalar dependencias TypeScript
  ```bash
  yarn add -D \
    typescript@^5.3.3 \
    @types/node@^20.12.5 \
    @types/react@^18.3.1 \
    @types/react-dom@^18.3.0 \
    @types/jest@^29.5.12
  ```

- [ ] Instalar preset TypeScript en Babel
  ```bash
  yarn add -D @babel/preset-typescript@^7.24.7
  ```

- [ ] Actualizar babel.config.js
  ```bash
  cat > babel.config.js << 'EOF'
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
EOF
  ```

- [ ] Verificar estiño
  ```bash
  yarn build
  ```

### 2.3 Consolidar Material-UI (Día 2)
- [ ] Actualizar todas las versiones MUI a v5.15.x
  ```bash
  yarn upgrade \
    @mui/material@^5.15.4 \
    @mui/icons-material@^5.15.4 \
    @mui/system@^5.15.4 \
    @mui/x-data-grid@^5.17.20 \
    @mui/x-date-pickers@^6.17.0
  ```

- [ ] Actualizar otras dependencias importantes
  ```bash
  yarn upgrade \
    @emotion/react@^11.11.1 \
    @emotion/styled@^11.11.1 \
    react@^18.3.1 \
    react-dom@^18.3.1
  ```

- [ ] Verificar build
  ```bash
  yarn build
  yarn test --passWithNoTests  # Si hay tests
  ```

- [ ] Documentar cambios
  ```bash
  cat >> UPGRADE_LOG.md << 'EOF'
## 2026-02-15 MUI Consolidation
- Fixed version mismatch between @mui/material and others
- Upgraded from v5.8.4/5.14.10 to v5.15.4 unified
- Kept @mui/x-date-pickers at v6 (compatible with v5)
EOF
  ```

### 2.4 Actualizar Next.js (Día 2-3)
- [ ] Instalar versiones correctas
  ```bash
  cd apps/siiges-app
  yarn upgrade next@^14.2.3
  ```

- [ ] Instalar dependencias relacionadas
  ```bash
  yarn add -D \
    eslint-config-next@^14.2.3 \
    @types/node@^20.12.5 \
    @types/react@^18.3.1 \
    @types/react-dom@^18.3.0
  ```

- [ ] Remover dependencias deprecated
  ```bash
  yarn remove next-compose-plugins next-transpile-modules
  cd ../..
  yarn remove next-compose-plugins next-transpile-modules
  ```

- [ ] Actualizar next.config.js
  ```bash
  cat > apps/siiges-app/next.config.js << 'EOF'
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
EOF
  ```

- [ ] Actualizar .babelrc del app
  ```bash
  cat > apps/siiges-app/.babelrc << 'EOF'
{
  "presets": ["next/babel"]
}
EOF
  ```

- [ ] Prueba de compilación
  ```bash
  yarn build 2>&1 | tee BUILD_NEXT14.log
  ```

- [ ] Revisar logs de warnings
  ```bash
  grep -i "deprecated\|warning" BUILD_NEXT14.log
  ```

### 2.5 Actualizar ESLint y Herramientas (Día 3)
- [ ] Actualizar ESLint
  ```bash
  yarn upgrade \
    eslint@^8.57.0 \
    eslint-plugin-react@^7.34.2 \
    eslint-plugin-import@^2.29.1 \
    eslint-plugin-jsx-a11y@^6.8.0 \
    eslint-config-airbnb@^19.0.4
  ```

- [ ] Actualizar Jest
  ```bash
  yarn upgrade \
    jest@^29.7.0 \
    babel-jest@^29.7.0 \
    jest-environment-jsdom@^29.7.0 \
    @testing-library/react@^14.1.2 \
    @testing-library/jest-dom@^6.1.5 \
    @testing-library/dom@^9.3.4 \
    @testing-library/user-event@^14.5.1
  ```

- [ ] Actualizar otros tools
  ```bash
  yarn upgrade \
    @commitlint/cli@^19.0.0 \
    @commitlint/config-conventional@^19.0.0 \
    husky@^9.0.0 \
    msw@^2.1.1
  ```

- [ ] Verificar lint
  ```bash
  yarn lint 2>&1 | tee LINT_RESULTS.log
  # Corregir problemas encontrados
  ```

- [ ] Cleanar lint automáticamente
  ```bash
  yarn lint:fix
  git add .
  git commit -m "chore: fix eslint issues after upgrade"
  ```

### 2.6 Verificar y Deduplicar (Día 3)
- [ ] Deduplicar dependencias
  ```bash
  yarn dedupe --mode=highest
  ```

- [ ] Verificar integridad
  ```bash
  yarn check 2>&1 | tee YARN_CHECK.log
  ```

- [ ] Limpiar locks
  ```bash
  yarn install --frozen-lockfile
  yarn cache clean
  ```

- [ ] Documentar cambios
  ```bash
  cat > DEPENDENCIES_UPDATED.md << 'EOF'
## Actualización de Dependencias - 2026-02-15

### Resumen
- Babel: 7.18.9 → 7.25.2
- Next.js: 12.2.0 → 14.2.3
- React: 18.2.0 → 18.3.1
- TypeScript: NUEVO 5.3.3
- ESLint: 7.32.0/8.18.0 → 8.57.0
- Jest: 28.1.2 → 29.7.0
- MUI: Consolidada a 5.15.4

### Removed
- next-compose-plugins (deprecated)
- next-transpile-modules (deprecated)

### New Files
- tsconfig.json (root)

### Testing Status
[Results after testing]
EOF
  ```

---

## ⚙️ FASE 3: CONFIGURACIÓN (Duración: 2 días)

### 3.1 Crear tsconfig.json
- [ ] Crear archivo base
  ```bash
  cat > tsconfig.json << 'EOF'
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
  "exclude": ["node_modules", "**/node_modules", "**/.next", "**/lib"]
}
EOF
  ```

- [ ] Crear tsconfig para app
  ```bash
  cat > apps/siiges-app/tsconfig.json << 'EOF'
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
  ```

- [ ] Validär
  ```bash
  npx tsc --noEmit 2>&1 | head -20
  # Esperado: pocas/ninguna error (es JavaScript todavía)
  ```

### 3.2 Consolidar Jest Configuration
- [ ] Crear jest.config.base.js
  ```bash
  cat > jest.config.base.js << 'EOF'
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/testUtils',
  ],
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [],
  moduleNameMapper: {
    '^@siiges-ui/(.*)$': '<rootDir>/../../packages/$1/src',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/__tests__/**/*.test.[jt]s?(x)',
  ],
  verbose: true,
};
EOF
  ```

- [ ] Actualizar jest.config.js root
  ```bash
  cat > jest.config.js << 'EOF'
const baseConfig = require('./jest.config.base');

module.exports = baseConfig;
EOF
  ```

- [ ] Actualizar cada jest.config.js en packages
  ```bash
  for pkg in packages/*/; do
    cat > "${pkg}jest.config.js" << 'EOF'
const path = require('path');
const base = require('../../jest.config.base');

module.exports = {
  ...base,
  rootDir: __dirname,
  testMatch: [
    '<rootDir>/__tests__/**/*.test.[jt]s?(x)',
  ],
};
EOF
  done
  ```

- [ ] Verificar tests
  ```bash
  yarn test --passWithNoTests 2>&1 | tee TEST_RESULTS.log
  ```

### 3.3 Consolidar ESLint
- [ ] Crear .eslintignore si no existe
  ```bash
  cat > .eslintignore << 'EOF'
node_modules
.next
out
build
dist
coverage
*.config.js
EOF
  ```

- [ ] Actualizar .eslintrc.js
  ```bash
  cat > .eslintrc.js << 'EOF'
module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  env: {
    browser: true,
    es2020: true,
    jest: true,
    node: true,
  },
  rules: {
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'off',
    'import/extensions': ['error', 'ignore'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript'],
    },
  ],
};
EOF
  ```

- [ ] Verificar lint
  ```bash
  yarn lint --max-warnings 0 2>&1 | head -50
  ```

### 3.4 Actualizar Next.js Config
- [ ] Revisión final
  ```bash
  cat apps/siiges-app/next.config.js
  ```

- [ ] Verificar que esté correcto
  ```bash
  cd apps/siiges-app
  nodejs -e "require('./next.config.js')"
  echo "✓ next.config.js is valid JavaScript"
  cd ../..
  ```

---

## 🧪 FASE 4: TESTING (Duración: 2-3 días)

### 4.1 Build Tests
- [ ] Clean build
  ```bash
  rm -rf node_modules yarn.lock
  yarn install
  ```

- [ ] Root build
  ```bash
  yarn build 2>&1 | tee FULL_BUILD.log
  echo "Exit code: $?"
  ```

- [ ] App build
  ```bash
  cd apps/siiges-app
  yarn build 2>&1 | tee BUILD.log
  echo "Exit code: $?"
  cd ../..
  ```

- [ ] Verificar bundle size
  ```bash
  ls -lh apps/siiges-app/.next/static/chunks/
  du -sh apps/siiges-app/.next/
  ```

- [ ] Documentar
  ```bash
  cat >> BUILD_METRICS.md << 'EOF'
## Build Metrics - Post Upgrade

Date: $(date)
Build Time: $(grep "compiled" FULL_BUILD.log | tail -1)
Next Build Time: [from BUILD.log]
Bundle Size: [from .next/]
Page Count: [number of pages]
EOF
  ```

### 4.2 Linting Tests
- [ ] ESLint completo
  ```bash
  yarn lint 2>&1 | tee LINT_FULL.log
  ERROR_COUNT=$(grep -c "error" LINT_FULL.log || echo "0")
  echo "Total errors: $ERROR_COUNT"
  ```

- [ ] Autofix
  ```bash
  yarn lint:fix
  git add .
  git commit -m "chore: fix linting issues"
  ```

- [ ] Verificar nuevamente
  ```bash
  yarn lint
  ```

### 4.3 Unit Tests
- [ ] Run all tests
  ```bash
  yarn test --coverage 2>&1 | tee TEST_COVERAGE.log
  ```

- [ ] Cheque coverage
  ```bash
  grep -A 5 "coverage" TEST_COVERAGE.log
  ```

### 4.4 Manual Testing
- [ ] Dev server start
  ```bash
  yarn dev &
  SERVER_PID=$!
  sleep 10  # Esperar a que start
  curl -s http://localhost:3001 || echo "Server not responding"
  ```

- [ ] Check critical pages
  ```bash
  PAGES=(
    "http://localhost:3001/instituciones"
    "http://localhost:3001/solicitudes"
    "http://localhost:3001/usuarios"
  )

  for page in "${PAGES[@]}"; do
    echo "Testing: $page"
    curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" "$page"
  done
  ```

- [ ] Stop server
  ```bash
  kill $SERVER_PID
  ```

### 4.5 Smoke Test Checklist
- [ ] Yarn dependencies install cleanly
- [ ] yarn build succeeds
- [ ] yarn lint passes
- [ ] yarn test passes
- [ ] yarn dev starts
- [ ] Pages load in browser
- [ ] No console errors
- [ ] No security vulnerabilities

---

## 📝 FASE 5: DOCUMENTACIÓN (Duración: 1 día)

### 5.1 Update README
- [ ] Actualizar versiones en README.md
- [ ] Agregar instrucciones para setup
- [ ] Documentar breaking changes

### 5.2 Crear Changelog
- [ ] Documentar todos los cambios
  ```bash
  cat > docs/changelog/2026-02-15-major-upgrade.md << 'EOF'
# Major Dependency Upgrade - 2026-02-15

## Updated Versions
- Next.js: 12.2.0 → 14.2.3
- React: 18.2.0 → 18.3.1
- Babel: 7.18.9 → 7.25.2
- TypeScript: NEW 5.3.3
- ESLint: 8.x
- Jest: 29.x

## Breaking Changes
[List any breaking changes]

## Migration Guide
[Step-by-step for other devs]

## Performance Impact
[Before/after metrics]
EOF
  ```

### 5.3 Crear Migration Guide
- [ ] Escribir guía de setup
  ```bash
  cat > docs/guides/post-upgrade-setup.md << 'EOF'
# Setup After Major Upgrade

## Install Dependencies
yarn install

## First Build
yarn build

## Run Dev Server
yarn dev

## Known Issues
1. [Issue 1]
2. [Issue 2]

## Reporting Problems
If you encounter issues:
1. Check this guide
2. Check GitHub issues
3. Contact team
EOF
  ```

### 5.4 Actualizar Decision Log
- [ ] Documentar por qué se eligió cada versión
- [ ] Documentar qué se probó
- [ ] Documentar performance metrics

---

## ✅ FASE 6: FINAL CHECKS (Duración: 1 día)

### 6.1 Pre-Merge Checklist
- [ ] Toda la rama está commiteada
- [ ] No hay archivos untracked críticos
- [ ] Build succeeds
- [ ] Tests pass
- [ ] Lint clean
- [ ] Documentación actualizada
- [ ] CHANGELOG.md actualizado

### 6.2 Code Review
- [ ] Auto-request reviews: @team
- [ ] Address all comments
- [ ] Second approval

### 6.3 Merge to Main
```bash
git checkout develop
git pull origin develop
git merge --no-ff SDT-1498-dependencies-upgrade
git push origin develop
```

### 6.4 Deploy to Staging
- [ ] Deploy code to staging
- [ ] Run smoke tests
- [ ] Performance check
- [ ] Browser testing

### 6.5 Production Readiness
- [ ] Schedule production deploy
- [ ] Create deployment plan
- [ ] Have rollback plan ready
- [ ] Monitor logs during deploy

---

## 🆘 TROUBLESHOOTING

### Problema: Build fails after Babel update
```
Solución:
1. Check babel.config.js syntax
2. Reinstall @babel/core
3. Clear node_modules and reinstall
```

### Problema: Next.js compilation error
```
Solución:
1. Check transpilePackages array
2. Verify all packages exist
3. Check for circular dependencies
```

### Problema: Type errors in TypeScript
```
Solución:
1. tsconfig.json might be too strict
2. Use skipLibCheck: true temporarily
3. Gradually fix issues
```

---

## 📊 CHECKLIST DE SIGNOFF FINAL

- [ ] Todos los tests pasan
- [ ] Build time < 60 segundos
- [ ] Bundle size no aumentó
- [ ] No hay breaking changes
- [ ] Documentación actualizada
- [ ] Team notificado
- [ ] Rollback plan tested
- [ ] Ready for production

**Signed Off By**: _________________
**Date**: _________________

---

**Creado**: 15 de Febrero de 2026
