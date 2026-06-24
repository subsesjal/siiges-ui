import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@siiges-ui/shared', () => ({
  ListTitle: ({ text }) => <span data-testid="list-title">{text}</span>,
  ListSubtitle: ({ text }) => <span data-testid="list-subtitle">{text}</span>,
}));

// eslint-disable-next-line import/first
import UserProfileViewSections from '../../../v2/components/UserProfileViewSections';

const mockUser = {
  usuario: 'jperez',
  correo: 'jperez@test.com',
  estatus: 1,
  rol: { nombre: 'Administrador', descripcion: 'Administrador' },
  persona: {
    nombre: 'Juan',
    apellidoPaterno: 'Perez',
    apellidoMaterno: 'Garcia',
    sexo: 'Masculino',
    nacionalidad: 'Mexicana',
    rfc: 'PEGJ850101ABC',
    curp: 'PEGJ850101HDFXXX01',
    celular: '5512345678',
    telefono: '5587654321',
    tituloCargo: 'Director',
  },
};

describe('UserProfileViewSections', () => {
  it('renders without crashing', () => {
    const { container } = render(<UserProfileViewSections user={mockUser} />);
    expect(container).toBeTruthy();
  });

  it('renders Datos de contacto section title', () => {
    render(<UserProfileViewSections user={mockUser} />);
    expect(screen.getByText('Datos de contacto')).toBeInTheDocument();
  });

  it('renders Datos del usuario section title', () => {
    render(<UserProfileViewSections user={mockUser} />);
    expect(screen.getByText('Datos del usuario')).toBeInTheDocument();
  });

  it('renders field labels for contact section', () => {
    render(<UserProfileViewSections user={mockUser} />);
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('RFC')).toBeInTheDocument();
    expect(screen.getByText('Correo electronico')).toBeInTheDocument();
  });

  it('renders field values', () => {
    render(<UserProfileViewSections user={mockUser} />);
    expect(screen.getByText('Juan')).toBeInTheDocument();
    expect(screen.getByText('jperez@test.com')).toBeInTheDocument();
  });

  it('shows Activado for estatus 1', () => {
    render(<UserProfileViewSections user={mockUser} />);
    expect(screen.getByText('Activado')).toBeInTheDocument();
  });

  it('shows Desactivado for estatus 0', () => {
    render(<UserProfileViewSections user={{ ...mockUser, estatus: 0 }} />);
    expect(screen.getByText('Desactivado')).toBeInTheDocument();
  });

  it('renders rol descripcion', () => {
    render(<UserProfileViewSections user={mockUser} />);
    expect(screen.getByText('Administrador')).toBeInTheDocument();
  });

  it('renders with null user without crashing', () => {
    const { container } = render(<UserProfileViewSections user={null} />);
    expect(container).toBeTruthy();
  });
});
