const fetchData = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

export default fetchData;
