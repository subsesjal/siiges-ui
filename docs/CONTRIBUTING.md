# 📝 CONTRIBUTING.md - Guía de Contribución a la Documentación

Esta guía explica cómo contribuir con documentación técnica al proyecto siiges-ui de forma consistente y mantenible.

## 📚 Estructura de Documentación

La documentación principal está en `docs/` con estas secciones:

```
docs/
├── README.md (índice central)
├── architecture/
│   ├── README.md
│   ├── 001-context-migration.md
│   └── decisions/
│       └── 001-split-context-strategy.md
├── guides/
│   ├── README.md
│   └── migration-guide.md
├── migration/
│   ├── README.md
│   └── phase-1/
│       ├── strategy.md
│       ├── execution.md
│       ├── prioritization-criteria.md
│       └── README.md
├── troubleshooting/
│   ├── README.md
│   └── signin-context-error.md
└── changelog/
    ├── README.md
    └── 2026-02-14-context-split.md
```

## 🎯 Cuándo Agregar Documentación

Documenta:
- ✅ Decisiones arquitectónicas significativas → **docs/architecture/decisions/**
- ✅ Cambios estructurales importantes → **docs/architecture/**
- ✅ Guías paso a paso → **docs/guides/**
- ✅ Migraciones de código → **docs/migration/{fase}/**
- ✅ Errores resueltos → **docs/troubleshooting/**
- ✅ Cambios significativos en la codebase → **docs/changelog/**

NO necesita documentación:
- ❌ Bug fixes menores
- ❌ Cambios de estilos CSS
- ❌ Refactors internos sin impacto
- ❌ Actualizaciones de dependencias parche

## 📋 Convenciones de Nombres

### Architecture Decision Records (ADR)
```
docs/architecture/decisions/NNN-titulo-descriptivo-kebab-case.md

Ejemplos:
  001-split-context-strategy.md
  002-avatar-cache-lru.md
  003-error-handling-pattern.md

Numeración: Secuencial, nunca reutilizar números
```

### Documentos de Arquitectura General
```
docs/architecture/NNN-nombre-descriptivo.md

Ejemplos:
  001-context-migration.md
  002-authentication-flow.md
```

### Guías Técnicas
```
docs/guides/{tema}-guide.md

Ejemplos:
  migration-guide.md
  testing-guide.md
  deployment-guide.md
```

### Migraciones
```
docs/migration/{fase}/{documento}.md

Estructura:
  phase-1/
    ├── README.md
    ├── strategy.md (plan y criterios)
    ├── execution.md (cambios realizados)
    ├── prioritization-criteria.md (matriz detallada)
    └── checklist.md (validación)

phase-2/
    ├── strategy.md
    └── ...
```

### Troubleshooting
```
docs/troubleshooting/{nombre-corto-problema}.md

Ejemplos:
  signin-context-error.md
  navbar-rerender-issue.md
  avatar-memory-leak.md
```

### Changelog
```
docs/changelog/YYYY-MM-DD-descripcion-breve.md

Ejemplos:
  2026-02-14-context-split.md
  2026-03-01-layout-refactor.md
```

## 📝 Templates

### Template: Architecture Decision Record (ADR)

```markdown
# ADR-NNN: Título Descriptivo

**Fecha**: DD de Mes de AAAA
**Estado**: Propuesto | Aceptado | Deprecado
**Impacto**: Alto | Medio | Bajo
**Versión**: 1.0

## Problema
Descripción clara del problema que intenta resolver...

## Contexto
Factores que influyen en la decisión...

## Solución Propuesta
Descripción de la solución...

## Alternativas Consideradas
- Alternativa A: Pros..., Contras...
- Alternativa B: Pros..., Contras...

## Criterios Técnicos
Cómo se evaluó la solución...

## Riesgos Identificados
- Riesgo 1: Mitigación
- Riesgo 2: Mitigación

## Validación
Cómo se verifica que fue correcta...

## Consecuencias
- Positivas: ...
- Negativas: ...

## Referencias
- [Link a documentación relacionada]
- [Link a ADR relacionado]

## Historial
| Fecha | Evento |
|-------|--------|
| YYYY-MM-DD | Evento |
```

### Template: Guía Técnica

```markdown
# Título: Cómo Hacer X

**Objetivo**: Qué se logra al seguir esta guía
**Duración**: 5 minutos
**Requisitos**: Qué necesita saber antes

## Problema
Qué problema resuelve esta guía...

## Solución en 3 pasos

### Paso 1: Nombre descriptivo
```code
Código de ejemplo
```
Explicación...

### Paso 2: Nombre descriptivo
...

### Paso 3: Nombre descriptivo
...

## Validación
Cómo verificar que funcionó...

## Troubleshooting
Si X pasa, haz Y...

## Recursos Relacionados
- [Link a otro documento]
- [Link a código de ejemplo]
```

### Template: Troubleshooting

```markdown
# Problema: Nombre del Error

**Síntomas**: Cómo se manifestó el problema...
**Causa Raíz**: Por qué ocurrió...
**Componentes Afectados**: Cuáles sufrieron el problema...
**Versión/Fecha**: Cuándo comenzó...

## Pasos para Reproducir
1. Paso 1
2. Paso 2
3. Paso 3

## Error/Output Exacto
```
[Stack trace o mensaje de error]
```

## Solución

### Opción 1: [Descripción]
```code
Código de la solución
```

### Opción 2: [Descripción]
...

## Validación
Cómo verificar que el error está resuelto...

## Root Cause Analysis
Por qué sucedió y cómo evitar en el futuro...

## Prevención
Acciones para evitar que vuelva a ocurrir...

## Referencias
- [Link a código afectado]
- [Link a documentación relacionada]
```

## 🏁 Checklist Antes de Commit

Antes de hacer commit de documentación nueva, verifica:

- [ ] Nombre de archivo sigue convención correcta
- [ ] Archivo está en la carpeta correcta
- [ ] Header incluye fecha, estado e impacto (si aplica)
- [ ] Contenido es claro y conciso (evitar jerga innecesaria)
- [ ] Código de ejemplo está actualizado y funciona
- [ ] Links internos usan rutas relativas correctas
- [ ] Si es ADR: incluye sección "Alternativas Consideradas"
- [ ] Si es troubleshooting: incluye pasos para reproducir
- [ ] README de la sección fue actualizado si es necesario
- [ ] Index central (docs/README.md) fue actualizado si es necesario

## 🔗 Cómo Linkear Documentos

### Links Internos (Recomendado)
```markdown
[Texto del link](./ruta/relativa/archivo.md)
[Texto del link](../otra-carpeta/archivo.md)
[Texto del link](../../archivo.md)

Ejemplos:
[Migration Guide](../guides/migration-guide.md)
[Split Context ADR](./decisions/001-split-context-strategy.md)
[Troubleshooting](../../troubleshooting/signin-context-error.md)
```

### Links a Código
```markdown
[archivo.jsx](../../../packages/shared/src/components/archivo.jsx)
```

### Links Externos
```markdown
[React Docs](https://react.dev)
[MDN](https://developer.mozilla.org)
```

## 🎨 Estilo de Escritura

### Tono
- Profesional pero accesible
- Técnico pero no sobrecargado
- Activo (evitar pasiva)
- Directo (evitar excesivas explicaciones)

### Estructura
- Usa encabezados jerárquicamente (#, ##, ###)
- Máximo 80 caracteres por línea (si es posible)
- Separa secciones con saltos de línea
- Usa listas bullet para items
- Usa tablas para comparaciones

### Ejemplos
- ✅ Código funcional real
- ✅ Casos de uso realistas
- ✅ Errores comunes documentados
- ❌ Código pseudocódigo que no funciona
- ❌ Ejemplos triviales sin valor

## 📊 Ejemplos de Buena Documentación

- [docs/architecture/decisions/001-split-context-strategy.md](./architecture/decisions/001-split-context-strategy.md)
- [docs/migration/phase-1/strategy.md](./migration/phase-1/strategy.md)
- [docs/guides/migration-guide.md](./guides/migration-guide.md)

## 🚀 Proceso de Agregar Documentación New

1. **Identifica la categoría correcta**
   ```
   ¿Es arquitectura? → architecture/
   ¿Es una guía? → guides/
   ¿Es una migración? → migration/{fase}/
   ¿Es un error resuelto? → troubleshooting/
   ¿Es histórico? → changelog/
   ```

2. **Crea el archivo con nombre correcto**
   ```bash
   touch docs/category/NNN-nombre.md
   # Rellena usando el template apropiado
   ```

3. **Actualiza el README de la carpeta**
   ```markdown
   - **[archivo.md](./archivo.md)** - Descripción corta
   ```

4. **Linkea desde docs/README.md si es top-level**

5. **Valida**
   - Abre el archivo en GitHub/editor
   - Verifica que los links funcione
   - Lee para buscar typos

6. **Commit y push**
   ```bash
   git add docs/category/archivo.md
   git commit -m "docs: Agregar NNN-descripcion"
   git push
   ```

## 💡 Tips de Mantenimiento

### No Duplicar Información
Si el contenido ya existe, linkea en lugar de duplicar:
```markdown
Para más detalles, ver [docs/architecture/001-context-migration.md](...)
```

### Mantener Actualizado
Cuando cambies código, actualiza la documentación:
- Cambio en flujo de auth → actualiza auth docs
- Nuevo contexto → agrega a guides/migration-guide
- Error resuelto → documentar en troubleshooting

### Revisar Regularmente
- Cada sprint: busca documentación desactualizada
- Cada release: agrega changelog entry
- Cuando alguien reporta confusión: considera mejorar docs

### Versionado
Si es necesario mantener versiones:
```
docs-v1-legacy/  (para referencia histórica)
docs/             (actual)
```

## 📞 Preguntas Frecuentes

**P: ¿Dónde reporto un problema en la documentación?**
R: Abre un issue con label `docs` en GitHub

**P: ¿Puedo cambiar la estructura?**
R: Sí, pero actualiza todos los links y READMEs. Avisa al equipo.

**P: ¿Nivel de detalle?**
R: Lo suficiente para que alguien sin contexto pueda entender. Si es muy largo, divide en múltiples documentos.

**P: ¿Cuándo deprecar un documento?**
R: Cuando ya no sea relevante. Marca como "DEPRECADO" en el header y linkea al reemplazo.

---

**¡Gracias por mantener la documentación actualizada y útil!**

*Última actualización: 14 de Febrero de 2026*
