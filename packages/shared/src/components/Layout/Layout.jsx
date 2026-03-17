import {
  Box, Card, CardContent, Container, Typography,
} from '@mui/material';
import React, { useState, useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import MenuDrawer from '../Drawer/MenuDrawer';
import MainNavbar from '../Navbar/MainNavbar';
import Loading from '../Loading';
import useCheckMobileScreen from '../../utils/handlers/useCheckMobileScreen';
import Title from '../Title';
import { Context } from '../../utils/handlers/context';
import useShowFooter from '../../utils/hooks/useShowFooter';

export default function Overlay({
  children, title, subtitle, type,
}) {
  const [open, setOpen] = useState(false);

  const {
    session, section, setSection, loading,
  } = useContext(Context);

  const showFooter = useShowFooter();

  const onClickChange = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let localtype = type;
  if (useCheckMobileScreen()) {
    localtype = false;
  }

  return (
    <>
      <div
        id="main-scroll"
        style={{
          backgroundImage: 'url(/Fondo.png)',
          backgroundSize: 'cover',
          position: 'fixed',
          overflow: 'auto',
          height: '100%',
          width: '100%',
        }}
      >
        <Loading loading={loading} />

        <MainNavbar
          menuSwitch={() => onClickChange()}
          section={section}
          setSection={setSection}
          rol={session?.rol}
        />

        {session && (
          <MenuDrawer
            open={open}
            openFunction={handleDrawerOpen}
            closeFunction={handleDrawerClose}
            section={section}
            session={session}
          />
        )}

        <Container
          sx={{
            paddingTop: 5,
            paddingBottom: 15,
          }}
        >
          {localtype ? (
            <Card>
              <CardContent>
                <Title title={title} subtitle={subtitle} />
                {children}
              </CardContent>
            </Card>
          ) : (
            <>
              <Title title={title} subtitle={subtitle} />
              {children}
            </>
          )}
        </Container>
      </div>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: 'rgb(206, 209, 212)',
          py: 2,
          textAlign: 'center',
          zIndex: 1200,

          opacity: showFooter ? 1 : 0,
          visibility: showFooter ? 'visible' : 'hidden',
          transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out',
        }}
      >
        <Typography variant="body2" sx={{ color: '#3b4245' }}>
          &copy; 2025 Secretaría General de Gobierno - Todos los derechos reservados.
        </Typography>

        <Typography variant="body2" sx={{ color: '#3b4245' }}>
          Edificio MIND Av. Faro #2350, Colonia: Verde Valle, CP: 44540, Guadalajara, Jalisco
          Lunes a Viernes de 09:00:00 a 17:00:00 horas
        </Typography>

        <Typography variant="body2" sx={{ color: '#3b4245' }}>
          <Link
            href="https://transparenciasitgej.jalisco.gob.mx/api/api/archivos/1908/download?inline=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            Avisos de privacidad
          </Link>
        </Typography>
      </Box>
    </>
  );
}

Overlay.defaultProps = {
  type: true,
  title: '',
  subtitle: '',
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  type: PropTypes.bool,
  subtitle: PropTypes.string,
};
