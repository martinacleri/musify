const FAVORITE_SONGS_KEY = 'favoriteSongs';

export const getFavoriteSongs = () => {
  const favoriteSongs = localStorage.getItem(FAVORITE_SONGS_KEY);
  return favoriteSongs ? JSON.parse(favoriteSongs) : [];
};

export const addFavoriteSong = (song) => {
  const favoriteSongs = getFavoriteSongs();
  localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([...favoriteSongs, song]));
};

export const removeFavoriteSong = (trackId) => {
  const favoriteSongs = getFavoriteSongs();
  const updatedSongs = favoriteSongs.filter(song => song.trackId !== trackId);
  localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify(updatedSongs));
};

export const isSongFavorited = (trackId) => {
  const favoriteSongs = getFavoriteSongs();
  return favoriteSongs.some(song => song.trackId === trackId);
};