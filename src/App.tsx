import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [ APODUrl, setAPODUrl ] = useState(null)
  const [ user, setUser ] = useState(null)


  useEffect(() => {
    // React handles .env files as long as the keys start with REACT_APP
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_APIKEY}`)
    .then((response) => response.json())
    .then(data => setAPODUrl(data.url))
  }, [])

  if (user) {
    return (
      <>
        {APODUrl && <img src={APODUrl} />}
      </>
    );
  } else {
    return (
      <>
        <p>Please sign in</p>
        <button onClick={() => window.location.replace('http://localhost:8080/google')}>Click me</button>
      </>
    )
  }
}

export default App;
