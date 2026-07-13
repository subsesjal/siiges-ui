import React from 'react';
import PropTypes from 'prop-types';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

const mockPush = jest.fn();
const mockBack = jest.fn();
const mockNotifyError = jest.fn();
const mockNotifySuccess = jest.fn();

function mockLayout({ children, title }) {
  return <div data-testid="layout" aria-label={title}>{children}</div>;
}

mockLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

mockLayout.defaultProps = {
  title: '',
};

function mockLoading() {
  return <div>loading</div>;
}

function mockForm({ onSubmit, onCancel }) {
  return (
    <div data-testid="edit-form">
      <button type="button" onClick={onSubmit}>Submit</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </div>
  );
}

mockForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

function mockButtonSimple({ text, onClick }) {
  return <button type="button" onClick={onClick}>{text}</button>;
}

mockButtonSimple.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ push: mockPush, back: mockBack })),
}));

jest.mock('@siiges-ui/shared', () => ({
  useAuth: jest.fn(() => ({ session: { id: 1, token: 'abc', rol: 'admin' } })),
  useNotification: jest.fn(() => ({ error: mockNotifyError, success: mockNotifySuccess })),
  Layout: mockLayout,
  Loading: mockLoading,
  ButtonSimple: mockButtonSimple,
}));

jest.mock('../../../v2/hooks/useUserDetail', () => jest.fn());

jest.mock('../../../v2/hooks/useUserForm', () => jest.fn());

jest.mock('../../../v2/components/UserProfileEditForm', () => mockForm);

jest.mock('../../../v2/components/UserProfileSkeleton', () => function () {
  return <div>skeleton</div>;
});

jest.mock('../../../v2/services/usuarios.service', () => ({
  updateUser: jest.fn().mockResolvedValue({}),
}));

const mockUseUserDetail = jest.requireMock('../../../v2/hooks/useUserDetail');
const mockUseUserForm = jest.requireMock('../../../v2/hooks/useUserForm');
const mockUpdateUser = jest.requireMock('../../../v2/services/usuarios.service').updateUser;
const mockUseAuth = jest.requireMock('@siiges-ui/shared').useAuth;

// eslint-disable-next-line import/first
import UserProfileEditPage from '../../../v2/components/UserProfileEditPage';

