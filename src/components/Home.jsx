import React, { useEffect,useState } from 'react'
import Sidenav from './partials/Sidenav';
import Topnav from './partials/Topnav';
import axios from '../utils/axious';
import Header from './partials/Header';
import HorizontalCards from './partials/HorizontalCards';
import DropDown from './partials/DropDown';
import Loader from './Loader';


const Home = () => {
  document.title = "WebApp || Home";
  
  const [wallpaper, setwallpaper] = useState(null)
  const [trending, settrending] = useState(null)
  const [category, setcategory] = useState("all")

  const funs = (e) => {
    e.preventDefault();
    setcategory(e.target.value)
  };

  const GetHeaderWallpaper = async () => {
    try {
      const {data} =await axios.get(`/trending/all/day`); 
      let randomdata = data.results[(Math.random()*data.results.length).toFixed()]
      setwallpaper(randomdata);
    } catch (error) {
      console.log("Error:",error);
    }
  };


  const GetTrending = async () => {
    try {
      const {data} =await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.log("Error:",error);
    }
  };


 useEffect(() => {
  GetTrending(); 
  !wallpaper && GetHeaderWallpaper();
 }, [category]);
 
console.log(trending)
    return wallpaper && trending ? (
    <>
    <Sidenav/>
    <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
    <Topnav/>
    <Header data = {wallpaper}/>

    <div className='flex pr-5  justify-between'>
      <div className='p-6 '>
      <h1 className=' text-4xl text-zinc-400 font-bold mt-3 '>Trending</h1>
      </div>
          <div className='mt-8' >
           <DropDown title="Category" options={["all","movie","tv"]} func={(e)=>setcategory(e.target.value)} />
          </div>
      </div>

    <HorizontalCards data ={trending} />
    </div>
    
    </>
  ):<Loader/>
};

export default Home