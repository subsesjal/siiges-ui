import {
  Box,
  Divider,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Button } from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PaperHome from '../Paper/PaperHome';

const noticiasMock = [
  {
    id: 1,
    title: 'Noticia 1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    title: 'Noticia 2',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    title: 'Noticia 3',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 4,
    title: 'Noticia 4',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 5,
    title: 'Noticia 5',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 6,
    title: 'Noticia 6',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 7,
    title: 'Noticia 7',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const router = useRouter();

  const noticiasPerPage = 3;
  const totalNoticias = noticiasMock.length;

  const nextNoticia = () => {
    if (carouselIndex + noticiasPerPage < totalNoticias) {
      setCarouselIndex(carouselIndex + noticiasPerPage);
    } else {
      setCarouselIndex(0);
    }
  };

  const prevNoticia = () => {
    if (carouselIndex > 0) {
      setCarouselIndex(carouselIndex - noticiasPerPage);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextNoticia();
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselIndex]);

  const noticiasVisibles = noticiasMock.slice(
    carouselIndex,
    carouselIndex + noticiasPerPage,
  );

  const handleButtonClick = () => {
    router.push('/serviciosEscolares/alumnos');
  };

  return (
    <>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>
      <Divider sx={{ mt: 5 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& > :not(style)': {
            mt: 5,
            mx: 1,
          },
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
                title={noticia.title}
                text={noticia.text}
                sx={{ width: '100%', height: '100%' }}
              />
            </Box>
          ))}
        </Box>

        <IconButton
          onClick={nextNoticia}
          disabled={carouselIndex + noticiasPerPage >= totalNoticias}
          sx={{ fontSize: '1.5rem', padding: '0.5rem' }}
        >
          <ArrowForwardIosIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Box sx={{ mt: 6 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} textAlign="center">
            <Typography fontSize={25}>Avances Académicos</Typography>
            <Button
              text="Avances"
              onClick={handleButtonClick}
              type="people"
              align="center"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default HomePage;
