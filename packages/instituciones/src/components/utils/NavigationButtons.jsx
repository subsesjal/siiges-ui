import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Grid, IconButton, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { styled } from '@mui/system';
import { ButtonSimple } from '@siiges-ui/shared';

const CircularIconButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: '50%',
  padding: '6px',
  transition:
    'transform 0.2s ease-in-out, background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    color: '#fff',
    backgroundColor: `${theme.palette.primary.main}`,
    boxShadow: 'rgba(0, 0, 0, 0.10) 0 8px 15px',
    transform: 'translateY(-2px)',
  },
}));

export default function NavigationButtons({
  page, onNext, onPrevious, id,
}) {
  const router = useRouter();
  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid
        container
        item
        xs={6}
        alignItems="center"
        justifyContent="flex-start"
        spacing={1}
      >
        <Grid item>
          <ButtonSimple
            text="Regresar"
            design="enviar"
            onClick={() => {
              router.back();
            }}
          />
        </Grid>
        <Grid item>
          <ButtonSimple
            text="Editar"
            onClick={() => {
              router.push(`/instituciones/editar/${id}`);
            }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={6}
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
      >
        {page === 2 && (
          <>
            <Grid item>
              <Typography align="center">Anterior</Typography>
            </Grid>
            <Grid item>
              <CircularIconButton
                onClick={onPrevious}
                aria-label="Anterior"
                sx={{
                  transform: 'rotate(180deg)',
                  '&:hover': {
                    transform: 'rotate(180deg) translateY(2px)',
                  },
                }}
              >
                <NavigateNextIcon />
              </CircularIconButton>
            </Grid>
          </>
        )}
        {page === 1 && (
          <>
            <Grid item>
              <Typography align="center">Siguiente</Typography>
            </Grid>
            <Grid item>
              <CircularIconButton onClick={onNext} aria-label="Siguiente">
                <NavigateNextIcon />
              </CircularIconButton>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}

NavigationButtons.propTypes = {
  id: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};
