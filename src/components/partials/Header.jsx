import React from 'react'
import { Link } from 'react-router-dom'
const Header = ({data}) => {
  console.log(data)
  return (
    <div
    style={{background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
   backgroundPosition: 'top 10% center',
   backgroundSize: 'cover',
   backgroundRepeat: 'no-repeat', 
  }}
    className='w-full h-[50vh] flex flex-col justify-end items-start p-[4%]'>
    
      <h1 className='w-[50%]  text-5xl font-black text-white'>
      {data.name ||  data.title ||  data.original_name ||  data.original_title} 
      </h1>
      <p className='w-[50%] mt-3 mb-3 text-white'>
        {data.overview.slice(0,200)}...
        <Link to = {`/${data.media_type}/details/${data.id}`} className='text-blue-300'>more</Link>
        </p>
      <p className='text-white'>
      <i className="text-yellow-400 mr-2 ri-star-fill"></i>{(data.vote_average).toFixed(2) || "Not Available"}
      <i className="text-yellow-400 ml-5 mr-2 ri-play-circle-fill"></i>{data.media_type.toUpperCase()}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='bg-[#6556CD] p-4 rounded mt-3 text-white font-semibold'>Watch Trailer</Link>
    </div>
  )
}

export default Header