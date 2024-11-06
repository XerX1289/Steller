import React from 'react'
import { Link } from 'react-router-dom'
import noimage from '../../assets/no_image.jpg';

const HorizontalCards = ({data}) => {
 
  return (
    <div className='w-full p-6 '>
      
    <div className='w-[100%] flex overflow-y-hidden '>
       
      {data.length > 0 ? data.map((d,i)=>(
        <Link to={`/${d.media_type}/details/${d.id}`} key={i} className='min-w-[15%] h-[35vh] bg-zinc-900 mr-5 mb-5 '>
          <img className='w-full  mb-5 object-contain'
          src={d.backdrop_path || d.profile_path ? `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.profile_path}`:noimage} alt="" />
        
       <div className='text-white p-3 h-[55%] overflow-y-auto'>
           <h1 className='text-xl font-semibold '>{d.title || 
           d.name || 
           d.original_name ||
           d.original_title}
           </h1> 
           <p className='mb-9 '>{d.overview.slice(0,60)} ... <spam className='text-zinc-500'>more</spam> </p>
      </div>
          
    </Link>
    )) : <h1 className='text-3xltext-white front-black text-center'>Nothing to show</h1>}
      
      </div>  

    
  

    </div>
  )
}

export default HorizontalCards