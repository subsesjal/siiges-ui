import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import UsersActionIcons from '../../../v2/components/UsersActionIcons';

describe('UsersActionIcons', () => {
  it('always shows consult action', () => {
    render(
      <UsersActionIcons
        onView={jest.fn()}
        onEdit={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('consultar')).toBeInTheDocument();
    expect(screen.queryByLabelText('editar')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('eliminar')).not.toBeInTheDocument();
  });

  it('shows edit and delete when permissions are enabled', () => {
    const onView = jest.fn();
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    render(
      <UsersActionIcons
        canEdit
        canDelete
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByLabelText('consultar'));
    fireEvent.click(screen.getByLabelText('editar'));
    fireEvent.click(screen.getByLabelText('eliminar'));

    expect(onView).toHaveBeenCalled();
    expect(onEdit).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
  });

  it('uses default onDelete callback without crashing', () => {
    render(
      <UsersActionIcons
        canDelete
        onView={jest.fn()}
        onEdit={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByLabelText('eliminar'));
    expect(screen.getByLabelText('eliminar')).toBeInTheDocument();
  });
});
