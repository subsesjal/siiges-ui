# Criterios Técnicos de Priorización - Migración de Contextos

## 📊 Matriz de Decisión

### Componente 1: MenuNavbar.jsx
```
┌─────────────────────────────────────────────────────────────┐
│ CRITICIDAD: 🔴 CRÍTICA - FASE 1 ✅ COMPLETADO              │
├─────────────────────────────────────────────────────────────┤
│ Propiedades usadas: removeAuth, session, avatarUrl          │
│ Frecuencia de render: MÁXIMA (cada página)                  │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 1: Impacto de Re-renders                           │
│ Puntuación: 10/10                                           │
│ Razón: Aparece en TODAS las páginas internamente            │
│ Beneficio: Evita ~50+ re-renders por navegación             │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 2: Cambio de Formato de Datos                      │
│ Puntuación: 10/10                                           │
│ Razón: Avatar cambia de Base64→Blob URL                     │
│ Riesgo: Si no se migra, mostrará avatar INCONSISTENTE       │
│ Ejemplo problematico:                                       │
│   - Componente A (Legacy Context): Base64                   │
│   - Componente B (UserContext): Blob URL                    │
│   = DIFERENTE AVATAR VISUAL EN LA MISMA SESIÓN ❌           │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 3: Riesgo de Migración                             │
│ Puntuación: 2/10 (MUY BAJO)                                 │
│ Razón: Componente simple, solo consume props                │
│ Complejidad: ~20 líneas, sin lógica                         │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 4: Dependencias Técnicas                           │
│ Puntuación: 8/10 (ALTA)                                     │
│ Razón: Renderiza el Avatar (componente visual crítico)      │
│ Impacto: Si falla, toda la UI se ve rota                    │
├─────────────────────────────────────────────────────────────┤
│ TOTAL: (10+10+2+8)/4 = 7.5/10 ✅ CRÍTICA                    │
│ DECISIÓN: Migrar AHORA para evitar bugs visuales            │
└─────────────────────────────────────────────────────────────┘
```

---

### Componente 2: MainNavbar.jsx
```
┌─────────────────────────────────────────────────────────────┐
│ CRITICIDAD: 🔴 CRÍTICA - FASE 1 ✅ COMPLETADO              │
├─────────────────────────────────────────────────────────────┤
│ Propiedades usadas: session (solo lectura)                  │
│ Frecuencia de render: MÁXIMA (cada página)                  │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 1: Impacto de Re-renders                           │
│ Puntuación: 10/10                                           │
│ Razón: Navbar global, renderizado en CADA página            │
│ Análisis de impacto:                                        │
│   - Cuando loading cambia: MainNavbar re-renderiza ❌       │
│   - Cuando noti aparece: MainNavbar re-renderiza ❌         │
│   - Cuando avatarUrl cambia: MainNavbar re-renderiza ❌     │
│   MainNavbar solo necesita session (no cambia)              │
│ Beneficio: Evita ~30+ re-renders por segundo en app activa  │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 2: Cambio de Formato de Datos                      │
│ Puntuación: 3/10 (NO AFECTADO)                              │
│ Razón: session NO cambia de formato                         │
│ Nota: Aunque no es crítico por formato, MUY CRÍTICO         │
│       por performance                                       │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 3: Riesgo de Migración                             │
│ Puntuación: 1/10 (RIESGO MÍNIMO)                            │
│ Razón: Solo consume session, sin side-effects               │
│ Complejidad: ~170 líneas pero solo LECTURA de session       │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 4: Dependencias Técnicas                           │
│ Puntuación: 9/10 (CRÍTICA)                                  │
│ Razón: Renderiza el Navbar principal de toda la app         │
│ Impacto: Es el componente raíz de navegación                │
├─────────────────────────────────────────────────────────────┤
│ TOTAL: (10+3+1+9)/4 = 5.75/10                               │
│ PERO: Criterio 1 es DECISIVO (impacto de performance)       │
│ DECISIÓN: Migrar AHORA para maximizar performance           │
└─────────────────────────────────────────────────────────────┘
```

---

