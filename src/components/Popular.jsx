import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from '../utils/axious';

import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import Cards from './partials/Cards';
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component'

const Popular = () => {
    const navigate = useNavigate();
 const [category, setcategory] = useState('movie');
 const [popular, setpopular] = useState([]);
 const [page, setpage] = useState(1)
 const [hasMore, sethasMore] = useState(true)
 document.title = 'Steller | Popular'

 const GetPopular = async () => {
    try {
      const {data} =await axios.get(`${category}/popular?page=${page}`);
      console.log(data);
     if(data.results.length > 0){
      setpopular((prevState)=>[...prevState, ...data.results]);
         setpage(page + 1)
     }else{
       sethasMore(false);
     }
      
      // setpopular(data.results);
      console.log(data)
    } catch (error) {
      console.log("Error:",error);
    }
  }
    
  const refreshHandler = ()=>{
    if(popular.length === 0){
      GetPopular()
    }else{
      setpage(1)
      setpopular([]);
      GetPopular()
    }
  }


 useEffect(() => {
   refreshHandler();
  }, [category]);

    
  return popular ? (
    <div className=' w-screen h-screen '>
        <div className='w-full px-[5%]  flex items-center jestify-between'>
          <h1 className='w-[20%] text-2xl font-semibold text-zinc-400 mr-8'>
          <i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] p-2 ri-arrow-left-line"></i>Popular
            </h1>
            <div className='flex items-center w-[80%]'>
            <Topnav />
            <DropDown title="Category" options={["movie","tv"]} func={(e)=>setcategory(e.target.value)} />
            </div>
            
        </div>
      
     <InfiniteScroll 
     dataLength={popular.length}
     next={GetPopular}
     hasMore={hasMore}
     loader={<h1>Loading...</h1>}
     >
     <Cards data={popular} title={category} />
      </InfiniteScroll> 
      


    </div>
    ):(<Loader/>
  )
}

export default Popular