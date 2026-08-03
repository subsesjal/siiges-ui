import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { AuthProvider, useAuth } from '../../src/contexts/AuthContext';

const mockPush = jest.fn();
const mockGetTokenLocalStorage = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    route: '/home',
  }),
}));

jest.mock('../../src/utils/handlers/getToken', () => ({
  __esModule: true,
  default: () => mockGetTokenLocalStorage(),
}));

function Consumer() {
  const {
    session, auth, activateAuth, removeAuth,
  } = useAuth();

  return (
    <div>
      <div data-testid="auth">{String(auth)}</div>
      <div data-testid="session">{JSON.stringify(session)}</div>
      <button
        type="button"
        onClick={() => activateAuth({
          data: {
            id: 22,
            usuario: 'usuario-demo',
            rol: { nombre: 'representante' },
            estatus: true,
          },
          token: 'jwt-token',
        })}
      >
        login
      </button>
      <button type="button" onClick={removeAuth}>logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('hydrates session from token storage', async () => {
    mockGetTokenLocalStorage.mockReturnValue({
      id: 1,
      nombre: 'a',
      rol: 'representante',
      estatus: true,
      token: 'jwt',
    });

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    );

    await waitFor(() => expect(screen.getByTestId('auth')).toHaveTextContent('true'));
    expect(screen.getByTestId('session')).toHaveTextContent('"estatus":true');
  });

  it('activateAuth persists estatus and redirects to home', async () => {
    mockGetTokenLocalStorage.mockReturnValue(null);

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    );

    fireEvent.click(screen.getByText('login'));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/home'));
    expect(screen.getByTestId('session')).toHaveTextContent('"estatus":true');
  });

  it('removeAuth clears auth state and redirects root', async () => {
    mockGetTokenLocalStorage.mockReturnValue({
      id: 1,
      nombre: 'a',
      rol: 'representante',
      estatus: true,
      token: 'jwt',
    });

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    );

    fireEvent.click(screen.getByText('logout'));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
    expect(screen.getByTestId('auth')).toHaveTextContent('false');
  });
});
