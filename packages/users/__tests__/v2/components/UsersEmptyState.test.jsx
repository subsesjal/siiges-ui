import React from 'react';
import PropTypes from 'prop-types';
import { fireEvent, render, screen } from '@testing-library/react';

function MockButton({ text, onClick }) {
  return <button type="button" onClick={onClick}>{text}</button>;
}

MockButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

jest.mock('@siiges-ui/shared', () => ({
  Button: MockButton,
}));

// eslint-disable-next-line import/first
import UsersEmptyState from '../../../v2/components/UsersEmptyState';

describe('UsersEmptyState', () => {
  it('renders empty message', () => {
    render(<UsersEmptyState />);

    expect(screen.getByText('No hay usuarios registrados')).toBeInTheDocument();
    expect(screen.queryByText('Agregar usuario')).not.toBeInTheDocument();
  });

  it('shows add button and triggers callback when canCreate is true', () => {
    const onCreate = jest.fn();

    render(<UsersEmptyState canCreate onCreate={onCreate} />);

    fireEvent.click(screen.getByText('Agregar usuario'));

    expect(onCreate).toHaveBeenCalled();
  });

  it('uses default onCreate callback without crashing', () => {
    render(<UsersEmptyState canCreate />);

    fireEvent.click(screen.getByText('Agregar usuario'));

    expect(screen.getByText('Agregar usuario')).toBeInTheDocument();
  });
});
