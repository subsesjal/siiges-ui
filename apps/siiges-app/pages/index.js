import { ThemeProvider } from '@mui/material/styles';
import Login from './login/reference'
import theme from './theme';

export default function Home() {
	return (
		<ThemeProvider theme={theme}>
			<Login></Login>
		</ThemeProvider>
	);
}
