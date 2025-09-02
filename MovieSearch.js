import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [apiKey, setApiKey] = useState('9cd06fb2'); // Store user-entered key
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`
      );
      setMovies(response.data.Search || []);
    } catch (error) {
      alert('Error! Check your API key or try another movie');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 >SM Movie App</h1>
      
      {/* API Key Input (only shown if not entered yet) */}
      {!apiKey && (
        <div>
          <p>Enter your OMDb API Key:</p>
          <input 
            type="text" 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste your API key here"
          />
          <button onClick={() => localStorage.setItem('apiKey', apiKey)}>
            Activate Key
          </button>
        </div>
      )}

      {/* Movie Search (shown after key activation) */}
      {apiKey && (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Search movie..."
          />
          
          <button onClick={searchMovies}>Search</button>

          <div>
            {movies.map(movie => (
              <div key={movie.imdbID}>
                <h3>{movie.Title} ({movie.Year})</h3>
                <img src={movie.Poster} alt={movie.Title} width="100" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
