import { Context } from '@siiges-ui/shared';
import { useContext } from 'react';

export default function deletePlantel(institucion, id, handleDeleteClick) {
  const { session } = useContext(Context);
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  fetch(
    `http://localhost:3000/api/v1/instituciones/${institucion}/planteles/${id}`,
    {
      method: 'DELETE',
      headers: { api_key: apikey, Authorization: `Bearer ${session.token}` },
    },
  ).then(handleDeleteClick(id));
}
