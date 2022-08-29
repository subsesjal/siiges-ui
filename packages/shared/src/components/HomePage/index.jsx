import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import PaperHome from '../Paper/PaperHome';

function HomePage() {
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
          '& > :not(style)': {
            mt: 5,
            mx: 1,
            width: 350,
            height: 230,
          },
        }}
      >
        <PaperHome
          title="Noticia 1"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua."
        />
        <PaperHome
          title="Noticia 2"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua."
        />
        <PaperHome
          title="Noticia 3"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua."
        />
        <PaperHome
          title="Noticia 4"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua."
        />
      </Box>
    </>
  );
}

export default HomePage;
