import { Carousel, PaperInstitucion } from '@siiges-ui/shared';
import React from 'react';

export default function InstitucionesCarousel() {
  const instituciones = [
    { id: 1, nombre: 'Universidad Nacional Autónoma' },
    { id: 2, nombre: 'Instituto Politécnico Nacional' },
    { id: 3, nombre: 'Universidad Autónoma Metropolitana' },
    { id: 4, nombre: 'Instituto Tecnológico de Estudios Superiores' },
    { id: 5, nombre: 'Centro de Investigación y de Estudios Avanzados' },
    { id: 6, nombre: 'Escuela Superior de Ingeniería Mecánica y Eléctrica' },
    { id: 7, nombre: 'Universidad Iberoamericana' },
  ];

  return (
    <Carousel>
      {instituciones.map((institucion) => (
        <PaperInstitucion
          key={institucion.id}
          name={institucion.nombre}
          route="/opds/fortalecimiento/planMaestro"
        />
      ))}
    </Carousel>
  );
}
