import React from 'react';
import { render } from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
    isReady: true,
    query: { usuarioId: '1' },
  })),
}));

jest.mock('@siiges-ui/shared', () => ({
  useAuth: jest.fn(() => ({ session: { id: 1, token: 'abc', rol: 'admin' } })),
  useNotification: jest.fn(() => ({ error: jest.fn(), success: jest.fn() })),
  Layout: ({ children }) => <div>{children}</div>,
  Loading: () => <div>loading</div>,
}));

jest.mock('../../../v2/hooks/useUserDetail', () => jest.fn(() => ({
  data: {
    id: 1,
    correo: 'user@test.com',
    rol: { id: 2, descripcion: 'Admin' },
    persona: { nombre: 'Juan', apellidoPaterno: 'Perez', apellidoMaterno: 'G' },
  },
  loading: false,
  error: null,
})));

jest.mock('../../../v2/utils/permissions', () => ({
  getUserPermissions: jest.fn(() => ({
    canCreate: true,
    canEdit: true,
    canView: true,
  })),
}));

jest.mock('../../../v2/services/usuarios.service', () => ({
  createUser: jest.fn().mockResolvedValue({}),
  updateUser: jest.fn().mockResolvedValue({}),
}));

jest.mock('../../../v2/components/UserPanel', () => function MockUserPanel() {
  return <div data-testid="user-panel">panel</div>;
});

// eslint-disable-next-line import/first
import UserRoutePage from '../../../v2/components/UserRoutePage';

describe('UserRoutePage', () => {
  it('renders VIEW mode without crashing', () => {
    const { container } = render(<UserRoutePage mode="VIEW" />);
    expect(container).toBeTruthy();
  });

  it('renders CREATE mode without crashing', () => {
    const { container } = render(<UserRoutePage mode="CREATE" />);
    expect(container).toBeTruthy();
  });

  it('renders EDIT mode without crashing', () => {
    const { container } = render(<UserRoutePage mode="EDIT" />);
    expect(container).toBeTruthy();
  });
});
