import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0072ce',
    },
    secondary: {
      main: 'rgb(255, 136, 26, 1)',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
  overrides: {
    MuiInputBase: {
      input: {
        '&::-moz-calendar-picker-indicator': {
          display: 'none',
        },
      },
    },
  },
});

export default theme;
