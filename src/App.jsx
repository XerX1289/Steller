import React from 'react'
import Home from './components/Home'
import { Routes,Route } from 'react-router-dom'

import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import Tvshows from './components/Tvshows'
import People from './components/People'
import MovieDetails from './components/MovieDetails'
import TvDetails from './components/TvDetails'
import PersonDetails from './components/PersonDetails'
import Trailer from './components/partials/Trailer'
import Notfound from './components/Notfound'
const App = () => {
  return (
    <div className='flex bg-[#1F1E24] h-screen w-screen '>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/trending" element={<Trending />}/>
        <Route path="/popular" element={<Popular />}/>
        <Route path="/movie" element={<Movie />}/>
        <Route path="/movie/details/:id" element={<MovieDetails/>} >
            <Route 
            path="/movie/details/:id/trailer" 
            element={<Trailer/>}/>
        </Route>
        <Route path="/tv" element={<Tvshows />}/>
        <Route path="/tv/details/:id" element={<TvDetails/>}>
        <Route 
            path="/tv/details/:id/trailer" 
            element={<Trailer/>}/>
        </Route>
        <Route path="/person" element={<People />}/>
        <Route path="/person/details/:id" element={<PersonDetails/>}/>
        {/* <Route path="*" element={<Notfound/>}/> */}
      </Routes>
      </div>
  )
}

export default App

