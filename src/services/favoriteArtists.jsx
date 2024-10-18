export const addFavoriteArtist = (artist) => {
  if (artist && artist.id && artist.name) {
    const favorites = JSON.parse(localStorage.getItem('favoriteArtists')) || [];
    if (!favorites.some(fav => fav.id === artist.id)) {
      favorites.push(artist);
      localStorage.setItem('favoriteArtists', JSON.stringify(favorites));
    }
  }
};

export const removeFavoriteArtist = (artistId) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteArtists')) || [];
  const updatedFavorites = favorites.filter(fav => fav.id !== artistId);
  localStorage.setItem('favoriteArtists', JSON.stringify(updatedFavorites));
};

export const getFavoriteArtists = () => {
  return JSON.parse(localStorage.getItem('favoriteArtists')) || [];
};

export const isArtistFavorited = (artistId) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteArtists')) || [];
  return favorites.some(fav => fav.id === artistId);
};