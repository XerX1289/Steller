import React from 'react'
import { Link } from 'react-router-dom'
import noimage from '../../assets/no_image.jpg';

const Cards = ({data,title}) => {
  return (
    <div className='flex flex-wrap w-full h-full px-[10%] bg-[#1F1E24]'>
        {data.map((c,i)=>(
        <Link to={`/${c.media_type || title}/details/${c.id}`} className='relative w-[25vh] mr-[5%] mb-[5%] '  key={i}>
        <img  className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] w-[40vh] object-cover' src={c.poster_path || c.backdrop_path||c.profile_path ? `https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path||c.profile_path}` : noimage} alt="" />
        
       <h1 className='text-2xl text-zinc-300 mt-3 font-semibold'>

        {c.name ||  c.title ||  c.original_name ||  c.original_title}
        </h1>
        

        {c.vote_average && (<div className='absolute right-[-8%] bottom-[25%]   text-white text-xl font-semibold bg-orange-400 w-[5vh] h-[5vh] flex justify-center items-center rounded-full'>
          {(c.vote_average*10).toFixed()}<sup>%</sup> </div>)}

        </Link>))}
    </div>
  )
}

export default Cards