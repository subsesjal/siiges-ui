import React from 'react';
import MenuDrawer from '../Drawer/MenuDrawer';
import MainNavbar from '../Navbar/MainNavbar';
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
