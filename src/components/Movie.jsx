import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from '../utils/axious';

import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import Cards from './partials/Cards';
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component'

const Movie = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState('popular')
    const [movie, setmovie] = useState([]);
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title = 'Steller | movie'
   
    const GetMovie = async () => {
       try {
         const {data} =await axios.get(`/movie/${category}?page=${page}`);
         console.log(data);
        if(data.results.length > 0){
         setmovie((prevState)=>[...prevState, ...data.results]);
            setpage(page + 1)
        }else{
          sethasMore(false);
        }
         
         // setmovie(data.results);
         console.log(data)
       } catch (error) {
         console.log("Error:",error);
       }
     }
       
     const refreshHandler = ()=>{
       if(movie.length === 0){
         GetMovie()
       }else{
         setpage(1)
         setmovie([]);
         GetMovie()
       }
     }
   
   
    useEffect(() => {
      refreshHandler();
     }, [category]);
  
         return movie ? (
            <div className=' w-screen h-screen '>
                <div className='w-full px-[10%] object-center  flex items-center jestify-between'>
                  <h1 className='w-[20%] text-2xl font-semibold text-zinc-400 mr-8'>
                  <i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] p-2 ri-arrow-left-line"></i>Movie<small className='ml-2 text-sm text-zinc-500'>({category.replace("_", " ")})</small>
                    </h1>
                    <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <DropDown title="Category" options={["popular","top_rated","upcoming","now_playing"]} func={(e)=>setcategory(e.target.value)} />
                    </div>
                    
                </div>
              
             <InfiniteScroll 
             dataLength={movie.length}
             next={GetMovie}
             hasMore={hasMore}
             loader={<h1>Loading...</h1>}
             >
             <Cards data={movie} title="movie" />
              </InfiniteScroll> 
              
        
        
            </div>
            ):(<Loader/>
          )
}

export default Movie