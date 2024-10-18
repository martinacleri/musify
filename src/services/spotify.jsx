const clientId = localStorage.getItem('spotifyClientId');
const clientSecret = localStorage.getItem('spotifyClientSecret');

export const getToken = async () => {
  if (!clientId || !clientSecret) {
    throw new Error('CLIENT_ID o CLIENT_SECRET no están definidos');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
};

export const searchArtists = async (query) => {
  const token = await getToken();
  const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.artists.items;
};

export const getArtistById = async (artistId) => {
  const token = await getToken();
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getArtistAlbums = async (artistId) => {
  const token = await getToken();
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.items;
};

export const getAlbumDetails = async (albumId) => {
  const token = await getToken();
  const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};