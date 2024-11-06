import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate,Link } from 'react-router-dom'
import Notfound from "../Notfound"

const Trailer = () => {
    const {pathname} = useLocation();
   const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv"
  const ytvideos = useSelector(state=>state[category].info.videos)
    
  return  (
    <div className='bg-[rgba(0,0,0,0.8)] z-[100] top-0 left-0 absolute w-screen h-screen flex items-center justify-center '>
        <Link onClick={()=>navigate(-1)} 
        className="absolute hover:text-[#6556CD] ri-close-large-fill text-3xl text-white right-[5%] top-[5%]">
        </Link>
        {ytvideos ? (
            <ReactPlayer
            controls 
            height={720}
            width={1280}
            url={`https://www.youtube.com/watch?v=${ytvideos.key}`}/>
        ): <Notfound/>}

        </div>
  )
}

export default Trailer