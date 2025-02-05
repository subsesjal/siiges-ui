import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#74C8D2',
    },
    secondary: {
      main: '#FF8300',
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
