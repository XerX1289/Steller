import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams,Link, useLocation,} from 'react-router-dom';
import { asyncloadperson, removeperson } from '../store/actions/personActions';
import Loader from './Loader';
import HorizontalCards from './partials/HorizontalCards';
import DropDown from './partials/DropDown';
const PersonDetails = () => {
  const {pathname} = useLocation();
  const {id} = useParams()
  const dispatch = useDispatch();
const navigate = useNavigate();
const {info} = useSelector(state=>state.person);

const [category, setcategory] = useState('movie');


  useEffect(()=>{
      dispatch(asyncloadperson(id))
      return () =>{
        dispatch(removeperson());
        return () =>{
          dispatch(removeperson()); 
        }
      };
    },[id]);
    console.log(info)
  return info ? (
    <div className='px-[10%] w-screen h-[150vh] bg-[#1F1E24]'>
    {/* {part1 nav} */}
    <nav className='h-[10vh] w-full items-center text-zinc-200 flex gap-9 text-xl '>
      <Link onClick={()=>navigate(-1)} className="hover:text-[#6556CD] p-2 ri-arrow-left-line"></Link>{" "}
     
      </nav>
    <div className='w-full flex'>
    {/* {part 2 left poster and details} */}
        <div className='w-[20%] '>
        <img  className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] w-[35vh] object-cover' 
         src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`} 
         alt=""
        /> 
        <hr className='mt-10 mb-5 border-none h-[1px] bg-zinc-500'/> 
        {/* {Links} */}
        <div className='text-2xl text-white flex gap-x-5'>
      <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
       <i className="ri-earth-fill"></i>
      </a>
      <a target='_blank' href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
      <i class="ri-facebook-circle-fill"></i>
      </a>
      <a target='_blank' href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
      <i class="ri-instagram-fill"></i>
      </a>
      <a target='_blank' href={`https://www.twitter.com/${info.externalid.twitter_id}`}>
      <i class="ri-twitter-x-fill"></i>
      </a>
    

        </div>
        {/* personal info */}
        <h1 className='text-2xl text-zinc-400 font-semibold my-5'>Person Info</h1>

        <h1 className='text-lg text-zinc-400 font-semibold '>Known For</h1>
        <h1 className=' text-zinc-400 '>{info.detail.known_for_department}</h1>

        <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Gender</h1>
        <h1 className=' text-zinc-400 '>{info.detail.gender === 2 ? "Male" : "Female"}</h1>
        
        <h1 className='text-lg text-zinc-400 font-semibold mt-3 '>Birthday</h1>
        <h1 className=' text-zinc-400 '>{info.detail.birthday}</h1>

        <h1 className='text-lg text-zinc-400 font-semibold mt-3 '>Also Knoen as</h1>
        <h1 className=' text-zinc-400 '>{info.detail.also_known_as.join(", ")}</h1>
        </div>
      
  
       {/* {part 3 right Details and info} */}
          <div className='w-[80%] ml-[5%]'>
           <h1 className='text-6xl text-zinc-400 font-black my-5'>{info.detail.name}</h1>
           
           <h1 className='text-lg text-zinc-400 font-semibold '>Biography</h1>
           <p className='text-zinc-400 mt-3'>{info.detail.biography}</p>
           
           <h1 className='text-lg text-zinc-400 font-semibold mt-3  ml-6'>Work </h1>
            <HorizontalCards data={info.combinedCredits.cast} />

             <div className='w-full flex justify-between'>
             <h1 className='text-3xl text-zinc-400 font-semibold ml-5 '>Acting</h1>

             <DropDown title="Category" options={["movie","tv"]} func={(e)=>setcategory(e.target.value)} />
             </div>
            
            <div className='list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,0.5)] border-2 border-zinc-700 p-5'>
            
            {info[category + "Credits"].cast.map((c,i)=>( 
              <li key={i} className='hover:text-white rounded hover:bg-[#19191d] duration-300 p-5 cursor-pointer'>
              <Link to={`/${category}/details/${c.id}`} >
                <span> {" "}{c.name ||  c.title ||  c.original_name ||  c.original_title}</span>
                <span className='block ml-5 mt-2'>{c.character && `Character name: ${c.character}`}</span>
              </Link>
              </li>
            ))}
            
            
           
            </div>

          
         </div>


     </div>
    </div>
  ):<Loader/>
}

export default PersonDetails