import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {getArtistById, getArtistAlbums} from '../services/spotify';
import {addFavoriteArtist, removeFavoriteArtist, isArtistFavorited} from '../services/favoriteArtists';
import '../stylesheets/ArtistDetail.css';

const ArtistDetail = () => {
  const {id} = useParams();
  const [albums, setAlbums] = useState([]);
  const [artist, setArtist] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtistDetails = async () => {
      const artistDetails = await getArtistById(id);
      setArtist(artistDetails);

      const artistAlbums = await getArtistAlbums(id);
      setAlbums(artistAlbums);

      setIsFavorited(isArtistFavorited(id));
    };

    fetchArtistDetails();
  }, [id]);

  const goBackToSearch = () => {
    navigate('/');
  };

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      removeFavoriteArtist(id);
      setIsFavorited(false);
    } else {
      addFavoriteArtist(artist);
      setIsFavorited(true);
    }
  };

  return (
    <div className="artist-detail-container">
      <div>
        <button className="artdet-back-button" onClick={goBackToSearch}>Volver a la búsqueda</button>
      </div>
      <div className='artdet-artist-header'>
      {artist && (
        <div>
          {artist.images.length > 0 ? (
            <img className="artdet-artist-image" src={artist.images[0].url} alt={artist.name}/>) : (<div className="artdet-no-artist-image" ></div>)}
          <h1 className="artdet-artist-name">{artist.name}</h1>
        </div>
      )}
      <div>
        <button className={isFavorited ? 'artdet-remove-favorite-button' : 'artdet-favorite-button'} onClick={handleFavoriteToggle}>
          {isFavorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
      </div>
      </div>
      <h2 className="artdet-albums-title">Álbumes del Artista</h2>
      <div className="artdet-albums-section">
        {albums.map((album) => (
          <div key={album.id} className="artdet-album-item" onClick={() => navigate(`/album/${album.id}`)}>
            <img className="artdet-album-image" src={album.images[0]?.url} alt={album.name} />
            <div className="artdet-album-info">
              <p className="artdet-album-name">{album.name}</p>
              <p className="artdet-album-year">{new Date(album.release_date).getFullYear()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistDetail;