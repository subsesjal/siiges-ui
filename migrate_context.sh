#!/bin/bash
# Script to extract useContext patterns for migration

for file in \
  "apps/siiges-app/pages/inspecciones/misInspecciones/[id]/nuevaInspeccion.jsx" \
  "apps/siiges-app/pages/inspecciones/misInspecciones/index.jsx" \
  "apps/siiges-app/pages/instituciones/consultar/[institucionId]/index.jsx" \
  "apps/siiges-app/pages/instituciones/editar/[institucionId]/index.jsx" \
  "apps/siiges-app/pages/instituciones/index.jsx" \
  "apps/siiges-app/pages/instituciones/miInstitucion/index.jsx" \
  "apps/siiges-app/pages/notificaciones/index.jsx" \
  "apps/siiges-app/pages/serviciosEscolares/egresados/index.jsx" \
  "apps/siiges-app/pages/serviciosEscolares/programas/[id]/editPrograma.jsx" \
  "apps/siiges-app/pages/serviciosEscolares/revalidacionEquivalencias/[id]/Equivalencias/procesar/index.jsx" \
  "apps/siiges-app/pages/serviciosEscolares/revalidacionEquivalencias/[id]/Equivalencias/revisar/index.jsx" \
  "apps/siiges-app/pages/serviciosEscolares/revalidacionEquivalencias/[id]/Revalidacion/procesar/index.jsx" \
  "apps/siiges-app/pages/serviciosEscolares/revalidacionEquivalencias/[id]/Revalidacion/revisar/index.jsx" \
  "apps/siiges-app/pages/serviciosEscolares/servicioSocial/crear/index.jsx" \
  "apps/siiges-app/pages/serviciosEscolares/solicitudesFolios/admin/[id]/folios.jsx" \
  "apps/siiges-app/pages/serviciosEscolares/solicitudesFolios/alumnos/[id]/certificados/index.jsx" \
  "apps/siiges-app/pages/serviciosEscolares/solicitudesFolios/alumnos/[id]/titulos/index.jsx" \
  "apps/siiges-app/pages/serviciosEscolares/solicitudesFolios/index.jsx" \
  "apps/siiges-app/pages/serviciosEscolares/titulacion/index.jsx" \
  "apps/siiges-app/pages/solicitudes/detallesSolicitudes/[id]/index.jsx" \
  "apps/siiges-app/pages/solicitudes/detallesSolicitudes/[id]/recepcionFormatos/index.jsx" \
  "apps/siiges-app/pages/solicitudes/index.jsx" \
  "apps/siiges-app/pages/solicitudesBecas/crear/index.jsx" \
  "apps/siiges-app/pages/tituloElectronico/[folio]/consultarFolio.jsx" \
  "apps/siiges-app/pages/usuarios/consultar/[usuarioId]/index.jsx" \
  "apps/siiges-app/pages/usuarios/crear/index.jsx" \
  "apps/siiges-app/pages/usuarios/editar/[usuarioId]/index.jsx" \
  "apps/siiges-app/pages/usuarios/perfilUsuario/index.jsx"
do
  if [ -f "$file" ]; then
    echo "=== $file ==="
    grep -n "useContext(Context)" "$file" || echo "No match found"
  fi
done
