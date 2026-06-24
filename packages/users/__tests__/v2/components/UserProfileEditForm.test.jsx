import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@siiges-ui/shared', () => ({
  BinarySelect: ({ label }) => <select aria-label={label} />,
  ButtonsForm: ({ cancel, confirm }) => (
    <div>
      <button type="button" onClick={cancel}>Cancelar</button>
      <button type="button" onClick={confirm}>Guardar</button>
    </div>
  ),
  Input: ({ label, name }) => <input aria-label={label} name={name} />,
  Select: ({ title, name }) => <select aria-label={title} name={name} />,
}));

// eslint-disable-next-line import/first
import UserProfileEditForm from '../../../v2/components/UserProfileEditForm';

const defaultProps = {
  form: {
    correo: 'test@test.com',
    rolId: '1',
    estatus: 1,
    persona: {
      nombre: 'Juan',
      apellidoPaterno: 'Perez',
      apellidoMaterno: 'G',
      sexo: 'Masculino',
      nacionalidad: 'Mexicana',
      rfc: '',
      curp: '',
      celular: '',
      telefono: '',
      tituloCargo: '',
    },
  },
  errors: {},
  sessionRole: 'admin',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
};

describe('UserProfileEditForm', () => {
  it('renders without crashing', () => {
    const { container } = render(<UserProfileEditForm {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  it('renders Datos de contacto section', () => {
    render(<UserProfileEditForm {...defaultProps} />);
    expect(screen.getByText('Datos de contacto')).toBeInTheDocument();
  });

  it('renders Datos del usuario section', () => {
    render(<UserProfileEditForm {...defaultProps} />);
    expect(screen.getByText('Datos del usuario')).toBeInTheDocument();
  });
});
