import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {searchArtists} from '../services/spotify';
import ArtistList from './ArtistList';
import FavArtistList from './FavArtistList';
import '../stylesheets/Search.css';

const Search = () => {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setArtists([]);
      return;
    }

    try {
      const artistResults = await searchArtists(query);
      setArtists(artistResults);
    } catch (error) {
      console.error("Error al buscar artistas: ", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('spotifyClientId');
    localStorage.removeItem('spotifyClientSecret');
    navigate('/login');
  };

  const goToFavorites = () => {
    navigate('/favorites');
  };

  return (
    <div className='search-container'>
      <div>
        <button className='logout-button' onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      <h1 className='app-title'>MUSIFY</h1>
      <div className='search-button-section'>
        <button className='search-fav-songs-button' onClick={goToFavorites}>Tus Canciones Favoritas</button>
      </div>
      <div className='search-section'>
        <div className='search-bar'>
          <input
            type="text"
            className='search-input'
            placeholder="Buscar artistas..."
            onChange={(e) => handleSearch(e.target.value)}/>
          <ArtistList artists={artists} />
        </div>
        <div className='search-fav-artists-section'>
          <h3 className='search-fav-artists-title'>Tus Artistas Favoritos</h3>
          <FavArtistList />
        </div>
      </div>
    </div>
  );
};

export default Search;