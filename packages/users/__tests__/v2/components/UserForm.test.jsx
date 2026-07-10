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

function MockButtonsForm({
  cancel,
  confirm,
  confirmDisabled,
  cancelText,
}) {
  return (
    <div>
      <button type="button" onClick={cancel}>{cancelText}</button>
      {!confirmDisabled && <button type="button" onClick={confirm}>Guardar</button>}
    </div>
  );
}

MockButtonsForm.propTypes = {
  cancel: PropTypes.func,
  confirm: PropTypes.func,
  confirmDisabled: PropTypes.bool,
  cancelText: PropTypes.string,
};

MockButtonsForm.defaultProps = {
  cancel: () => {},
  confirm: () => {},
  confirmDisabled: false,
  cancelText: 'Cancelar',
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

function MockSelect({ title, name, options }) {
  return (
    <select aria-label={title} name={name}>
      {options.map((option) => (
        <option key={option.id} value={option.id}>{option.nombre}</option>
      ))}
    </select>
  );
}

MockSelect.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombre: PropTypes.string.isRequired,
  })),
};

MockSelect.defaultProps = {
  title: '',
  name: '',
  options: [],
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

  it('shows user data title in CREATE mode', () => {
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
    expect(screen.getByText('Datos del usuario')).toBeInTheDocument();
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

  it('shows user data title in VIEW mode', () => {
    render(<UserForm
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

    expect(screen.getByText('Datos del usuario')).toBeInTheDocument();
    expect(screen.queryByText('Consultar usuario')).not.toBeInTheDocument();
  });

  it('shows "Regresar" button in VIEW mode', () => {
    render(<UserForm
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

    expect(screen.getByText('Regresar')).toBeInTheDocument();
    expect(screen.queryByText('Guardar')).not.toBeInTheDocument();
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

  it('shows user data title in EDIT mode', () => {
    render(<UserForm
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

    expect(screen.getByText('Datos del usuario')).toBeInTheDocument();
    expect(screen.queryByText('Modifica usuario')).not.toBeInTheDocument();
  });

  it('adds "Rol actual" option when current role is not in session options', () => {
    render(<UserForm
      mode="EDIT"
      form={{
        ...defaultProps.form,
        rolId: '999',
      }}
      errors={defaultProps.errors}
      onChange={defaultProps.onChange}
      onBlur={defaultProps.onBlur}
      onSubmit={defaultProps.onSubmit}
      onCancel={defaultProps.onCancel}
      sessionRole="sicyt_editar"
      topAction={defaultProps.topAction}
    />);

    expect(screen.getByText('Rol actual')).toBeInTheDocument();
  });
});
