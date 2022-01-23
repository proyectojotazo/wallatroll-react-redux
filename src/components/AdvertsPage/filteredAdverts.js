export const filteredAdverts = (adverts, filters) => {
  const nameReg = new RegExp(`^${filters.name}`, "i");

  let filtered;

  if (filters.sale === "all") {
    filtered = adverts.filter(
      (ad) =>
        nameReg.test(ad.name) &&
        ad.price >= filters.price[0] &&
        ad.price <= filters.price[1] &&
        filters.tags.every((tag) => ad.tags.includes(tag))
    );

    return filtered
  }

  filtered = adverts.filter(
    (ad) =>
      nameReg.test(ad.name) &&
      ad.sale.toString() === filters.sale &&
      ad.price >= filters.price[0] &&
      ad.price <= filters.price[1] &&
      filters.tags.every((tag) => ad.tags.includes(tag))
  );

  return filtered
};
