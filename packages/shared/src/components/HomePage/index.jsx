import {
  Box, Divider, Typography, IconButton,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { ButtonSimple, DefaultModal, getData } from '@siiges-ui/shared';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PaperHome from '../Paper/PaperHome';

function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [noticias, setNoticias] = useState([]);
  const [open, setOpen] = useState(true);
  const noticiasPerPage = 3;

  useEffect(() => {
    const fetchNoticias = async () => {
      const response = await getData({ endpoint: '/noticias' });
      if (response.statusCode === 200) {
        setNoticias(response.data);
      }
    };
    fetchNoticias();
  }, []);

  const nextNoticia = () => {
    setCarouselIndex(
      (prev) => (prev + noticiasPerPage < noticias.length ? prev + noticiasPerPage : 0),
    );
  };

  const prevNoticia = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - noticiasPerPage : 0));
  };

  useEffect(() => {
    const interval = setInterval(nextNoticia, 5000);
    return () => clearInterval(interval);
  }, [carouselIndex, noticias.length]);

  const noticiasVisibles = noticias.slice(
    carouselIndex,
    carouselIndex + noticiasPerPage,
  );

  return (
    <>
      <Typography>
        Bienvenida/o al Sistema de Información para la Gestión de la Educación
        Superior (SIGES) Plataforma digital para instituciones con RVOE, donde
        podrán realizar trámites ante la Dirección General de Incorporación y
        Servicios Escolares.
      </Typography>
      <Divider sx={{ mt: 5 }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& > :not(style)': { mt: 5, mx: 1 },
        }}
      >
        <IconButton
          onClick={prevNoticia}
          disabled={carouselIndex === 0}
          sx={{ fontSize: '1.5rem', padding: '0.5rem' }}
        >
          <ArrowBackIosNewIcon fontSize="inherit" />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            maxWidth: 1000,
            mx: 'auto',
            gap: 2,
          }}
        >
          {noticiasVisibles.map((noticia) => (
            <Box
              key={noticia.id}
              sx={{
                width: 300,
                height: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PaperHome
                title={noticia.titulo}
                image={noticia.urlImagen}
                url={noticia.urlNoticia}
              />
            </Box>
          ))}
        </Box>

        <IconButton
          onClick={nextNoticia}
          disabled={carouselIndex + noticiasPerPage >= noticias.length}
          sx={{ fontSize: '1.5rem', padding: '0.5rem' }}
        >
          <ArrowForwardIosIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <DefaultModal title="Aviso Importante" titleColor="red" open={open} setOpen={setOpen}>
        <Typography>
          Te recordamos que el próximo 31 de julio de 2026 es el último día para
          completar y enviar tus solicitudes pendientes.
        </Typography>
        <Typography>Toma en cuenta las siguientes consideraciones:</Typography>
        <Typography>
          Iniciar la captura no garantiza tu participación: Tu trámite solo se
          considerará dentro de la convocatoria una vez que haya sido completado
          y enviado a revisión.
        </Typography>
        <Typography>
          Depuración de trámites: Aquellas solicitudes que permanezcan
          inconclusas o no enviadas al cierre del plazo serán eliminadas del
          sistema (cancelación de folio).
        </Typography>
        <Typography>
          ¡Evita contratiempos y concluye tu trámite a tiempo!
        </Typography>
        <ButtonSimple align="right" design="enviar" onClick={() => setOpen(false)} text="Cerrar" />
      </DefaultModal>
    </>
  );
}

export default HomePage;
