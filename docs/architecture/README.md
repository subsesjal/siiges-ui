# 🏗️ Architecture - Documentación Arquitectónica

Esta sección contiene toda la documentación relacionada con la arquitectura del sistema, incluyendo decisiones de diseño, cambios estructurales y patrones de implementación.

## 📋 Contenidos

### Documentos Principales

- **[001-context-migration.md](./001-context-migration.md)** - Migración de Context Monolítico a Split Contexts
  - Problema identificado
  - Solución implementada
  - Beneficios técnicos
  - Plan de fases

### Decisiones Arquitectónicas (ADR)

Ver [decisions/](./decisions/) para Architecture Decision Records.

- **[decisions/001-split-context-strategy.md](./decisions/001-split-context-strategy.md)** - Estrategia de Separación de Contextos
  - Criterios técnicos
  - Alternativas evaluadas
  - Matriz de priorización

---

## 🔍 Cómo Leer Esta Sección

### Si viniste de...
- **Un error/problema**: Ve a [troubleshooting/](../troubleshooting/)
- **Instrucciones de cómo migrar**: Ve a [guides/](../guides/)
- **Querés entender por qué se hizo algo**: ← Estás en el lugar correcto
- **Historial de cambios**: Ve a [changelog/](../changelog/)

---

## 🚀 Cambios Arquitectónicos Recientes

| Cambio | Fecha | Estado | Impacto |
|--------|-------|--------|---------|
| Split Context | 14-02-2026 | ✅ Fase 1 | Mejora de performance ~40-50% |
| Avatar Cache LRU | 14-02-2026 | ✅ Implementado | Reducción de memoria ~96% |

---

## 📚 Referencias

- [Parent: docs/README.md](../README.md)
- [Related: migration/](../migration/)
- [Related: guides/](../guides/)