### Componente 3: Layout.legacy.jsx
```
┌─────────────────────────────────────────────────────────────┐
│ CRITICIDAD: 🟠 ALTA - FASE 2 (PRÓXIMO SPRINT)              │
├─────────────────────────────────────────────────────────────┤
│ Propiedades usadas: session, section, setSection, loading   │
│ Frecuencia de render: MÁXIMA (cada página)                  │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 1: Impacto de Re-renders                           │
│ Puntuación: 9/10                                            │
│ Razón: Se renderiza en CADA página                          │
│ Problema específico:                                        │
│   - Cuando loading cambia: Layout re-renderiza COMPLETO ❌  │
│   - Esto causa cascada de re-renders en children            │
│ Este es el PEOR CULPABLE de re-renders innecesarios         │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 2: Cambio de Formato de Datos                      │
│ Puntuación: 5/10 (PARCIAL)                                  │
│ Razón: Usa datos estables (no hay formato nuevo esperado)   │
│ Nota: Pero loading es inestable (baja frecuencia = bajo)    │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 3: Riesgo de Migración                             │
│ Puntuación: 4/10 (BAJO-MEDIO)                               │
│ Razón: Componente más complejo que MenuNavbar/MainNavbar    │
│ Complejidad: ~103 líneas, + efectos en UI                   │
│ Dependencias: Renderiza MenuDrawer, MainNavbar, Loading     │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 4: Dependencias Técnicas                           │
│ Puntuación: 10/10 (CRÍTICA)                                 │
│ Razón: Es el CONTENEDOR RAÍZ del layout                     │
│ Impacto: Contiene MainNavbar, MenuDrawer, Loading           │
├─────────────────────────────────────────────────────────────┤
│ TOTAL: (9+5+4+10)/4 = 7/10 = MUY ALTO                       │
│ POR QUÉ NO ES FASE 1:                                       │
│   1. MenuNavbar/MainNavbar ya migrados (resuelven 40%)       │
│   2. Riesgo técnico es mayor (contiene otros componentes)   │
│   3. Necesita validación de Fase 1 primero                  │
│   4. Cambio en Layout puede afectar todo (impacto > 40%)    │
│ DECISIÓN: Migrar en Fase 2 después de validar Fase 1       │
└─────────────────────────────────────────────────────────────┘
```

---

### Componente 4: ButtonFileDownload.jsx
```
┌─────────────────────────────────────────────────────────────┐
│ CRITICIDAD: 🟡 MEDIA - FASE 3                               │
├─────────────────────────────────────────────────────────────┤
│ Propiedades usadas: setNoti                                 │
│ Frecuencia de render: MEDIA (solo en formularios)           │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 1: Impacto de Re-renders                           │
│ Puntuación: 3/10                                            │
│ Razón: Solo se renderiza en ciertos contextos (no global)   │
│ Aparición: "Descargar archivo" buttons en gird/tablas       │
│ Uso: No es crítico para la experiencia nuclear              │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 2: Cambio de Formato de Datos                      │
│ Puntuación: 2/10 (SIN CAMBIO)                               │
│ Razón: setNoti() es la misma estructura                     │
│ Impacto: No hay cambio de formato esperado                  │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 3: Riesgo de Migración                             │
│ Puntuación: 1/10 (TRIVIAL)                                  │
│ Razón: Componente muy simple (~60 líneas)                   │
│ Cambio: Solo reemplazar setNoti de Context a useNotification│
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 4: Dependencias Técnicas                           │
│ Puntuación: 2/10 (NINGUNA)                                  │
│ Razón: Componente aislado, sin dependencias                 │
│ Impacto: Si falla, solo afecta descarga de archivos         │
├─────────────────────────────────────────────────────────────┤
│ TOTAL: (3+2+1+2)/4 = 2/10 = BAJA                            │
│ DECISIÓN: Postponer hasta Fase 3 (menos urgente)            │
└─────────────────────────────────────────────────────────────┘
```

---

### Componente 5: InputFile.jsx
```
┌─────────────────────────────────────────────────────────────┐
│ CRITICIDAD: 🟡 MEDIA - FASE 3                               │
├─────────────────────────────────────────────────────────────┤
│ Propiedades usadas: setNoti                                 │
│ Frecuencia de render: MEDIA (solo en formularios específicos)│
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 1: Impacto de Re-renders                           │
│ Puntuación: 3/10                                            │
│ Razón: No es componente global                              │
│ Uso: Upload file dialogs en formularios                     │
│ Aparición: No en CADA página (media frecuencia)             │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 2: Cambio de Formato de Datos                      │
│ Puntuación: 2/10 (SIN CAMBIO)                               │
│ Razón: API de notificaciones no cambia                      │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 3: Riesgo de Migración                             │
│ Puntuación: 2/10 (BAJO)                                     │
│ Razón: Componente relativamente simple (~187 líneas)        │
│ Complejidad media: tiene efectos y state                    │
│ Cambio limitado a import + hook                             │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 4: Dependencias Técnicas                           │
│ Puntuación: 3/10 (BAJA)                                     │
│ Razón: Componente auto-contenido                            │
│ Impacto: Si falla, solo afecta upload de archivos           │
├─────────────────────────────────────────────────────────────┤
│ TOTAL: (3+2+2+3)/4 = 2.5/10 = BAJA                          │
│ SIMILAR A ButtonFileDownload                                │
│ DECISIÓN: Migrar junto en Fase 3                            │
└─────────────────────────────────────────────────────────────┘
```

