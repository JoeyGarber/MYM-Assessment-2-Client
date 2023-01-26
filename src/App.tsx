import React, { useEffect, useState } from 'react';
import axios from 'axios'
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

  useEffect(() => {
    if (!user) {
      axios.get('http://localhost:8080/user', { withCredentials: true })
      .then(response => {
        console.log(response)
        setUser(response.data)
      })
    }
  }, [])

  const onLogOut = () => {
    setUser(null)
    axios.post('http://localhost:8080/logout', {withCredentials: true})
  }

  if (user) {
    return (
      <div className='image'>
        {APODUrl && <img src={APODUrl} />}
        <h3>Pretty cool, huh? Nasa, am I right?</h3>
        <button onClick={onLogOut}>Log Out</button>
      </div>
    );
  } else {
    return (
      <div className='sign-in'>
        <h3>Sign In with Google to See Today's Cool Space Image</h3>
        <button onClick={() => window.location.assign('http://localhost:8080/google')}>Sign In</button>
      </div>
    )
  }
}

export default App;
