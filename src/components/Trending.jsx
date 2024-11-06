import {useState,useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import axios from '../utils/axious';
import Cards from './partials/Cards';
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component'


const Trending = () => {
 const navigate = useNavigate();
 const [category, setcategory] = useState('all');
 const [duration, setduration] = useState('day');
 const [trending, settrending] = useState([]);
 const [page, setpage] = useState(1)
 const [hasMore, sethasMore] = useState(true)
 document.title = 'Steller | Trending'
 
 const GetTrending = async () => {
    try {
      const {data} =await axios.get(`/trending/${category}/${duration}?page=${page}`);
      
     if(data.results.length > 0){
      settrending((prevState)=>[...prevState, ...data.results]);
         setpage(page + 1)
     }else{
       sethasMore(false);
     }
      
      // settrending(data.results);
      console.log(data)
    } catch (error) {
      console.log("Error:",error);
    }
  }
    
  const refreshHandler = ()=>{
    if(trending.length === 0){
      GetTrending()
    }else{
      setpage(1)
      settrending([]);
      GetTrending()
    }
  }


 useEffect(() => {
   refreshHandler();
  }, [category,duration]);


    return trending ? (
    <div className=' w-screen h-screen '>
        <div className='w-full px-[5%]  flex items-center jestify-between'>
          <h1 className='w-[20%] text-2xl font-semibold text-zinc-400 mr-8'>
          <i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] p-2 ri-arrow-left-line"></i>Trending
            </h1>
            <div className='flex items-center w-[80%]'>
             <Topnav /> 
            <DropDown title="Category" options={["all","movie","tv"]} func={(e)=>setcategory(e.target.value)} />
            <div className='w-[2%]'></div>
            <DropDown title="Duration" options={["day","week"]} func={(e)=>setduration(e.target.value)} />
            </div>
            
        </div>
      
     <InfiniteScroll 
     dataLength={trending.length}
     next={GetTrending}
     hasMore={hasMore}
     loader={<h1>Loading...</h1>}
     >
     <Cards data={trending} title={category} />
      </InfiniteScroll> 
      


    </div>
    ):(<Loader/>
  )
}

export default Trending
