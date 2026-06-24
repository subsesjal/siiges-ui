import React from 'react';
import { render } from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn(), back: jest.fn() })),
}));

jest.mock('@siiges-ui/shared', () => ({
  useAuth: jest.fn(() => ({ session: { id: 1, token: 'abc', rol: 'admin' } })),
  useNotification: jest.fn(() => ({ error: jest.fn(), success: jest.fn() })),
  Layout: ({ children, title }) => <div data-testid="layout" aria-label={title}>{children}</div>,
  Loading: () => <div>loading</div>,
}));

jest.mock('../../../v2/hooks/useUserDetail', () => jest.fn(() => ({
  data: {
    id: 1,
    correo: 'user@test.com',
    usuario: 'testuser',
    estatus: 1,
    rol: { id: 2, descripcion: 'Admin' },
    persona: { nombre: 'Juan', apellidoPaterno: 'Perez', apellidoMaterno: 'G' },
  },
  loading: false,
  error: null,
})));

jest.mock('../../../v2/components/UserProfileEditForm', () => function MockForm({ onSubmit, onCancel }) {
  return (
    <div data-testid="edit-form">
      <button type="button" onClick={onSubmit}>Submit</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </div>
  );
});

jest.mock('../../../v2/components/UserProfileSkeleton', () => () => <div>skeleton</div>);
jest.mock('../../../v2/services/usuarios.service', () => ({
  updateUser: jest.fn().mockResolvedValue({}),
}));

// eslint-disable-next-line import/first
import UserProfileEditPage from '../../../v2/components/UserProfileEditPage';

describe('UserProfileEditPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<UserProfileEditPage />);
    expect(container).toBeTruthy();
  });

  it('renders the edit form when data is loaded', () => {
    const { getByTestId } = render(<UserProfileEditPage />);
    expect(getByTestId('edit-form')).toBeInTheDocument();
  });
});
