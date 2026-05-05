# Matriz de Referencia Rápida & Checklist
## 28 Archivos JSX - Plan de Migración de Context a Hooks

---

## 🎯 MATRIZ DE MIGRACIÓN RÁPIDA

| # | Archivo | Línea | Hooks Necesarios | Complejidad | Status | Sprint |
|----|---------|---------|--|--|--|--|
| 1 | nuevaInspeccion.jsx | 18 | useUI | 🟡 Media | ⬜ | 3 |
| 2 | misInspecciones/index.jsx | 8 | useAuth, useUI | 🔴 Alta | ⬜ | 3 |
| 3 | instituciones/consultar/[institucionId]/index.jsx | 4 | useAuth, useUI | 🟡 Media | ⬜ | 2 |
| 4 | instituciones/editar/[institucionId]/index.jsx | 4 | useAuth, useUI | 🟡 Media | ⬜ | 2 |
| 5 | instituciones/index.jsx | 6 | useAuth | 🟢 Baja | ⬜ | 2 |
| 6 | instituciones/miInstitucion/index.jsx | 33 | useAuth, useUI | 🟡 Media | ⬜ | 2 |
| 7 | notificaciones/index.jsx | 43 | useAuth | 🟡 Media | ⬜ | 2 |
| 8 | serviciosEscolares/egresados/index.jsx | 6 | useUI | 🟢 Baja | ⬜ | 1 |
| 9 | serviciosEscolares/programas/[id]/editPrograma.jsx | 18 | useAuth | 🟡 Media | ⬜ | 2 |
| 10 | Equivalencias/procesar/index.jsx | 15 | useUI, useNavigation | 🟡 Media | ⬜ | 2 |
| 11 | Equivalencias/revisar/index.jsx | 16 | useUI, useNavigation | 🔴 Alta | ⬜ | 3 |
| 12 | Revalidacion/procesar/index.jsx | 14 | useUI, useNavigation | 🟡 Media | ⬜ | 2 |
| 13 | Revalidacion/revisar/index.jsx | 11 | useUI, useNavigation | 🟡 Media | ⬜ | 2 |
| 14 | servicioSocial/crear/index.jsx | 7 | useUI | 🟢 Baja | ⬜ | 1 |
| 15 | solicitudesFolios/admin/[id]/folios.jsx | 29 | useUI | 🔴 Alta | ⬜ | 3 |
| 16 | solicitudesFolios/alumnos/[id]/certificados/index.jsx | 45 | useUI | 🟡 Media | ⬜ | 2 |
| 17 | solicitudesFolios/alumnos/[id]/titulos/index.jsx | 44 | useUI | 🟡 Media | ⬜ | 2 |
| 18 | solicitudesFolios/index.jsx | 6 | useAuth, useUI | 🟡 Media | ⬜ | 2 |
| 19 | titulacion/index.jsx | 6 | useUI | 🟢 Baja | ⬜ | 1 |
| 20 | solicitudes/detallesSolicitudes/[id]/index.jsx | 14 | useAuth, useUI | 🟡 Media | ⬜ | 2 |
| 21 | solicitudes/detallesSolicitudes/[id]/recepcionFormatos/index.jsx | 37 | useAuth, useUI | 🔴 Alta | ⬜ | 3 |
| 22 | solicitudes/index.jsx | 14 | useAuth | 🟡 Media | ⬜ | 2 |
| 23 | solicitudesBecas/crear/index.jsx | 6 | useUI | 🟢 Baja | ⬜ | 1 |
| 24 | tituloElectronico/[folio]/consultarFolio.jsx | 18 | useUI | 🔴 Alta | ⬜ | 3 |
| 25 | usuarios/consultar/[usuarioId]/index.jsx | 10 | useAuth | 🟡 Media | ⬜ | 2 |
| 26 | usuarios/crear/index.jsx | 7 | useAuth | 🟢 Baja | ⬜ | 1 |
| 27 | usuarios/editar/[usuarioId]/index.jsx | 8 | useAuth | 🟡 Media | ⬜ | 2 |
| 28 | usuarios/perfilUsuario/index.jsx | 9 | useAuth | 🟡 Media | ⬜ | 2 |

