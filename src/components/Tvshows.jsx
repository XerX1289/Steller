import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from '../utils/axious';

import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import Cards from './partials/Cards';
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component'

const Tvshows = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState('airing_today');
    const [tv, settv] = useState([]);
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title = 'Steller | Tv Shows'
   
    const GetTv = async () => {
       try {
         const {data} =await axios.get(`/tv/${category}?page=${page}`);
         console.log(data);
        if(data.results.length > 0){
         settv((prevState)=>[...prevState, ...data.results]);
            setpage(page + 1)
        }else{
          sethasMore(false);
        }
         
         // settv(data.results);
         console.log(data)
       } catch (error) {
         console.log("Error:",error);
       }
     }
       
     const refreshHandler = ()=>{
       if(tv.length === 0){
         GetTv()
       }else{
         setpage(1)
         settv([]);
         GetTv()
       }
     }
   
   
    useEffect(() => {
      refreshHandler();
     }, [category]);
   
  
  
     return tv ? (
        <div className=' w-screen h-screen '>
            <div className='w-full px-[5%] flex items-center jestify-between'>
              <h1 className='w-[20%] text-2xl font-semibold text-zinc-400 mr-8'>
              <i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] p-2 ri-arrow-left-line"></i>Tv Shows<small className='ml-2 text-sm text-zinc-500'>({category.replace("_", " ")})</small>
                </h1>
                <div className='flex items-center w-[80%]'>
                <Topnav />
                <DropDown title="Category" options={["popular","top_rated","on_the_air","airing_today"]} func={(e)=>setcategory(e.target.value)} />
                </div>
                
            </div>
          
         <InfiniteScroll 
         dataLength={tv.length}
         next={GetTv}
         hasMore={hasMore}
         loader={<h1>Loading...</h1>}
         >
         <Cards data={tv} title="tv" />
          </InfiniteScroll> 
          
    
    
        </div>
        ):(<Loader/>
      )
}

export default Tvshows;