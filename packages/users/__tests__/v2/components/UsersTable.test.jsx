import React from 'react';
import { render } from '@testing-library/react';

let mockDataTableProps;
let mockActionProps;

jest.mock('@siiges-ui/shared', () => ({
  DataTable: (props) => {
    mockDataTableProps = props;
    return <div data-testid="data-table" />;
  },
}));

jest.mock('../../../v2/utils/userRows', () => jest.fn(() => ([{
  id: 10,
  raw: { id: 10, usuario: 'user10' },
  nombre: 'Nombre',
  usuario: 'user10',
  correo: 'user@test.com',
  rol: 'Admin',
  estatus: 'Activado',
  fecha: '2026-01-01',
}])));

jest.mock('../../../v2/components/UsersActionIcons', () => function MockUsersActionIcons(props) {
  mockActionProps = props;
  return <div data-testid="actions" />;
});

// eslint-disable-next-line import/first
import UsersTable from '../../../v2/components/UsersTable';

describe('UsersTable', () => {
  beforeEach(() => {
    mockDataTableProps = null;
    mockActionProps = null;
  });

  it('passes expected table props and renders actions with callbacks', () => {
    const onView = jest.fn();
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    render(
      <UsersTable
        data={[{ id: 10 }]}
        loading={false}
        canEdit
        canDelete
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        canCreate
        onCreate={jest.fn()}
        onReload={jest.fn()}
      />,
    );

    expect(mockDataTableProps.buttonText).toBe('Agregar usuario');
    expect(mockDataTableProps.buttonAdd).toBe(true);

    const actionsColumn = mockDataTableProps.columns.find((col) => col.field === 'actions');
    render(actionsColumn.renderCell({ row: { raw: { id: 10, usuario: 'user10' } } }));

    expect(mockActionProps.canEdit).toBe(true);
    expect(mockActionProps.canDelete).toBe(true);

    mockActionProps.onView();
    mockActionProps.onEdit();
    mockActionProps.onDelete();

    expect(onView).toHaveBeenCalledWith({ id: 10, usuario: 'user10' });
    expect(onEdit).toHaveBeenCalledWith({ id: 10, usuario: 'user10' });
    expect(onDelete).toHaveBeenCalledWith({ id: 10, usuario: 'user10' });
  });

  it('uses default callbacks without crashing', () => {
    render(
      <UsersTable
        data={[{ id: 10 }]}
        loading={false}
        canEdit={false}
        canDelete
        onView={jest.fn()}
        onEdit={jest.fn()}
      />,
    );

    const actionsColumn = mockDataTableProps.columns.find((col) => col.field === 'actions');
    render(actionsColumn.renderCell({ row: { raw: { id: 10, usuario: 'user10' } } }));

    expect(() => {
      mockDataTableProps.buttonClick();
      mockDataTableProps.onReloadClick();
      mockActionProps.onDelete();
    }).not.toThrow();
  });
});