**Leyenda Status:**
- ⬜ No iniciado
- 🟨 En proceso
- ✅ Completado

---

## 📅 PLAN DE SPRINTS RECOMENDADO

### **📌 SPRINT 1 (Semana 1) - BAJA COMPLEJIDAD**
**Objetivo:** Validar proceso de migración
**Archivos:** 8
**Esfuerzo estimado:** 2-3 días

#### Archivos:
```
[ ] 1. egresados/index.jsx                           (15 min)
[ ] 2. servicioSocial/crear/index.jsx                (15 min)
[ ] 3. titulacion/index.jsx                          (15 min)
[ ] 4. solicitudesBecas/crear/index.jsx              (15 min)
```

**Testing:** Tests unitarios de hooks + validación manual
**Validación:** Code review + deploy a staging

---

### **📌 SPRINT 2 (Semana 2) - MEDIA COMPLEJIDAD**
**Objetivo:** Escalar a archivos con lógica intermedia
**Archivos:** 16
**Esfuerzo estimado:** 5-6 días

#### Subgrupo A (useAuth):
```
[ ] 1. instituciones/index.jsx                       (20 min)
[ ] 2. usuarios/crear/index.jsx                      (20 min)
[ ] 3. usuarios/editar/[usuarioId]/index.jsx         (20 min)
[ ] 4. usuarios/consultar/[usuarioId]/index.jsx      (20 min)
[ ] 5. notificaciones/index.jsx                      (20 min)
[ ] 6. solicitudes/index.jsx                         (20 min)
[ ] 7. serviciosEscolares/programas/[id]/editPrograma.jsx  (20 min)
```

#### Subgrupo B (useAuth + useUI):
```
[ ] 8. instituciones/consultar/[institucionId]/index.jsx   (25 min)
[ ] 9. instituciones/editar/[institucionId]/index.jsx      (25 min)
[ ] 10. instituciones/miInstitucion/index.jsx               (25 min)
[ ] 11. solicitudesFolios/index.jsx                         (25 min)
[ ] 12. solicitudes/detallesSolicitudes/[id]/index.jsx      (25 min)
```

#### Subgrupo C (useUI + useNavigation):
```
[ ] 13. Equivalencias/procesar/index.jsx             (25 min)
[ ] 14. Revalidacion/procesar/index.jsx              (25 min)
[ ] 15. Revalidacion/revisar/index.jsx               (25 min)
```

#### Subgrupo D (useUI):
```
[ ] 16. solicitudesFolios/alumnos/[id]/certificados/index.jsx   (25 min)
[ ] 17. solicitudesFolios/alumnos/[id]/titulos/index.jsx         (25 min)
```

**Testing:** Tests unitarios + tests de integración
**Validación:** Code review exhaustivo

---

### **📌 SPRINT 3 (Semana 3) - ALTA COMPLEJIDAD**
**Objetivo:** Finalizar con archivos complejos
**Archivos:** 6
**Esfuerzo estimado:** 4-5 días

#### Archivos:
```
[ ] 1. nuevaInspeccion.jsx                           (45 min)
[ ] 2. misInspecciones/index.jsx                     (45 min)
[ ] 3. Equivalencias/revisar/index.jsx               (45 min)
[ ] 4. solicitudesFolios/admin/[id]/folios.jsx       (60 min)
[ ] 5. tituloElectronico/[folio]/consultarFolio.jsx  (45 min)
[ ] 6. solicitudes/detallesSolicitudes/[id]/recepcionFormatos/index.jsx (60 min)
```

**Testing:** Tests exhaustivos + testing performance
**Validación:** Code review + staging testing + preprod approval

---

## 📋 CHECKLIST DETALLADO POR ARCHIVO

