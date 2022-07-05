import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { LoginButton } from '@siiges-ui/shared';
import { ThemeProvider } from '@mui/material/styles';
import Login from './Login'
import theme from './theme';

export default function Home() {
	return (
		<ThemeProvider theme={theme}>
			<Login></Login>
		</ThemeProvider>
	);
}
