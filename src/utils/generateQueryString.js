const generateQueryString = (query) => {
  const queryString = Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
  return queryString;
};

module.exports = generateQueryString;
