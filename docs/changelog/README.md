# 📝 Changelog - Historial de Cambios

Registro cronológico de cambios significativos en la arquitectura y documentación del proyecto.

## 📋 Cambios Recientes

### [2026-02-14 - Context Split & Architecture Refactor](./2026-02-14-context-split.md)

**Cambios Principales**:
- Migración de Context Legacy a Split Contexts (Fase 1)
- 6 componentes migrados
- Hotfix de errores en authentication
- Estructura de documentación creada

**Impacto**:
- 40-50% reducción de re-renders
- Mejor mantenibilidad
- Código más testeable

---

## 🔍 Cómo Usar el Changelog

- **Para entender qué cambió recientemente**: Lee los archivos más recientes
- **Para auditoría**: Busca cambios por rango de fechas
- **Para debugging**: Algunos bugs pueden estar relacionados con cambios recientes

---

## 📝 Proceso para Agregar Cambios al Changelog

1. Cuando realices cambios significativos arquitectónicos:
   - Crea un archivo: `YYYY-MM-DD-descripcion-breve.md`
   - Incluye: qué cambió, por qué, impacto
   - Linkea a documentación relacionada

2. **Significativo = cambio en**:
   - Patrón de código importante
   - Rendimiento del sistema
   - Dependencias críticas
   - Decisiones arquitectónicas

3. **NOT significativo = cambio en**:
   - Bug fixes menores
   - Estilos CSS
   - Actualizaciones de dependencias (a menos que sea major)

---

## 📚 Referencias

- [Parent: docs/](../)
- [Related: Architecture/decisions/](../architecture/decisions/)