### **SPRINT 1 - Baja Complejidad**

#### [ ] egresados/index.jsx
- [ ] Cambiar import de Context
- [ ] Reemplazar `useContext(Context)` con `useUI()`
- [ ] Remover import de useContext
- [ ] Ejecutar tests
- [ ] Code review

**Cambios esperados:**
```
Lines changed: 154 (0 changed)
Imports: 1 removed, 1 added
Functions modified: 0
```

---

#### [ ] servicioSocial/crear/index.jsx
- [ ] Cambiar import de Context
- [ ] Reemplazar `useContext(Context)` con `useUI()`
- [ ] Remover import de useContext
- [ ] Ejecutar tests
- [ ] Code review

**Cambios esperados:**
```
Lines changed: 7 (0 changed)
Imports: 1 removed, 1 added
Functions modified: 0
```

---

#### [ ] titulacion/index.jsx
- [ ] Cambiar import de Context
- [ ] Reemplazar `useContext(Context)` con `useUI()`
- [ ] Remover import de useContext
- [ ] Ejecutar tests
- [ ] Code review

**Cambios esperados:**
```
Lines changed: 31 (0 changed)
Imports: 1 removed, 1 added
Functions modified: 0
```

---

#### [ ] solicitudesBecas/crear/index.jsx
- [ ] Cambiar import de Context
- [ ] Reemplazar `useContext(Context)` con `useUI()`
- [ ] Remover import de useContext
- [ ] Ejecutar tests
- [ ] Code review

**Cambios esperados:**
```
Lines changed: 8 (0 changed)
Imports: 1 removed, 1 added
Functions modified: 0
```

---

### **SPRINT 2 - Media Complejidad**

#### [ ] instituciones/index.jsx
- [ ] Cambiar import de Context
- [ ] Reemplazar `useContext(Context)` con `useAuth()`
- [ ] Remover import de useContext
- [ ] Verificar acceso a `session.id` y `session.rol`
- [ ] Ejecutar tests
- [ ] Code review

**Cambios esperados:**
```
Lines changed: 16 (2 modified - import lines)
Imports: 1 removed (Context), 1 added (useAuth)
Functions modified: 0
```

---

#### [ ] usuarios/crear/index.jsx
- [ ] Cambiar import de Context
- [ ] Reemplazar `useContext(Context)` con `useAuth()`
- [ ] Remover import de useContext
- [ ] Verificar acceso a `session.rol`
- [ ] Ejecutar tests
- [ ] Code review

**Cambios esperados:**
```
Lines changed: 10 (2 modified - import lines)
Imports: 1 removed, 1 added
Functions modified: 0
```

---

### **SPRINT 3 - Alta Complejidad**

#### [ ] nuevaInspeccion.jsx (234 líneas totales)
- [ ] Cambiar import de Context
- [ ] Reemplazar destructuración de Context
- [ ] Importar `useUI`
- [ ] Validar todas las llamadas a `setLoading` y `setNoti`
- [ ] Ejecutar tests unitarios
- [ ] Testing de API calls
- [ ] Verificar manejo de errores
- [ ] Code review exhaustivo

**Cambios esperados:**
```
Lines changed: 18 (2 modified - import lines)
Imports: 1 removed, 1 added
Functions modified: 0
Funciones afectadas: fetchRespuestas, fetchObservaciones, handleChanges
```

---

#### [ ] misInspecciones/index.jsx (58 líneas)
- [ ] Cambiar imports de Context
- [ ] Reemplazar destructuración: `const { session } = useAuth()`
- [ ] Reemplazar destructuración: `const { setLoading, setNoti } = useUI()`
- [ ] Remover import de useContext
- [ ] Verificar acceso a `session.id`
- [ ] Validar llamadas a `setLoading` y `setNoti` en useEffect
- [ ] Ejecutar tests
- [ ] Code review

