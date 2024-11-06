import React, { useState } from 'react'
import axios from '../../utils/axious';
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import noimage from '../../assets/no_image.jpg';
const Topnav = () => {
 
 const [query,setquery]= useState("");
const [searches, setsearches] = useState([]);
 const GetSearches =async () => {
  try {
    const {data} =await axios.get(`/search/multi?query=${query}`); 
    setsearches(data.results);
  } catch (error) {
    console.log("Error:",error);
  }
};

useEffect(() => { 
GetSearches();
},[query]);

 
  return (
    <div className=' w-[80%] h-[10vh] relative flex m-auto item-center  '>
        <div className='mt-4 w-full'>
        <i className=" text-zinc-400 text-3xl  ri-search-line"></i>
        <input
         onChange={(e) =>setquery(e.target.value)}
         value={query}
         className='w-[50%] text-white mx-8 p-5 text-xl outline-none border-none bg-transparent' 
         type="text" 
         placeholder='search anything'/>
         
         {query.length>0 && (<i onClick={()=>setquery("")} className=" text-zinc-400 text-3xl right-0 ri-close-line"></i>
        )}
        </div>

        
        <div className=' z-[100] absolute w-[50%] max-h-[40vh] bg-zinc-200 top-[100%] left-[5%]  overflow-auto'>
        
        {searches.map((s,i) => (
          <Link to={`/${s.media_type}/details/${s.id}`} key = {i} className=' hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start item-center border-b-2 border-zinc-100'>
          <img 
          className='max-w-[10vh] max-h-[10vh] object-contain rounded mr-10 shadow-lg'
          src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`:noimage} alt=''/>
          <span>{s.name || s.title || s.original_name || s.original_title}</span>
          </Link>))}
        
        

          
        </div>
        </div>
  )
}

export default Topnav