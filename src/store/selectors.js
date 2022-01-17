export const getUi = (state) => state.ui;
export const getIsLoading = state => state.ui.isLoading
export const getIsLogged = (state) => state.auth;

export const getAdverts = (state) => state.adverts.data;
export const getAdvert = (state) => state.adverts.advertLoaded;
export const getAdvertById = (state, id) =>
  state.adverts.data.find((ad) => ad.id === id);
export const getIsDeleting = (state) => state.adverts.isDeleting;
export const getNeedsUpdate = (state) => state.adverts.needsUpdate;
