import { getToken } from '@siiges-ui/shared';

/**
 * Fetches the list of grades (grados) for a specific program by its ID.
 *
 * @param {string} id - The ID of the program to fetch grades for.
 * @returns {Promise<Array>} A promise that resolves to an array of grades.
 */
export default async function getGrados(id) {
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  const response = await fetch(
    `${url}/api/v1/grados/programas/${id}`,
    { headers: { api_key: apikey, Authorization: `Bearer ${token}` } },
  );

  const data = await response.json();
  return data.data || [];
}
