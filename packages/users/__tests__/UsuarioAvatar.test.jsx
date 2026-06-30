import React from 'react';
import PropTypes from 'prop-types';
import { fireEvent, render, screen } from '@testing-library/react';

const mockUseUser = jest.fn();
const mockSubmitDocument = jest.fn().mockResolvedValue({});
const mockRefreshAvatar = jest.fn();

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
  useUser: mockUseUser,
  Layout: MockLayout,
  Loading: () => <div>loading</div>,
  ButtonSimple: MockButtonSimple,
  SubmitDocument: mockSubmitDocument,
  DefaultModal: MockDefaultModal,
}));

jest.mock('@mui/icons-material/PhotoCamera', () => function MockIcon() { return <span>cam</span>; });

// eslint-disable-next-line global-require, import/no-unresolved, import/extensions
const UsuarioAvatar = require('../src/components/Usuarios/UsuarioAvatar/index.jsx').default;

const mockUser = {
  persona: { nombre: 'Juan', apellidoPaterno: 'Perez', apellidoMaterno: 'Lopez' },
  rol: { descripcion: 'Administrador' },
};

beforeEach(() => {
  mockUseUser.mockReturnValue({ avatarUrl: null, refreshAvatar: mockRefreshAvatar });
  mockSubmitDocument.mockClear();
  mockRefreshAvatar.mockClear();
});

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

  it('renders remote avatar when avatarUrl exists', () => {
    mockUseUser.mockReturnValueOnce({
      avatarUrl: 'https://example.com/avatar.png',
      refreshAvatar: mockRefreshAvatar,
    });

    render(<UsuarioAvatar usuario={mockUser} />);

    expect(screen.getByAltText('avatar')).toHaveAttribute('src', 'https://example.com/avatar.png');
  });

  it('opens the file input and uploads a selected image', () => {
    const fileClickSpy = jest.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {});
    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

    render(<UsuarioAvatar usuario={mockUser} />);

    fireEvent.click(screen.getByRole('button', { name: /agregar imagen/i }));
    expect(fileClickSpy).toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/agregar imagen/i).parentElement.querySelector('input[type="file"]'), {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByText('Confirmar'));

    expect(mockSubmitDocument).toHaveBeenCalled();
    expect(mockRefreshAvatar).not.toHaveBeenCalled();
    fileClickSpy.mockRestore();
  });
});
