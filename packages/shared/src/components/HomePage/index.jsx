import {
  Box, Divider, Typography, IconButton,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PaperHome from '../Paper/PaperHome';

function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const noticiasPerPage = 3;
  const router = useRouter();

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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua...
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
    </>
  );
}

export default HomePage;
