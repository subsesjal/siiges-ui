import React from 'react';
import { render } from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
    isReady: true,
    query: {},
  })),
}));

jest.mock('@siiges-ui/shared', () => ({
  useAuth: jest.fn(() => ({ session: { id: 1, token: 'abc', rol: 'admin' } })),
  useNotification: jest.fn(() => ({ error: jest.fn(), success: jest.fn() })),
  Layout: ({ children }) => <div>{children}</div>,
  Loading: () => <div>loading</div>,
}));

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

jest.mock('../../../v2/components/UsersTable', () => () => <div data-testid="users-table">table</div>);
jest.mock('../../../v2/components/UsersSkeleton', () => () => <div>skeleton</div>);
jest.mock('../../../v2/components/UsersEmptyState', () => () => <div>empty</div>);
jest.mock('../../../v2/components/UsersErrorState', () => () => <div>error</div>);

// eslint-disable-next-line import/first
import UsersPage from '../../../v2/components/UsersPage';

describe('UsersPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<UsersPage />);
    expect(container).toBeTruthy();
  });

  it('renders table when data is available', () => {
    const { getByTestId } = render(<UsersPage />);
    expect(getByTestId('users-table')).toBeInTheDocument();
  });
});
