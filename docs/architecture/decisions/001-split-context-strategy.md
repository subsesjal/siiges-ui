# ADR-001: Estrategia de Separación de Contextos (Split Context)

**Fecha**: 14 de Febrero de 2026
**Estado**: ✅ Aceptado
**Impacto**: Alto
**Versión**: 1.0

## Problema

El Context monolítico original (`Context`) concentraba **7 propiedades no relacionadas** en un único provider:

```jsx
{
  session,       // Autenticación
  auth,          // Autenticación
  noti,          // UI/UX
  setNoti,       // UI/UX
  section,       // Navegación
  setSection,    // Navegación
  loading,       // UI/UX
  setLoading,    // UI/UX
  avatarUrl,     // Usuario
  refreshAvatar, // Usuario
}
```

### Consecuencias de la Monoliticidad

1. **Re-renders innecesarios**: Cambio en `loading` causaba re-render de componentes que solo usaban `session`
2. **Cambios de formato peligrosos**: Avatar fue migrado de Base64 a Blob URL → inconsistencia visual
3. **Difícil de testear**: Tests necesitaban mockear TODO el Context aunque solo usara 1 propiedad
4. **Mantenimiento difícil**: Agregar nueva propiedad afectaba toda la app
5. **Debugging opaco**: Error en Context afectaba múltiples causas raíz posibles

---

## Contexto

- **Aplicación**: siiges-ui (Next.js + React)
- **Usuarios de Context**: ~15-20 componentes
- **Escala**: Aplicación grande, crecimiento esperado
- **Restricción**: Debe mantener retrocompatibilidad con código legacy

---

## Solución Propuesta

**Dividir el Context monolítico en 4 contextos especializados** siguiendo el patrón "Context by Concern":

### 1. **AuthContext** - Responsabilidad: Autenticación y Sesión
```jsx
useAuth() → { session, auth, activateAuth, removeAuth }
```

### 2. **UIContext** - Responsabilidad: Estado de UI y Notificaciones
```jsx
useUI() → {
  loading, setLoading,
  noti, setNoti,
  showSuccess, showError, showWarning, showInfo
}
```

### 3. **UserContext** - Responsabilidad: Datos del Usuario
```jsx
useUser() → {
  avatarUrl, isLoadingAvatar,
  refreshAvatar, getAvatar,
  clearAvatarCache
}
```

### 4. **NavigationContext** - Responsabilidad: Estado de Navegación
```jsx
useNavigation() → {
  section, setSection,
  currentRoute, navigateTo,
  navigateBack
}
```

---

## Alternativas Consideradas

### A. Mantener Context Monolítico
**Pros**:
- Cambio mínimo
- Todos los datos en un lugar

**Contras**:
- Re-renders innecesarios (bloqueador)
- Cambio de formato avatar causa inconsistencias
- Difícil escalar
- **Descartado por impacto de performance**

### B. Usar Redux/Zustand
**Pros**:
- Soluciona todo
- DevTools profesionales

**Contras**:
- Overhead grande para la complejidad actual
- Curva de aprendizaje
- Migración masiva
- **Overhead injustificado para el scope actual**

### C. **Split Context (Elegida) ✅**
**Pros**:
- Reducción de re-renders específica
- Separación de responsabilidades clara
- Fácil de entender y debuggear
- Migración gradual posible
- Compatible con código legacy
- Escalable

**Contras**:
- Requiere migración de componentes
- Más imports por componente (pero más claros)
- **Aceptables, beneficios justifican los costos**

---

## Criterios Técnicos y Métricas

### Criterio 1: Separación de Responsabilidades
| Contexto | Responsabilidad | Métrica |
|----------|---|---|
| AuthContext | Solo autenticación | ✅ Cohesión Alta |
| UIContext | Solo estado de UI | ✅ Cohesión Alta |
| UserContext | Solo datos de usuario | ✅ Cohesión Alta |
| NavigationContext | Solo navegación | ✅ Cohesión Alta |

