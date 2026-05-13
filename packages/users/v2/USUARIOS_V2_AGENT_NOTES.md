# Usuarios V2 - Notas de implementacion

## Contexto
Esta version fue reconstruida despues de un rebase contra `develop`, adaptando la implementacion a la arquitectura actual del proyecto:
- `useAuth` desde `@siiges-ui/shared`
- `useNotification` global via `UIProvider`
- `useNavigation` y `findRoute` para integracion con `Layout`
- `AppProvider` en `pages/_app.jsx`

## Objetivo cubierto
- Nueva pagina en `pages/usuariosv2`
- Implementacion nueva en `packages/users/v2`
- Sin tocar la V1 del modulo de usuarios
- Navegacion interna sin cambio de ruta para tabla, ver, crear y editar

## Decisiones tecnicas
- Estado de vista con `VIEW_STATE` + `useReducer`
- Sin `Drawer`; se usa panel inline dentro de la misma pagina
- Service layer separado en `services/usuarios.service.js`
- Permisos centralizados en `utils/permissions.js`
- Formularios con componentes reutilizables de `@siiges-ui/shared`
- Notificaciones centralizadas con `useNotification`
- Requests cancelables con `AbortController`

## Permisos
- Consulta: `representante`, `admin`, `sicyt_editar`
- Crear y editar: `admin`, `representante`

## UX
- Skeleton de carga
- Estado vacio
- Estado de error
- Confirmacion antes de cambiar rol en edicion
- Botones e iconos consistentes con la V1

## Compatibilidad con develop
- Se ajusto `findRoute` en `packages/shared/src/components/Drawer/utils/menuUsers.jsx`
  para que rutas como `/usuariosv2` caigan en la seccion de usuarios del layout.

## Checklist rapido
1. Entrar a `/usuariosv2` con un rol con acceso.
2. Validar que la tabla cargue segun el rol.
3. Abrir ver, crear y editar sin navegar a otra ruta.
4. Confirmar notificaciones de exito y error.
5. Confirmar cambio de rol con dialog.
6. Confirmar que navbar y drawer no muestren warnings por `section`.
