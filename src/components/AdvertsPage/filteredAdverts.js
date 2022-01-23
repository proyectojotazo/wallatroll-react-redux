const filteredByName =
  (filter) =>
  ({ name }) => {
    // Propiedad del anuncio `ad.name`
    return new RegExp(`^${filter}`, "i").test(name);
  };

const filteredByPrice =
  (filter) =>
  ({ price }) => {
    // Propiedad del anuncio `ad.price`
    return price >= filter[0] && price <= filter[1];
  };

const filteredByTags =
  (filter) =>
  ({ tags }) => {
    // Propiedad del anuncio `ad.tags`
    return filter.every((tag) => tags.includes(tag));
  };

const filterBySale =
  (filter) =>
  ({ sale }) => {
    return filter === "all" ? true : filter === sale.toString();
  };

export const filteredAdverts = (adverts, { name, price, tags, sale }) => {
  return (
    adverts
      .filter(filteredByName(name))
      // .filter((ad) => filteredByName(name)(ad))
      .filter(filteredByPrice(price))
      .filter(filteredByTags(tags))
      .filter(filterBySale(sale))
    // .filter((ad) => ad.sale.toString() === sale)
  );
};
