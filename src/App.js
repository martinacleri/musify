import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Search from './components/Search';
import ArtistDetail from './components/ArtistDetail';
import AlbumDetail from './components/AlbumDetail';
import FavoriteSongs from './components/FavoriteSongs';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const clientId = localStorage.getItem('spotifyClientId');
    const clientSecret = localStorage.getItem('spotifyClientSecret');
    
    if (clientId && clientSecret) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleCredentialsUpdate = (clientId, clientSecret) => {
    localStorage.setItem('spotifyClientId', clientId);
    localStorage.setItem('spotifyClientSecret', clientSecret);
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onCredentialsUpdate={handleCredentialsUpdate} />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/search" : "/login"} />} />
        {isAuthenticated && (
          <>
            <Route path="/search" element={<Search />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />
            <Route path="/album/:albumId" element={<AlbumDetail />} />
            <Route path="/favorites" element={<FavoriteSongs />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;