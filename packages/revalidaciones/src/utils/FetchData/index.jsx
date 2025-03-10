const fetchData = async (url, setState, mapper = null, filterFirst = false) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  try {
    const response = await fetch(url, {
      headers: {
        api_key: apiKey,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    let transformedData = data.data;

    if (filterFirst) {
      transformedData = transformedData.slice(1);
    }

    if (mapper) {
      transformedData = transformedData.map(mapper);
    }

    setState(transformedData);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
};

export default fetchData;
