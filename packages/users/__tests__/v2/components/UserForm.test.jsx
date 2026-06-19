import React from 'react';
import PropTypes from 'prop-types';
import { render, screen } from '@testing-library/react';

function MockBinarySelect({ label }) {
  return <select aria-label={label} />;
}

MockBinarySelect.propTypes = {
  label: PropTypes.string,
};

MockBinarySelect.defaultProps = {
  label: '',
};

function MockButtonsForm({ cancel, confirm }) {
  return (
    <div>
      <button type="button" onClick={cancel}>Cancelar</button>
      <button type="button" onClick={confirm}>Guardar</button>
    </div>
  );
}

MockButtonsForm.propTypes = {
  cancel: PropTypes.func,
  confirm: PropTypes.func,
};

MockButtonsForm.defaultProps = {
  cancel: () => {},
  confirm: () => {},
};

function MockInput({ label, name }) {
  return <input aria-label={label} name={name} />;
}

MockInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

MockInput.defaultProps = {
  label: '',
  name: '',
};

function MockInputPassword({ label, name }) {
  return <input type="password" aria-label={label} name={name} />;
}

MockInputPassword.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

MockInputPassword.defaultProps = {
  label: '',
  name: '',
};

function MockSelect({ title, name }) {
  return <select aria-label={title} name={name} />;
}

MockSelect.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
};

MockSelect.defaultProps = {
  title: '',
  name: '',
};

jest.mock('@siiges-ui/shared', () => ({
  BinarySelect: MockBinarySelect,
  ButtonsForm: MockButtonsForm,
  Input: MockInput,
  InputPassword: MockInputPassword,
  Select: MockSelect,
}));

// eslint-disable-next-line global-require, import/no-unresolved, import/extensions
const UserForm = require('../../../v2/components/UserForm/index.jsx').default;

const defaultProps = {
  mode: 'CREATE',
  form: {
    correo: '',
    rolId: '',
    estatus: 1,
    usuario: '',
    contrasena: '',
    repeatContrasena: '',
    persona: {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      tituloCargo: '',
    },
  },
  errors: {},
  sessionRole: 'admin',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
  topAction: null,
};

describe('UserForm', () => {
  it('renders without crashing in CREATE mode', () => {
    const { container } = render(<UserForm
      mode={defaultProps.mode}
      form={defaultProps.form}
      errors={defaultProps.errors}
      onChange={defaultProps.onChange}
      onBlur={defaultProps.onBlur}
      onSubmit={defaultProps.onSubmit}
      onCancel={defaultProps.onCancel}
      sessionRole={defaultProps.sessionRole}
      topAction={defaultProps.topAction}
    />);
    expect(container).toBeTruthy();
  });

  it('shows CREATE title', () => {
    render(<UserForm
      mode={defaultProps.mode}
      form={defaultProps.form}
      errors={defaultProps.errors}
      onChange={defaultProps.onChange}
      onBlur={defaultProps.onBlur}
      onSubmit={defaultProps.onSubmit}
      onCancel={defaultProps.onCancel}
      sessionRole={defaultProps.sessionRole}
      topAction={defaultProps.topAction}
    />);
    expect(screen.getByText('Crear usuario')).toBeInTheDocument();
  });

  it('renders without crashing in VIEW mode', () => {
    const { container } = render(<UserForm
      mode="VIEW"
      form={defaultProps.form}
      errors={defaultProps.errors}
      onChange={defaultProps.onChange}
      onBlur={defaultProps.onBlur}
      onSubmit={defaultProps.onSubmit}
      onCancel={defaultProps.onCancel}
      sessionRole={defaultProps.sessionRole}
      topAction={defaultProps.topAction}
    />);
    expect(container).toBeTruthy();
  });

  it('renders without crashing in EDIT mode', () => {
    const { container } = render(<UserForm
      mode="EDIT"
      form={defaultProps.form}
      errors={defaultProps.errors}
      onChange={defaultProps.onChange}
      onBlur={defaultProps.onBlur}
      onSubmit={defaultProps.onSubmit}
      onCancel={defaultProps.onCancel}
      sessionRole={defaultProps.sessionRole}
      topAction={defaultProps.topAction}
    />);
    expect(container).toBeTruthy();
  });
});