describe('UserProfileEditPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUserDetail.mockReturnValue({
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
    });
    mockUseUserForm.mockReturnValue({
      form: { correo: 'user@test.com' },
      errors: {},
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      validate: jest.fn(() => ({
        valid: true,
        cleanedData: { correo: 'updated@test.com', rolId: 2 },
        errors: {},
      })),
    });
  });

  it('renders without crashing', () => {
    const { container } = render(<UserProfileEditPage />);
    expect(container).toBeTruthy();
  });

  it('renders the edit form when data is loaded', () => {
    render(<UserProfileEditPage />);

    expect(screen.getByTestId('edit-form')).toBeInTheDocument();
  });

  it('renders the skeleton while loading', () => {
    mockUseUserDetail.mockReturnValueOnce({ data: null, loading: true, error: null });

    render(<UserProfileEditPage />);

    expect(screen.getByText('skeleton')).toBeInTheDocument();
  });

  it('notifies and renders the error state when profile loading fails', () => {
    mockUseUserDetail.mockReturnValueOnce({
      data: null,
      loading: false,
      error: { message: 'Boom' },
    });

    render(<UserProfileEditPage />);

    expect(mockNotifyError).toHaveBeenCalledWith('Boom');
    expect(screen.getByText('No se pudo cargar el perfil.')).toBeInTheDocument();
  });

  it('uses fallback message and back navigation in profile load error state', () => {
    mockUseUserDetail.mockReturnValueOnce({
      data: null,
      loading: false,
      error: {},
    });

    render(<UserProfileEditPage />);

    expect(mockNotifyError).toHaveBeenCalledWith('No fue posible cargar el perfil.');
    expect(screen.getByText('Error desconocido')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Regresar'));
    expect(mockBack).toHaveBeenCalled();
  });

  it('submits the profile update and redirects on success', async () => {
    render(<UserProfileEditPage />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        session: { id: 1, token: 'abc', rol: 'admin' },
        usuarioId: 1,
        data: { correo: 'updated@test.com' },
      });
    });

    await waitFor(() => {
      expect(mockNotifySuccess).toHaveBeenCalledWith('Perfil actualizado correctamente.');
    });
    expect(mockPush).toHaveBeenCalledWith('/usuarios/perfilUsuario');
  });

  it('does not submit when profile has no changes', async () => {
    mockUseUserForm.mockReturnValueOnce({
      form: { correo: 'user@test.com' },
      errors: {},
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      validate: jest.fn(() => ({
        valid: true,
        cleanedData: {
          actualizado: 1,
          correo: 'user@test.com',
          rolId: 2,
          estatus: 1,
          persona: {
            nombre: 'Juan',
            apellidoPaterno: 'Perez',
            apellidoMaterno: 'G',
            sexo: '',
            nacionalidad: '',
            rfc: '',
            curp: '',
            celular: '',
            telefono: '',
            tituloCargo: '',
          },
        },
        errors: {},
      })),
    });

    render(<UserProfileEditPage />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockUpdateUser).not.toHaveBeenCalled();
    });
    expect(mockNotifySuccess).toHaveBeenCalledWith('No hay cambios para guardar.');
    expect(mockPush).toHaveBeenCalledWith('/usuarios/perfilUsuario');
  });

  it('shows validation error and does not call update when form is invalid', async () => {
    mockUseUserForm.mockReturnValueOnce({
      form: { correo: '' },
      errors: {},
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      validate: jest.fn(() => ({
        valid: false,
        cleanedData: {},
        errors: { correo: 'Correo requerido' },
      })),
    });

    render(<UserProfileEditPage />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockUpdateUser).not.toHaveBeenCalled();
    });
    expect(mockNotifyError).toHaveBeenCalledWith('Correo requerido');
  });

  it('shows fallback validation message when no field error is available', async () => {
    mockUseUserForm.mockReturnValueOnce({
      form: { correo: '' },
      errors: {},
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      validate: jest.fn(() => ({
        valid: false,
        cleanedData: {},
        errors: null,
      })),
    });

    render(<UserProfileEditPage />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockNotifyError).toHaveBeenCalledWith('Revisa los campos obligatorios antes de continuar.');
    });
    expect(mockUpdateUser).not.toHaveBeenCalled();
  });

  it('supports missing session role when building payload diff', async () => {
    mockUseAuth.mockReturnValueOnce({ session: { id: 1, token: 'abc' } });

    render(<UserProfileEditPage />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        session: { id: 1, token: 'abc' },
        usuarioId: 1,
        data: { correo: 'updated@test.com' },
      });
    });
  });

  it('shows error notification when update fails', async () => {
    mockUpdateUser.mockRejectedValueOnce(new Error('Fallo update'));

    render(<UserProfileEditPage />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockNotifyError).toHaveBeenCalledWith('Fallo update');
    });
  });

  it('does not submit while detail state is loading', async () => {
    mockUseUserDetail.mockReturnValueOnce({
      data: {
        id: 1,
        correo: 'user@test.com',
        usuario: 'testuser',
        estatus: 1,
        rol: { id: 2, descripcion: 'Admin' },
        persona: { nombre: 'Juan', apellidoPaterno: 'Perez', apellidoMaterno: 'G' },
      },
      loading: true,
      error: null,
    });

    render(<UserProfileEditPage />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockUpdateUser).not.toHaveBeenCalled();
    });
  });

  it('navigates back when cancel is clicked', () => {
    render(<UserProfileEditPage />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockPush).toHaveBeenCalledWith('/usuarios/perfilUsuario');
  });

  it('returns null when profile data is not available yet', () => {
    mockUseUserDetail.mockReturnValueOnce({ data: null, loading: false, error: null });

    const { container } = render(<UserProfileEditPage />);

    expect(container.firstChild).toBeNull();
  });
});
