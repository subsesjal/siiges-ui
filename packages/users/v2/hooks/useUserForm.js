import { useEffect, useMemo, useState } from 'react';
import VIEW_STATE from '../constants/viewState';
import { buildEmptyUserForm, mapUserToForm, normalizeUpdatePayload } from '../utils/userForm';
import { getFieldErrors, validateUserForm } from '../utils/userValidation';

const PERSONA_FIELDS = [
  'nombre',
  'apellidoPaterno',
  'apellidoMaterno',
  'sexo',
  'nacionalidad',
  'rfc',
  'curp',
  'celular',
  'telefono',
  'tituloCargo',
];

const buildPayload = (form, mode) => {
  if (mode === VIEW_STATE.CREATE) {
    return {
      actualizado: 1,
      persona: {
        nombre: form.persona?.nombre?.trim() || '',
        apellidoPaterno: form.persona?.apellidoPaterno?.trim() || '',
        apellidoMaterno: form.persona?.apellidoMaterno?.trim() || '',
        tituloCargo: form.persona?.tituloCargo?.trim() || '',
      },
      rolId: (form.rolId || '').trim(),
      correo: (form.correo || '').trim(),
      usuario: (form.usuario || '').trim(),
      contrasena: form.contrasena || '',
      repeatContrasena: form.repeatContrasena || '',
      ...(form.estatus !== undefined ? { estatus: Number(form.estatus) } : {}),
    };
  }

  return normalizeUpdatePayload({
    ...form,
    correo: (form.correo || '').trim(),
    persona: {
      nombre: form.persona?.nombre?.trim() || '',
      apellidoPaterno: form.persona?.apellidoPaterno?.trim() || '',
      apellidoMaterno: form.persona?.apellidoMaterno?.trim() || '',
      sexo: form.persona?.sexo?.trim() || '',
      nacionalidad: form.persona?.nacionalidad?.trim() || '',
      rfc: form.persona?.rfc?.trim() || '',
      curp: form.persona?.curp?.trim() || '',
      celular: form.persona?.celular?.trim() || '',
      telefono: form.persona?.telefono?.trim() || '',
      tituloCargo: form.persona?.tituloCargo?.trim() || '',
    },
  });
};

const useUserForm = ({ mode, initialUser, sessionRole }) => {
  const isCreate = mode === VIEW_STATE.CREATE;
  const initialUserSignature = useMemo(() => JSON.stringify({
    id: initialUser?.id ?? null,
    actualizado: initialUser?.actualizado ?? null,
    correo: initialUser?.correo ?? '',
    usuario: initialUser?.usuario ?? '',
    estatus: initialUser?.estatus ?? null,
    rolId: initialUser?.rol?.id ?? initialUser?.rolId ?? null,
    persona: {
      nombre: initialUser?.persona?.nombre ?? '',
      apellidoPaterno: initialUser?.persona?.apellidoPaterno ?? '',
      apellidoMaterno: initialUser?.persona?.apellidoMaterno ?? '',
      sexo: initialUser?.persona?.sexo ?? '',
      nacionalidad: initialUser?.persona?.nacionalidad ?? '',
      rfc: initialUser?.persona?.rfc ?? '',
      curp: initialUser?.persona?.curp ?? '',
      celular: initialUser?.persona?.celular ?? '',
      telefono: initialUser?.persona?.telefono ?? '',
      tituloCargo: initialUser?.persona?.tituloCargo ?? '',
    },
  }), [initialUser]);
  const [form, setForm] = useState(() => (isCreate
    ? buildEmptyUserForm(sessionRole)
    : mapUserToForm(initialUser, sessionRole)));
  const [errors, setErrors] = useState({});
  const initialRoleId = useMemo(
    () => mapUserToForm(initialUser, sessionRole).rolId,
    [initialUserSignature, sessionRole],
  );

  useEffect(() => {
    if (isCreate) {
      setForm(buildEmptyUserForm(sessionRole));
    } else {
      setForm(mapUserToForm(initialUser, sessionRole));
    }
    setErrors({});
  }, [initialUserSignature, isCreate, sessionRole]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      ...(PERSONA_FIELDS.includes(name)
        ? { persona: { ...prevForm.persona, [name]: value } }
        : { [name]: value }),
    }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const fieldErrors = getFieldErrors(form, mode);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name] || '',
    }));
  };

  const validate = () => {
    const payload = buildPayload(form, mode);
    const result = validateUserForm({ form, mode, payload });
    setErrors(result.errors || {});
    return result;
  };

  return {
    form,
    errors,
    handleChange,
    handleBlur,
    validate,
    initialRoleId,
  };
};

export default useUserForm;
