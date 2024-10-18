import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../stylesheets/ArtistList.css';

const ArtistList = ({artists}) => {
  const navigate = useNavigate();

  const handleArtistClick = (id) => {
    navigate(`/artist/${id}`);
  };

  return (
    <div className="artist-list-container">
      {artists.map((artist) => (
        <div 
          className="artlist-artist-card"
          key={artist.id}
          onClick={() => handleArtistClick(artist.id)}>
          {artist.images.length > 0 ? (
            <img className="artlist-artist-image" src={artist.images[0].url} alt={artist.name}/>) : (<div className="artlist-no-artist-image"></div>
          )}
          <span className="artlist-artist-name">{artist.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ArtistList;