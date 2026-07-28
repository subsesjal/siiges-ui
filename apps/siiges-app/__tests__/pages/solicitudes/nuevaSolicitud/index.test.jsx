import React from 'react';
import PropTypes from 'prop-types';
import { render, waitFor } from '@testing-library/react';

const mockPush = jest.fn();
const mockSetNoti = jest.fn();
const mockUseAuth = jest.fn();

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

function MockLayout({ children }) {
  return <div data-testid="layout">{children}</div>;
}

MockLayout.propTypes = {
  children: PropTypes.node,
};

MockLayout.defaultProps = {
  children: null,
};

jest.mock('@siiges-ui/shared', () => ({
  Layout: MockLayout,
  useAuth: () => mockUseAuth(),
  useUI: () => ({ setNoti: mockSetNoti }),
}));

jest.mock('@siiges-ui/solicitudes', () => ({
  NuevaSolicitud: () => <div data-testid="nueva-solicitud">NuevaSolicitud</div>,
}));

// eslint-disable-next-line global-require
const NewRequest = require('../../../../pages/solicitudes/nuevaSolicitud/index').default;

describe('Nueva Solicitud page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects when user is not representative', async () => {
    mockUseAuth.mockReturnValue({
      session: { rol: 'admin', estatus: true },
    });

    render(<NewRequest />);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/solicitudes'));
    expect(mockSetNoti).toHaveBeenCalled();
  });

  it('redirects when representative is inactive', async () => {
    mockUseAuth.mockReturnValue({
      session: { rol: 'representante', estatus: false },
    });

    render(<NewRequest />);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/solicitudes'));
  });

  it('renders normally for active representative', () => {
    mockUseAuth.mockReturnValue({
      session: { rol: 'representante', estatus: true },
    });

    const { getByTestId } = render(<NewRequest />);

    expect(getByTestId('layout')).toBeTruthy();
    expect(getByTestId('nueva-solicitud')).toBeTruthy();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
