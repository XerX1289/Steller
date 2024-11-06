import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from '../utils/axious';

import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import Cards from './partials/Cards';
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component'

const People = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState('popular');
    const [person, setperson] = useState([]);
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title = 'Steller | People'
   
    const GetPerson = async () => {
       try {
         const {data} =await axios.get(`/person/${category}?page=${page}`);
         console.log(data);
        if(data.results.length > 0){
         setperson((prevState)=>[...prevState, ...data.results]);
            setpage(page + 1)
        }else{
          sethasMore(false);
        }
         
         // setperson(data.results);
         console.log(data)
       } catch (error) {
         console.log("Error:",error);
       }
     }
       
     const refreshHandler = ()=>{
       if(person.length === 0){
         GetPerson()
       }else{
         setpage(1)
         setperson([]);
         GetPerson()
       }
     }
   
   
    useEffect(() => {
      refreshHandler();
     }, [category]);
 
    return person ? (
        <div className=' w-screen h-screen '>
        <div className='w-full px-[5%]  flex items-center jestify-between'>
          <h1 className='w-[20%] text-2xl font-semibold text-zinc-400 mr-8'>
          <i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] p-2 ri-arrow-left-line"></i>person <small className='ml-2 text-sm text-zinc-500'>({category.replace("_", " ")})</small>
            </h1>
            <div className='flex items-center w-[80%]'>
            <Topnav />
            </div>
            
        </div>
      
     <InfiniteScroll 
     dataLength={person.length}
     next={GetPerson}
     hasMore={hasMore}
     loader={<h1>Loading...</h1>}
     >
     <Cards data={person} title="person"/>
      </InfiniteScroll> 
      


    </div>
    ):(<Loader/>
  )
  
}

export default People