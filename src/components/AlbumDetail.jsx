import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {getAlbumDetails} from '../services/spotify';
import '../stylesheets/AlbumDetail.css'

const AlbumDetail = ({album}) => {
  const {albumId} = useParams();
  const [albumData, setAlbumData] = useState(album || null);
  const [tracks, setTracks] = useState([]);
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbumData = async () => {
      if (!album && albumId) {
        try {
          const albumDetails = await getAlbumDetails(albumId);
          setAlbumData(albumDetails);
          setTracks(albumDetails.tracks.items);
        } catch (error) {
          console.error('Error al cargar detalles del álbum: ', error);
        }
      }
    };
    fetchAlbumData();
  }, [album, albumId]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteTracks')) || [];
    setFavoriteTracks(savedFavorites);
  }, []);

  const isFavorite = (trackId) => {
    return favoriteTracks.some((track) => track.id === trackId);
  };

  const toggleFavorite = (track) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteTracks')) || [];
    let updatedFavorites;

    if (isFavorite(track.id)) {
      updatedFavorites = savedFavorites.filter((favTrack) => favTrack.id !== track.id);
    } else {
      const trackInfo = {
        id: track.id,
        name: track.name,
        artistName: albumData.artists[0].name,
        albumName: albumData.name,
        album: albumData,
      };
      updatedFavorites = [...savedFavorites, trackInfo];
    }

    setFavoriteTracks(updatedFavorites);
    localStorage.setItem('favoriteTracks', JSON.stringify(updatedFavorites));
  };

  if (!albumData) {
    return <p>Cargando detalles del álbum...</p>;
  }

  const goBackToArtistDetail = () => {
    if (albumData.artists && albumData.artists.length > 0) {
      const artistId = albumData.artists[0].id;
      navigate(`/artist/${artistId}`);
    }
  };

  return (
    <div className="album-detail-container">
      {albumId && (
        <button className="albdet-back-button" onClick={goBackToArtistDetail}>Volver al artista</button>
      )}
      <div className="albdet-album-header">
        {albumData.images.length > 0 ? (
          <img className="albdet-album-image" src={albumData.images[0].url} alt={albumData.name}/>) : (
          <div className='albdet-no-album-image'></div>
        )}
        <div className="albdet-album-info">
          <h3 className="albdet-album-name">{albumData.name}</h3>
          <p className='albdet-artist-name'>{albumData.artists[0].name}</p>
          <p className="albdet-album-release-date">Fecha de lanzamiento: {albumData.release_date}</p>
        </div>
      </div>
      {tracks.length > 0 && (
        <div className="albdet-track-list">
          <h4 className='albdet-songs-title'>Canciones</h4>
          <div>
            {tracks.map((track) => (
              <div className="albdet-track-item" key={track.id}>
                <span className="albdet-track-name">{track.track_number}. {track.name}</span>
                <button className={`albdet-favorite-button ${isFavorite(track.id) ? 'albdet-remove' : ''}`} onClick={() => toggleFavorite(track)}>
                  {isFavorite(track.id) ? '♥' : '♡'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumDetail;