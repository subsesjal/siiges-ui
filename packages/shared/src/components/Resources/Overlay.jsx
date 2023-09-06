import React from 'react';
import MenuDrawer from '../Drawer/MenuDrawer';
import MainNavbar from '../Navbar/Mainnavbar';
import Background from './Background';

export default function Overlay() {
  return (
    <>
      <Background />
      <MainNavbar />
      <MenuDrawer />
    </>
  );
}
