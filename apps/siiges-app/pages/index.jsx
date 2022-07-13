import { ThemeProvider } from '@mui/material/styles';
import Login from './login';
import theme from './theme';

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}
