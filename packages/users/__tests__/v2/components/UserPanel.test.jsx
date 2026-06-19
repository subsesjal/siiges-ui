import React from 'react';
import { render } from '@testing-library/react';

jest.mock('@siiges-ui/shared', () => ({
  BinarySelect: ({ label }) => <select aria-label={label} />,
  ButtonsForm: ({ cancel, confirm }) => (
    <div>
      <button type="button" onClick={cancel}>Cancelar</button>
      <button type="button" onClick={confirm}>Guardar</button>
    </div>
  ),
  Input: ({ label, name }) => <input aria-label={label} name={name} />,
  InputPassword: ({ label, name }) => <input type="password" aria-label={label} name={name} />,
  Select: ({ title, name }) => <select aria-label={title} name={name} />,
}));

jest.mock('../../../v2/components/UserForm', () => function MockUserForm({ mode }) {
  return <div data-testid="user-form">{mode}</div>;
});

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

describe('UserPanel', () => {
  it('renders without crashing in CREATE mode', () => {
    const { container } = render(<UserPanel {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  it('renders without crashing in EDIT mode', () => {
    const user = {
      id: 1,
      correo: 'u@t.com',
      rol: { id: 2 },
      persona: { nombre: 'A', apellidoPaterno: 'B', apellidoMaterno: '' },
    };
    const { container } = render(<UserPanel {...defaultProps} mode="EDIT" user={user} />);
    expect(container).toBeTruthy();
  });

  it('renders without crashing in VIEW mode', () => {
    const { container } = render(<UserPanel {...defaultProps} mode="VIEW" />);
    expect(container).toBeTruthy();
  });

  it('renders loading state', () => {
    const { container } = render(<UserPanel {...defaultProps} loading />);
    expect(container).toBeTruthy();
  });

  it('renders error state', () => {
    const { container } = render(<UserPanel {...defaultProps} error={{ message: 'Error' }} />);
    expect(container).toBeTruthy();
  });
});
