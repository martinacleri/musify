import React from 'react';
import {useNavigate} from 'react-router-dom';
import {getFavoriteArtists} from '../services/favoriteArtists';
import '../stylesheets/FavArtistList.css'

const FavArtistList = () => {
  const navigate = useNavigate();
  const favoriteArtists = getFavoriteArtists() || [];

  const handleArtistClick = (id) => {
    if (id) {
      navigate(`/artist/${id}`);
    }
  };

  return (
    <div className='favartist-container'>
      {favoriteArtists.length > 0 ? (
        favoriteArtists
          .filter(artist => artist.id && artist.name)
          .map((artist) => (
            <div
              className='favartist-artist-card'
              key={artist.id}
              onClick={() => handleArtistClick(artist.id)}
            >
              {artist.images && artist.images.length > 0 ? (
                <img className='favartist-artist-image' src={artist.images[0].url} alt={artist.name} />
              ) : (
                <div className='favartist-no-artist-image'></div>
              )}
              <span className='favartist-artist-name'>{artist.name}</span>
            </div>
          ))
      ) : (
        <p className='favartist-no-favorites'>Aún no tienes artistas favoritos.</p>
      )}
    </div>
  );
};

export default FavArtistList;