**Cambios esperados:**
```
Lines changed: 8 (3 modified - import and hooks lines)
Imports: 1 removed (Context), 2 added (useAuth, useUI)
Functions modified: 0
Hooks en useEffect: 3 (setLoading, setNoti, sesión)
```

---

#### [ ] solicitudesFolios/admin/[id]/folios.jsx (545 líneas totales)
- [ ] Cambiar import de Context
- [ ] Reemplazar `useContext(Context)` con `useUI()`
- [ ] Remover import de useContext
- [ ] Validar todas las operaciones CRUD
- [ ] Testing completo de handlers (create, update, delete)
- [ ] Validar manejo de modales
- [ ] Ejecutar tests de integración
- [ ] Performance testing
- [ ] Code review exhaustivo
- [ ] Stage testing

**Cambios esperados:**
```
Lines changed: 29 (2 modified - import lines)
Imports: 1 removed, 1 added
Functions modified: 8 (handlers CRUD)
Llamadas a setNoti: ~15
Llamadas a setLoading: ~8
```

---

## 🔍 VALIDACIÓN Y TESTING

### Checklist Pre-Merge para Cada Archivo:

```
VALIDACIÓN ANTES DE MERGE:
[ ] Imports están correctos (no hay Context imports)
[ ] Hooks se importan correctamente
[ ] No hay warnings de linting
[ ] Tests unitarios pasan (100%)
[ ] Tests de integración pasan
[ ] Funcionalidad manual testeada en navegador
[ ] No hay console errors/warnings
[ ] Performance no se degrada
[ ] Accessibility no se ve afectada

PARA ARCHIVOS DE ALTA COMPLEJIDAD:
[ ] Tests end-to-end ejecutados
[ ] Staging testing completado
[ ] Backwards compatibility validada
[ ] Rollback plan documentado
```

---

## 📊 TRACKING DE PROGRESO

```
Total de archivos: 28

SPRINT 1: ████░░░░░░░░░░░░░░░░░░░░░░ 4/28 (14%)
SPRINT 2: ████████████░░░░░░░░░░░░░░░░ 16/28 (57%)
SPRINT 3: ████████████████████░░░░░░░░ 22/28 (79%)
FINAL:   ████████████████████████████ 28/28 (100%)
```

---

## 📝 REGISTRO DE CAMBIOS (Plantilla)

Para cada archivo migrado, documentar:

```markdown
## Archivo: [path/archivo.jsx]

**Fecha:** YYYY-MM-DD
**Responsable:** [Nombre]
**Sprint:** [Sprint #]

### Cambios Realizados:
- [ ] Hook useAuth() implementado
- [ ] Hook useUI() implementado
- [ ] Imports actualizados
- [ ] Destructuración reemplazada

### Líneas Modificadas:
- Línea X: Cambio Y
- Línea Z: Cambio W

### Testing:
- [ ] Tests unitarios: ✅ PASS
- [ ] Tests de integración: ✅ PASS
- [ ] Testing manual: ✅ PASS

### Code Review:
- Reviewer: [Nombre]
- Aprobado: [ ] SÍ / [ ] No
- Comentarios: [...]

### Notas:
[Cualquier consideración especial]
```

---

## ⚠️ ROLLBACK PROCEDURE (Si es necesario)

Si una migración falla:

```bash
# Revertir el archivo
git checkout HEAD -- [archivo.jsx]

# O revertir todo el Sprint
git revert [commit-id]

# Reportar el problema
# Documentar el error en el Wiki
# Discussión en equipo para ajustar estrategia
```

---

## 📞 CONTACTO Y ESCALACIÓN

**Problemas durante la migración:**
1. Verificar Troubleshooting en GUIA_TECNICA_HOOKS.md
2. Revisar ejemplos en GUIA_TECNICA_HOOKS.md
3. Escalación a tech lead si no se resuelve

**Preguntas sobre la estrategia:**
- Revisar RESUMEN_EJECUTIVO.md
- Revisar PLAN_MIGRACION_DETALLADO.md

