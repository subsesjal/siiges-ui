# siiges UI
Este monorepo contendrá todos los paquetes para el equipo de frontend

## Estructura

[![Open in VSCode](https://img.shields.io/badge/Open%20in-VSCode%20Web-blue?style=for-the-badge)](https://github.dev/Platzi-Master-C9/booking-ui)

```
.
├── apps
│   ├── siiges-app   (nextjs)
└── packages
    ├── autenticacion
    ├── usuario
    ├── solicitudes
    ├── admin-panel
    └── ...others parts of booking-ui

```

## Paso a paso [Como agregar un nuevo paquete]

Define cada uno de los componentes de UI a ser agregado con el siguiente comando

`lerna create @siiges-ui/[your-package-name]`.

### En seguida
Necesitas compartir tu paquete al paquete de `shared`

`lerna add @siiges-ui/[your-package-name] --scope=@siiges-ui/shared`.


### Ejemplo

`lerna create @siiges-ui/autenticacion`

`Output:`

```
lerna create @siiges-ui/autenticacion
lerna notice cli v3.22.1
lerna info versioning independent
package name: (@siiges-ui/autenticacion)
version: (1.0.0)
description: This is the default template that lerna configures.
keywords:
home page: (https://github.com/)
license: (ISC)
entry point: (lib/autenticacion) lib/index.js
git repository: (https://github.com/) |
```

## Como renderizar tu paquete en Next.js siiges-app
Tienes que agrgear el nombre de tu paquete dentro de `const withTM ` para renderizarlo

```
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
  "@siiges-ui/shared",
  "@siiges-ui/autenticacion", <--------- add your package
  "@siiges-ui/usuario"
]);
module.exports = withPlugins([withTM()], {
  webpack: (config) => {
    // custom webpack config
    return config;
  },
  images: {},
});

```

## Directorios

<details>
<summary>Estructura de directorios de manera detallada</summary>

```
.
├── apps
│   └── siiges-app              (NextJS)
│       ├── public/
│       │   └── shared-assets/   (symlink to global static/assets)
│       ├── src/
│       ├── jest.config.js
│       ├── next.config.js
│       ├── package.json         (define package workspace)
│       └── tsconfig.json        (define path to packages)
├── packages
│   ├── autenticacion
│   │   ├── src/
│   │   │    ├── components/
│   │   │    ├── templates/
│   │   │    └── assets/
│   │   ├── package.json
│   │   └── index.js
│   │
│   ├── usuario
│   │   │    ├── components/
│   │   │    ├── templates/
│   │   │    └── assets/
│   │   ├── package.json
│   │   └── index.js
│   │
│   │
│   ├── solicitudes
│   │   │    ├── components/
│   │   │    ├── templates/
│   │   │    └── assets/
│   │   ├── package.json
│   │   └── index.js
│   │
│   │
│   │
│   └── shared  (It will contain all component exports to the app.)
│       ├── src/
│       ├── package.json (It will contain as a dependency
│       │                 each one of the packages to export)
│       └── index.js
│
├── .npmrc
├── dotenv.config.js
├── lerna.json
├── yarn.lock
└── package.json
```

</details>





# Monorepo scripts



| Nombre                       | Descripcion                                                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `yarn bootstrap`           | Instala las dependiendas e inicia symlinks  |
| `yarn start `              | run all packages in paralel                 |
| `yarn start:app `          | run server                                  |
| `yarn build:app`           |                                             |
| `yarn run:build:app`       | Built-in                                    |

