import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
    isReady: true,
    query: {},
  })),
}));

function MockImage({ src, alt }) {
  return <img src={src} alt={alt} />;
}

MockImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

MockImage.defaultProps = {
  alt: '',
};

jest.mock('next/image', () => MockImage);

function MockLayout({ children }) {
  return <div>{children}</div>;
}

MockLayout.propTypes = {
  children: PropTypes.node,
};

MockLayout.defaultProps = {
  children: null,
};

function MockButtonSimple({ text, onClick }) {
  return <button type="button" onClick={onClick}>{text}</button>;
}

MockButtonSimple.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

MockButtonSimple.defaultProps = {
  text: '',
  onClick: () => {},
};

function MockDefaultModal({ children, open }) {
  return open ? <div>{children}</div> : null;
}

MockDefaultModal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
};

MockDefaultModal.defaultProps = {
  children: null,
  open: false,
};

jest.mock('@siiges-ui/shared', () => ({
  useAuth: jest.fn(() => ({ session: { id: 1, token: 'abc', rol: 'admin' } })),
  useNotification: jest.fn(() => ({ error: jest.fn(), success: jest.fn() })),
  useUser: jest.fn(() => ({ avatarUrl: null, refreshAvatar: jest.fn() })),
  Layout: MockLayout,
  Loading: () => <div>loading</div>,
  ButtonSimple: MockButtonSimple,
  SubmitDocument: jest.fn().mockResolvedValue({}),
  DefaultModal: MockDefaultModal,
}));

jest.mock('@mui/icons-material/PhotoCamera', () => function MockIcon() { return <span>cam</span>; });

// eslint-disable-next-line global-require, import/no-unresolved, import/extensions
const UsuarioAvatar = require('../../src/components/Usuarios/UsuarioAvatar/index.jsx').default;

const mockUser = {
  persona: { nombre: 'Juan', apellidoPaterno: 'Perez', apellidoMaterno: 'Lopez' },
  rol: { descripcion: 'Administrador' },
};

describe('UsuarioAvatar', () => {
  it('renders without crashing', () => {
    const { container } = render(<UsuarioAvatar usuario={mockUser} />);
    expect(container).toBeTruthy();
  });

  it('renders default avatar when no avatarUrl', () => {
    const { container } = render(<UsuarioAvatar usuario={mockUser} />);
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
  });

  it('renders user full name', () => {
    const { getByText } = render(<UsuarioAvatar usuario={mockUser} />);
    expect(getByText(/Juan/)).toBeInTheDocument();
  });

  it('renders camera icon button', () => {
    const { container } = render(<UsuarioAvatar usuario={mockUser} />);
    expect(container.querySelector('button')).toBeTruthy();
  });
});
