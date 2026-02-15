# 📝 Architecture Decision Records (ADR)

Los Architecture Decision Records son un patrón para documentar decisiones arquitectónicas significativas y sus consecuencias.

## Formato

Cada ADR sigue el siguiente formato:

```
# ADR-NNN: Título

**Fecha**: DD de Mes de AAAA
**Estado**: Propuesto | Aceptado | Deprecado | Superado
**Impacto**: Alto | Medio | Bajo

## Problema
Descripción clara del problema que se intenta resolver...

## Contexto
Factores que influyen en la decisión (restricciones, requisitos, limitaciones técnicas)...

## Solución Propuesta
Descripción detallada de la solución...

## Alternativas Consideradas
- Alternativa A: Pros... Contras...
- Alternativa B: Pros... Contras...
- Alternativa C: Pros... Contras...

## Criterios Técnicos y Métricas
Cómo se evaluó:
- Criterion 1: ...
- Criterion 2: ...

## Riesgos Identificados
- Riesgo 1: Mitigación
- Riesgo 2: Mitigación

## Validación
Cómo se verifica que la decisión fue correcta...

## Consecuencias
- Positivas: ...
- Negativas: ...
- Neutrales: ...

## Referencias
Enlaces a documentos relacionados...

## Historial
- YYYY-MM-DD: Cambio realizado
```

## 📋 ADR Existentes

- **[001-split-context-strategy.md](./001-split-context-strategy.md)** (Aceptado)
  - Decisión: Separar el Context monolítico en 4 contextos especializados
  - Impacto: Mejora de performance, mantenibilidad
  - Fecha: 14-02-2026

## 🔄 Proceso para Agregar un ADR

1. Identifica que necesitas documentar una decisión significativa
2. Crea un archivo: `NNN-titulo-en-kebab-case.md`
3. Incrementa NNN consecutivamente
4. Completa el template arriba
5. Linkea desde este README
6. Solicita review

---

## 📚 Referencias

- [Parent: Architecture/](../)
- [Best Practices: adr.github.io](https://adr.github.io/)
