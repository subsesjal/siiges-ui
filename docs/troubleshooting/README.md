# 🐛 Troubleshooting - Resolución de Problemas

Documentación de errores conocidos, sus causas y soluciones.

## 📋 Problemas Documentados

- **[signin-context-error.md](./signin-context-error.md)** - TypeError en componentes authentication
  - Error: `Cannot destructure property 'activateAuth' of useContext(...)`
  - Causa: Componentes intentaban usar Context legacy de forma inconsistente
  - Solución: Migrar a useAuth() y useUI()
  - Status: ✅ Resuelto

## 📋 Cómo Usar Esta Sección

1. **Búsqueda**: Si tienes un error, busca por:
   - Mensaje de error exacto
   - Nombre del componente
   - Palabra clave (context, avatar, loading, etc)

2. **Si no encuentras tu error**:
   - Crea un nuevo archivo siguiendo el template
   - Documenta: síntomas, causa raíz, pasos para reproducir, solución
   - Solicita review

3. **Después de resolver**:
   - Documenta la solución aquí
   - Incluye cómo prevenir que vuelva a ocurrir

## 📝 Template para Nuevo Troubleshooting

```markdown
# Problema: [Título del Error o Problema]

**Síntomas**: Cómo se ve/siente el problema...
**Causa Raíz**: Por qué ocurre...
**Componentes Afectados**: Cuáles son...
**Marco Temporal**: Cuándo comenzó...

## Pasos para Reproducir
1. Paso 1
2. Paso 2
3. Paso 3

## Error Exacto
```
[copiar stack trace o error message aquí]
```

## Solución
Paso a paso para resolverlo...

## Validación
Cómo verificar que está resuelto...

## Prevención
Cómo evitar que  vuelva a ocurrir...

## Referencias
Links a documentación relacionada...
```

---

## 📊 Problemas Resueltos

| Problema | Fecha | Estado | Componentes |
|----------|-------|--------|------------|
| SignIn Context Error | 14-02-2026 | ✅ Resuelto | 4 componentes |

---

## 📚 Referencias

- [Parent: docs/](../)
- [Related: guides/migration-guide.md](../guides/migration-guide.md)
