import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../stylesheets/FavoriteSongs.css'

const FavoriteSongs = () => {
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteTracks')) || [];
    setFavoriteTracks(savedFavorites);
  }, []);

  const goBackToSearch = () => {
    navigate('/');
  };

  const goToAlbumDetail = (albumId) => {
    navigate(`/album/${albumId}`);
  };

  const removeFavorite = (trackId) => {
    const updatedFavorites = favoriteTracks.filter((track) => track.id !== trackId);
    setFavoriteTracks(updatedFavorites);
    localStorage.setItem('favoriteTracks', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorite-songs-container">
    <button className="fs-back-button" onClick={goBackToSearch}>Volver a la búsqueda</button>
    <div>
      <h2 className="fs-favorite-songs-title">Tus Canciones Favoritas</h2>
      {favoriteTracks.length > 0 ? (
        <div className="fs-favorite-songs-list">
          {favoriteTracks.map((track) => (
            <div className="fs-favorite-song-item">
              <div className='fs-song-details'>
                <span className="fs-favorite-song-info">
                  <strong 
                    key={track.id}
                    className="fs-favorite-song-name"
                    onClick={() => goToAlbumDetail(track.album.id)}>{track.name}</strong> - {track.artistName}
                </span>
                <span className="fs-favorite-song-albname">{track.albumName}</span>
              </div>
            <div className="fs-favorite-song-actions">
              <button className="fs-favorite-song-btn-remove" onClick={() => removeFavorite(track.id)}>♥</button>
            </div>
          </div>          
          ))}
        </div>
      ) : (<p className="fs-no-favorites-message">Aún no tienes canciones favoritas.</p>
      )}
    </div>
    </div>
  );
};

export default FavoriteSongs;