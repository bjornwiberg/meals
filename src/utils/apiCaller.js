export const get = async (url, ...options) => {
  return fetch(url, { ...options });
};
