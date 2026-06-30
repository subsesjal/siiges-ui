import React from 'react';
import PropTypes from 'prop-types';
import { fireEvent, render, screen } from '@testing-library/react';

function MockUserForm({
  mode, onSubmit, onCancel, topAction,
}) {
  return (
    <div data-testid="user-form">
      <span>{mode}</span>
      {topAction}
      <button type="button" onClick={onSubmit}>Submit</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </div>
  );
}

MockUserForm.propTypes = {
  mode: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  topAction: PropTypes.node,
};

MockUserForm.defaultProps = {
  topAction: null,
};

function MockBinarySelect({ label }) {
  return <select aria-label={label} />;
}

MockBinarySelect.propTypes = {
  label: PropTypes.string.isRequired,
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
  cancel: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

function MockInput({ label, name }) {
  return <input aria-label={label} name={name} />;
}

MockInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function MockInputPassword({ label, name }) {
  return <input type="password" aria-label={label} name={name} />;
}

MockInputPassword.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function MockSelect({ title, name }) {
  return <select aria-label={title} name={name} />;
}

MockSelect.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

jest.mock('@siiges-ui/shared', () => ({
  BinarySelect: MockBinarySelect,
  ButtonsForm: MockButtonsForm,
  Input: MockInput,
  InputPassword: MockInputPassword,
  Select: MockSelect,
}));

jest.mock('../../../v2/hooks/useUserForm', () => jest.fn());

jest.mock('../../../v2/components/UserForm', () => MockUserForm);

const mockUseUserForm = jest.requireMock('../../../v2/hooks/useUserForm');

// eslint-disable-next-line import/first
import UserPanel from '../../../v2/components/UserPanel';

const defaultProps = {
  mode: 'CREATE',
  user: null,
  loading: false,
  error: null,
  actionLoading: false,
  onClose: jest.fn(),
  onCreate: jest.fn(),
  onUpdate: jest.fn(),
  onNotify: { error: jest.fn(), success: jest.fn() },
  sessionRole: 'admin',
  sessionUserId: 1,
};

const renderPanel = (overrides = {}) => {
  const props = { ...defaultProps, ...overrides };
  return render(React.createElement(UserPanel, props));
};

beforeEach(() => {
  jest.clearAllMocks();
  mockUseUserForm.mockReturnValue({
    form: { correo: 'user@test.com', persona: {} },
    errors: {},
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    validate: jest.fn(() => ({
      valid: true,
      cleanedData: { correo: 'user@test.com', rolId: 2, estatus: 1 },
      errors: {},
    })),
  });
});

describe('UserPanel', () => {
  it('renders without crashing in CREATE mode', () => {
    const { container } = renderPanel();
    expect(container).toBeTruthy();
  });

  it('renders without crashing in EDIT mode', () => {
    const user = {
      id: 1,
      correo: 'u@t.com',
      rol: { id: 2 },
      persona: { nombre: 'A', apellidoPaterno: 'B', apellidoMaterno: '' },
    };
    const { container } = renderPanel({ mode: 'EDIT', user });
    expect(container).toBeTruthy();
  });

  it('renders without crashing in VIEW mode', () => {
    const { container } = renderPanel({ mode: 'VIEW' });
    expect(container).toBeTruthy();
  });

  it('renders loading state', () => {
    const { container } = renderPanel({ loading: true });
    expect(container).toBeTruthy();
  });

  it('renders error state', () => {
    const { container } = renderPanel({ error: { message: 'Error' } });
    expect(container).toBeTruthy();
  });

  it('calls onCreate with cleaned data in CREATE mode', () => {
    const onCreate = jest.fn();
    renderPanel({ onCreate });

    fireEvent.click(screen.getByText('Submit'));

    expect(onCreate).toHaveBeenCalledWith({ correo: 'user@test.com', rolId: 2, estatus: 1 });
  });

  it('shows validation error when submit is invalid', () => {
    const onNotify = { error: jest.fn(), success: jest.fn() };
    mockUseUserForm.mockReturnValueOnce({
      form: { correo: '', persona: {} },
      errors: {},
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      validate: jest.fn(() => ({
        valid: false,
        cleanedData: {},
        errors: { correo: 'Correo requerido' },
      })),
    });

    renderPanel({ onNotify });

    fireEvent.click(screen.getByText('Submit'));

    expect(onNotify.error).toHaveBeenCalledWith('Correo requerido');
  });

  it('locks rol and estatus on self edit submit', () => {
    const onUpdate = jest.fn();
    const user = {
      id: 1,
      estatus: 0,
      rol: { id: 9 },
      correo: 'u@t.com',
      persona: { nombre: 'A', apellidoPaterno: 'B', apellidoMaterno: '' },
    };

    mockUseUserForm.mockReturnValueOnce({
      form: {
        correo: 'changed@test.com', persona: {}, rolId: 7, estatus: 1,
      },
      errors: {},
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      validate: jest.fn(() => ({
        valid: true,
        cleanedData: { correo: 'changed@test.com', rolId: 7, estatus: 1 },
        errors: {},
      })),
    });

    renderPanel({
      mode: 'EDIT', user, sessionUserId: 1, onUpdate,
    });

    fireEvent.click(screen.getByText('Submit'));

    expect(onUpdate).toHaveBeenCalledWith(1, {
      correo: 'changed@test.com',
      rolId: 9,
      estatus: 0,
    });
  });

  it('does not submit while actionLoading is true', () => {
    const onCreate = jest.fn();
    renderPanel({ actionLoading: true, onCreate });

    fireEvent.click(screen.getByText('Submit'));

    expect(onCreate).not.toHaveBeenCalled();
  });
});
