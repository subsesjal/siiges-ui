import submitNewSolicitud from '../../src/components/utils/submitNewSolicitud';

jest.mock('@siiges-ui/shared', () => ({
  getToken: jest.fn(() => 'mock-jwt'),
}));

describe('submitNewSolicitud', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    jest.spyOn(global, 'setTimeout').mockImplementation((callback) => {
      callback();
      return 0;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const setup = (form1) => {
    const setNoti = jest.fn();
    const setId = jest.fn();
    const setProgramaId = jest.fn();
    const setNewSubmit = jest.fn();
    const setLoading = jest.fn();
    const setSections = jest.fn();
    const router = { push: jest.fn() };

    const validations = {
      form: { 1: form1 },
      setNoti,
      setId,
      setProgramaId,
    };

    return {
      validations,
      setNoti,
      setId,
      setProgramaId,
      setNewSubmit,
      setLoading,
      setSections,
      router,
    };
  };

  it('does not call fetch when payload is missing required fields', () => {
    const {
      validations, setNewSubmit, setLoading, setSections, router, setNoti,
    } = setup({});

    submitNewSolicitud(validations, setNewSubmit, setLoading, setSections, router);

    expect(global.fetch).not.toHaveBeenCalled();
    expect(setNoti).toHaveBeenCalledWith(expect.objectContaining({ type: 'error' }));
  });

  it('does not call fetch when programaTurnos is missing', () => {
    const {
      validations, setNewSubmit, setLoading, setSections, router, setNoti,
    } = setup({
      tipoSolicitudId: 1,
      usuarioId: 10,
      estatusSolicitudId: 1,
      programa: {
        nivelId: 2,
        cicloId: 1,
        modalidadId: 1,
        plantelId: 123,
      },
    });

    submitNewSolicitud(validations, setNewSubmit, setLoading, setSections, router);

    expect(global.fetch).not.toHaveBeenCalled();
    expect(setNoti).toHaveBeenCalledWith(expect.objectContaining({ type: 'error' }));
  });

  it('creates solicitud and first section when payload is valid', async () => {
    const {
      validations,
      setNewSubmit,
      setLoading,
      setSections,
      router,
      setId,
      setProgramaId,
    } = setup({
      tipoSolicitudId: 1,
      usuarioId: 10,
      estatusSolicitudId: 1,
      programa: {
        nivelId: 2,
        cicloId: 1,
        modalidadId: 1,
        plantelId: 123,
        programaTurnos: [1],
      },
    });

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { id: 3000, programa: { id: 4000 } } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: {} }),
      });

    submitNewSolicitud(validations, setNewSubmit, setLoading, setSections, router);

    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(setId).toHaveBeenCalledWith(3000);
    expect(setProgramaId).toHaveBeenCalledWith(4000);
  });
});
