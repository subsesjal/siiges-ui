# 📚 Documentación - Índice Central

**Última actualización**: 14 de Febrero de 2026

Bienvenido al centro de documentación de **siiges-ui**. Este directorio contiene toda la documentación técnica, guías, decisiones arquitectónicas y resolución de problemas.

## 🗺️ Estructura de Documentación

### 🏗️ [architecture/](./architecture/)
Documentación sobre la arquitectura del proyecto, decisiones de diseño y cambios estructurales.

- **[001-context-migration.md](./architecture/001-context-migration.md)** - Migración de Context Legacy a Split Contexts
- **[decisions/](./architecture/decisions/)** - Architecture Decision Records (ADR)
  - **[001-split-context-strategy.md](./architecture/decisions/001-split-context-strategy.md)** - Por qué se decidió separar contextos

### 📖 [guides/](./guides/)
Guías técnicas y procedimientos paso a paso para desarrolladores.

- **[migration-guide.md](./guides/migration-guide.md)** - Guía general de migración de componentes
- *Más guías en el futuro: deployment, testing, etc.*

### 🔄 [migration/](./migration/)
Documentación específica de procesos de migración por fases.

- **[phase-1/](./migration/phase-1/)** - Migración Fase 1 (Contexto Global)
  - [strategy.md](./migration/phase-1/strategy.md) - Estrategia y criterios de priorización
  - [execution.md](./migration/phase-1/execution.md) - Cambios ejecutados
  - [prioritization-criteria.md](./migration/phase-1/prioritization-criteria.md) - Matriz de decisión detallada

### 🐛 [troubleshooting/](./troubleshooting/)
Resolución de problemas, errores documentados y sus soluciones.

- **[signin-context-error.md](./troubleshooting/signin-context-error.md)** - TypeError en componentes authentication
- *Más errores resueltos se irán agregando*

### 📝 [changelog/](./changelog/)
Histórico de cambios significativos en la arquitectura y documentación.

- **[2026-02-14-context-split.md](./changelog/2026-02-14-context-split.md)** - Cambios de contexto global

---

## 🚀 Cómo Usar Esta Documentación

### Para Nuevos Desarrolladores
1. Lee [../README.md](../README.md) para contexto general
2. Lee [guides/migration-guide.md](./guides/migration-guide.md) para entender los nuevos contextos
3. Consulta [architecture/](./architecture/) si necesitas entender decisiones de diseño

### Para Hacer Cambios Arquitectónicos
1. Revisa [architecture/decisions/](./architecture/decisions/) para ver decisiones previas
2. Si tu cambio es significativo, crea un nuevo ADR siguiendo el template
3. Documenta los cambios en la sección correspondiente
4. Actualiza este README si aplica

### Para Reportar Problemas
1. Busca en [troubleshooting/](./troubleshooting/) si existe una solución documentada
2. Si es un problema nuevo, documéntalo siguiendo el template
3. Incluye pasos para reproducir, error exacto y solución

---

## 📋 Convenciones de Nombres

### Archivos de Decisión Arquitectónica (ADR)
```
NNN-titulo-descriptivo-en-kebab-case.md

Ejemplos:
  001-split-context-strategy.md
  002-avatar-cache-implementation.md
  003-error-handling-pattern.md
```

### Archivos de Resolución de Errores
```
nombre-corto-error-o-problema.md

Ejemplos:
  signin-context-error.md
  navbar-rerender-issue.md
  avatar-mismatch-bug.md
```

### Archivos de Fase de Migración
```
docs/migration/{fase}/
  - strategy.md (criterios y plan)
  - execution.md (cambios realizados)
  - criteria.md (matriz de decisión detallada)
  - checklist.md (validación post-cambios)
```

### Archivos de Changelog
```
YYYY-MM-DD-descripcion.md

Ejemplos:
  2026-02-14-context-split.md
  2026-03-01-layout-refactor.md
```

---

## ✅ Checklist para Agregar Documentación Nueva

- [ ] Identificar categoría correcta (architecture, guides, migration, troubleshooting, changelog)
- [ ] Seguir convención de nombres
- [ ] Incluir header con fecha y estado
- [ ] Incluir tabla de contenidos si es > 200 líneas
- [ ] Linkar desde el README de la sección correspondiente
- [ ] Actualizar este índice si es necesario
- [ ] Si es ADR: incluir sección de "Alternativas consideradas"
- [ ] Si es troubleshooting: incluir pasos para reproducir

---

## 📚 Template para Nuevos Documentos

### Para ADR (Architecture Decision Record)
```markdown
# ADR-NNN: Título del Cambio

**Fecha**: DD de Mes de AAAA
**Estado**: Propuesto/Aceptado/Deprecado
**Impacto**: Alto/Medio/Bajo

## Problema
Descripción del problema que se intenta resolver...

## Solución Propuesta
Descripción de la solución...

## Alternativas Consideradas
- Opción A: ...
- Opción B: ...
- Opción C: ...

## Criterios Técnicos
Matriz de comparación...

## Riesgos
- Riesgo 1: Mitigación
- Riesgo 2: Mitigación

## Referencias
Documentos relacionados...
```

### Para Troubleshooting
```markdown
# Problema: Nombre del Error o Problema

**Síntomas**: Cómo se manifiesta
**Causa Raíz**: Por qué ocurre
**Afectados**: Qué componentes/versiones

## Pasos para Reproducir
1. Paso 1
2. Paso 2
3. Paso 3

## Solución
Descripción de la solución paso a paso...

## Validación
Cómo verificar que el problema está resuelto...

## Previsión Futura
Cómo evitar que ocurra de nuevo...
```

---

## 🔗 Referencias Rápidas

| Documento | Propósito | Lectura |
|-----------|----------|---------|
| [migration/phase-1/strategy.md](./migration/phase-1/strategy.md) | Plan de migración | 5-10 min |
| [guides/migration-guide.md](./guides/migration-guide.md) | Cómo migrar un componente | 5 min |
| [architecture/decisions/](./architecture/decisions/) | Por qué se hicieron cambios | 10-15 min |
| [troubleshooting/](./troubleshooting/) | Resolver problemas comunes | 2-5 min |

---

## 🤝 Contribuir a Esta Documentación

Si necesitas agregar documentación:

1. Lee [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Utiliza los templates proporcionados
3. Asegúrate de:
   - [ ] Usar lenguaje claro y conciso
   - [ ] Incluir ejemplos de código si es aplicable
   - [ ] Mantener consistencia de formato
   - [ ] Linkar documentos relacionados
4. Actualiza el índice relevante

---

## 📊 Estado de la Documentación

| Sección | Estado | Prioridad |
|---------|--------|-----------|
| Architecture | ✅ Básico | 🔴 Alta |
| Guides | ⚠️ Parcial | 🟠 Media |
| Migration | ✅ Completo (Fase 1) | 🟠 Media |
| Troubleshooting | ⚠️ Comenzado | 🟠 Media |
| Changelog | ✅ Comenzado | 🟡 Baja |

---

## 💡 Tips de Mantenimiento

- **No duplicar información**: Si el contenido existe en otro lugar, linkea en lugar de repetir
- **Mantener actualizado**: Cuando cambies arquitectura, actualiza la documentación
- **Usar dates de última actualización**: Ayuda a saber si algo está desactualizado
- **Revisar regularmente**: Cada sprint, revisa si hay docs desactualizadas

---

*Para preguntas o sugerencias sobre esta documentación, contacta al equipo de arquitectura.*
