import React from 'react';
import mockPropTypes from 'prop-types';
import { render } from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
    isReady: true,
    query: {},
  })),
}));

jest.mock('@siiges-ui/shared', () => {
  const MockLayout = function MockLayout({ children }) {
    return <div>{children}</div>;
  };

  MockLayout.propTypes = {
    children: mockPropTypes.node.isRequired,
  };

  const MockLoading = function MockLoading() {
    return <div>loading</div>;
  };

  const MockDefaultModal = function MockDefaultModal({ children }) {
    return <div>{children}</div>;
  };

  MockDefaultModal.propTypes = {
    children: mockPropTypes.node.isRequired,
  };

  const MockButtonSimple = function MockButtonSimple({ text }) {
    return <button type="button">{text}</button>;
  };

  MockButtonSimple.propTypes = {
    text: mockPropTypes.string.isRequired,
  };

  return {
    useAuth: jest.fn(() => ({ session: { id: 1, token: 'abc', rol: 'admin' } })),
    useNotification: jest.fn(() => ({ error: jest.fn(), success: jest.fn() })),
    Layout: MockLayout,
    Loading: MockLoading,
    DefaultModal: MockDefaultModal,
    ButtonSimple: MockButtonSimple,
  };
});

jest.mock('../../../v2/hooks/useUsersData', () => jest.fn(() => ({
  data: [],
  loading: false,
  error: null,
})));

jest.mock('../../../v2/utils/permissions', () => ({
  getUserPermissions: jest.fn(() => ({
    canCreate: true,
    canEdit: true,
    canView: true,
    canDelete: false,
  })),
}));

jest.mock('../../../v2/components/UsersTable', () => function MockUsersTable() {
  return <div data-testid="users-table">table</div>;
});
jest.mock('../../../v2/components/UsersSkeleton', () => function MockUsersSkeleton() {
  return <div>skeleton</div>;
});
jest.mock('../../../v2/components/UsersEmptyState', () => function MockUsersEmptyState() {
  return <div>empty</div>;
});
jest.mock('../../../v2/components/UsersErrorState', () => function MockUsersErrorState() {
  return <div>error</div>;
});

const mockUseUsersData = jest.requireMock('../../../v2/hooks/useUsersData');

// eslint-disable-next-line import/first
import UsersPage from '../../../v2/components/UsersPage';

describe('UsersPage', () => {
  beforeEach(() => {
    mockUseUsersData.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });
  });

  it('renders without crashing', () => {
    const { container } = render(<UsersPage />);
    expect(container).toBeTruthy();
  });

  it('renders table when data is available', () => {
    mockUseUsersData.mockReturnValueOnce({
      data: [{
        id: 10,
        usuario: 'usuario_prueba',
        correo: 'usuario@test.com',
        rol: { descripcion: 'Admin' },
        persona: { nombre: 'Ana', apellidoPaterno: 'Lopez', apellidoMaterno: 'G' },
      }],
      loading: false,
      error: null,
    });

    const { getByTestId } = render(<UsersPage />);
    expect(getByTestId('users-table')).toBeInTheDocument();
  });
});