---

### Componente 6: getCurrentUser.jsx
```
┌─────────────────────────────────────────────────────────────┐
│ CRITICIDAD: 🟢 MUY BAJA - FASE 4                            │
├─────────────────────────────────────────────────────────────┤
│ Propiedades usadas: session                                 │
│ Tipo: Utilidad/Hook (NO componente render)                  │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 1: Impacto de Re-renders                           │
│ Puntuación: 1/10 (NULO)                                     │
│ Razón: No es componente React                               │
│ Tipo: Es una función utilitaria que extrae datos            │
│ No causa re-renders                                         │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 2: Cambio de Formato de Datos                      │
│ Puntuación: 1/10 (NINGUNO)                                  │
│ Razón: Solo lectura de session (estructura estable)         │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 3: Riesgo de Migración                             │
│ Puntuación: 1/10 (TRIVIAL)                                  │
│ Razón: Función simple, casi sin lógica                      │
├─────────────────────────────────────────────────────────────┤
│ CRITERIO 4: Dependencias Técnicas                           │
│ Puntuación: 0/10 (NINGUNA)                                  │
│ Razón: No tiene dependencias                                │
│ Impacto: Función aislada sin efectos                        │
├─────────────────────────────────────────────────────────────┤
│ TOTAL: (1+1+1+0)/4 = 0.75/10 = TRIVIAL                      │
│ DECISIÓN: No migrar ahora, puede esperar o ignorar          │
│ NOTA: Se puede migrar siempre, pero poco impacto            │
└─────────────────────────────────────────────────────────────┘
```

---

## 📈 Matriz Comparativa de Priorización

| Componente | Re-renders | Riesgo | Impacto | Fase | Motivo |
|-----------|-----------|--------|--------|------|--------|
| **MenuNavbar** | 10/10 | 2/10 | Avatar sync | **1** | Cambio de formato CRÍTICO |
| **MainNavbar** | 10/10 | 1/10 | Max performance | **1** | En CADA página, más beneficio |
| **Layout.legacy** | 9/10 | 4/10 | Cascada de renders | **2** | Esperar validación Fase 1 |
| **InputFile** | 3/10 | 2/10 | Formularios | **3** | Baja frecuencia, bajo riesgo |
| **ButtonFileDownload** | 3/10 | 1/10 | Formularios | **3** | Similar a InputFile |
| **getCurrentUser** | 1/10 | 1/10 | Ninguno | **4** | No es componente, puede ignorarse |

---

## 🎯 Regla de Decisión: Matriz de Priorización

```
┌─────────────────────────────────────────────────────────────┐
│          CRITERIO DE PRIORIZACIÓN                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Score = Re-renders(w=0.4) + Riesgo_Inverso(w=0.3)         │
│         + Impacto_Técnico(w=0.2) + Dependencias(w=0.1)      │
│                                                             │
│  THRESHOLD:                                                 │
│  > 7.0  = FASE 1 INMEDIATO                                  │
│  5-7.0  = FASE 2 (próximo sprint)                           │
│  2-5.0  = FASE 3 (después, baja prioridad)                  │
│  < 2.0  = FASE 4 (puede esperar o ignorarse)                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Resultado de Aplicar Criterios

**FASE 1 ✅ EJECUTADA**:
- MenuNavbar (7.5/10) - Cambio de formato + Global
- MainNavbar (5.75/10 pero criterio 1 decisivo) - Performance máxima

**FASE 2 (Planeado)**:
- Layout.legacy (7.0/10) - Esperar validación Fase 1

**FASE 3 (Planeado)**:
- InputFile (2.5/10), ButtonFileDownload (2.0/10)

**FASE 4 (Ignorar)**:
- getCurrentUser (0.75/10) - No es necesario

---

## 🚨 Señales de Alerta que Disparan Cambios Urgentes

Si ocurre cualquiera de estos en la app:
1. **Avatar muestra inconsistente** → MIGRAR MenuNavbar URGENTE
2. **Navbar llena de flickering** → MIGRAR MainNavbar URGENTE
3. **Cambio en loading causa lag en navbar** → MIGRAR MainNavbar URGENTE
4. **Notificación congela la UI** → MIGRAR Layout en Fase 2

