export const fetchCountries = name => {
  const searchParams = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
  });

  return fetch(`https://restcountries.com/v2/name/${name}?${searchParams}`).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.status);
    }
    return responce.json();
  });
};
