export const sortByObjectProperty = (property) => (a, b) =>
  a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0;