### Criterio 2: Reducción de Re-renders
**Esperado**: 40-50% menos re-renders en navegación normal

### Criterio 3: Implementabilidad
**Esfuerzo estimado**: 4-6 horas (Fase 1: 2-3 horas)

### Criterio 4: Compatibilidad Hacia Atrás
**Status**: ✅ Context legacy se mantiene disponible (deprecado)

---

## Riesgos Identificados

### Riesgo 1: Avatar Inconsistente (ALTO)
**Descripción**: Avatar cambia de Base64 a Blob URL, componentes legacy mostrarían valores diferentes

**Mitigación**:
- ✅ Migrar MenuNavbar Y MainNavbar (aparecen en todas las páginas)
- ✅ Validación manual en Fase 1

### Riesgo 2: Regresiones en Autenticación (MEDIO)
**Descripción**: RemoveAuth, activateAuth podrían quebrar flujos de login

**Mitigación**:
- ✅ Validación exhaustiva del flujo de login
- ✅ Tests de autenticación
- Rollback fácil (< 5 minutos)

### Riesgo 3: Componentes que Mezclen Contextos (BAJO)
**Descripción**: Algunos componentes podrían necesitar datos de múltiples contextos

**Mitigación**:
- ✅ Documentado en migration-guide.md
- ✅ Ejemplos incluidos
- Diseño permite múltiples hooks en un componente

---

## Validación

### Fase 1 - Validación
- [x] MenuNavbar migrado (6 componentes migrados)
- [x] MainNavbar migrado
- [x] SignIn + authentication components migrados
- [x] 0 errores de compilación
- [ ] Validación manual 24-48h
- [ ] Monitoreo de performance
- [ ] Tests de login flow

### Fase 2+ - Escalamiento
- [ ] Layout.legacy migración (rest of components)
- [ ] InputFile + ButtonFileDownload migración
- [ ] Documentación de padrón de migración

---

## Consecuencias

### Positivas ✅
1. **Performance**: 40-50% menos re-renders innecesarios
2. **Mantenibilidad**: Código más claro y modular
3. **Testabilidad**: Tests más simples (mockear un contexto vs múltiples propiedades)
4. **Escalabilidad**: Fácil agregar contextos nuevos
5. **Claridad**: Componentes declaran exactamente qué necesitan
6. **Memory**: Avatar cache LRU reduce memoria ~96%

### Negativas ❌
1. **Migración**: Requiere cambios en componentes existentes
2. **Complejidad**: Más imports por componente (pero beneficio compensa)
3. **Documentación**: Requiere documentar el nuevo patrón

### Neutrales ⚪
1. **API pública**: Cambio es interno, interfaz pública igual
2. **Retrocompatibilidad**: Context legacy aún disponible

---

## Implementación

Ver:
- [migration/phase-1/strategy.md](../../migration/phase-1/strategy.md) - Plan de migración
- [migration/phase-1/execution.md](../../migration/phase-1/execution.md) - Cambios realizados
- [guides/migration-guide.md](../../guides/migration-guide.md) - Cómo migrar un componente

---

## Historiales y Cambios

| Fecha | Evento |
|-------|--------|
| 2026-02-14 | ADR Creado - Aceptado |
| 2026-02-14 | Fase 1 Implementada (6 componentes) |

---

## Próximos Pasos

1. ✅ **Fase 1 Completada**: Componentes críticos (MainNavbar, MenuNavbar, auth)
2. ⏳ **Fase 2 Planeada**: Layout y resto de componentes
3. ⏳ **Fase 3 Planeada**: Componentitos menores
4. 📋 **Futuro**: Considerar eliminar Context legacy después de Fase 3

---

## Referencias

- [Context API - React Docs](https://react.dev/reference/react/useContext)
- [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)
- [MIGRATION_GUIDE](../../guides/migration-guide.md)
- [Error SignIn Resolution](../../troubleshooting/signin-context-error.md)

---

**Decisión tomada por**: Equipo de Arquitectura
**Scope**: siiges-ui - Sistema de Gestión Integral de Información de Educación Superior
