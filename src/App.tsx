import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

// I had this broken out into a config file, but it wouldn't import properly
let apiUrl: string
const apiUrls = {
  production: 'https://mym-assessment-2-api-attempt-2.vercel.app',
  development: 'http://localhost:8080'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

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
      getUser()
    }
  }, [])

  const getUser = () => {
    axios.get(apiUrl + '/user', { withCredentials: true })
      .then(response => {
        console.log(response)
        setUser(response.data)
      })
      .catch(error => console.log(error))
  }

  const onLogOut = () => {
    setUser(null)
    axios.post(apiUrl + '/logout', { withCredentials: true })
  }

  if (user) {
    return (
      <div className='image'>
        {APODUrl && <img src={APODUrl} />}
        <h3>Pretty cool, huh? Nasa, am I right?</h3>
        <button onClick={onLogOut}>Log Out</button>
        <button onClick={getUser}>Get User</button>
      </div>
    );
  } else {
    return (
      <div className='sign-in'>
        <h3>Sign In with Google to See Today's Cool Space Image</h3>
        <button onClick={() => window.location.assign(apiUrl + '/google')}>Sign In</button>
        <p>Maybe this will show me if it's a useEffect problem or a Axios problem</p>
        <button onClick={getUser}>Get User</button>
      </div>
    )
  }
}

export default App;
