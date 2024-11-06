
import { Link } from 'react-router-dom'

const Sidenav = () => {

 

  return (

   <div className='w-[20%] h-full border-r-2 border-zinc-400 p-10'>
      <h1 className='text-2xl text-white font-bold'>
      {/* <i className="text-[#6556CD] ri-movie-2-fill mr-2"></i> */
      <img src="\SU.png" alt="img" className=' w-full h-full object-fit'/>
      }
       
      </h1>
      <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
       <h1 className='text-white font-semibold text-xl mb-3'>New Feeds </h1>
      <Link  to="/trending" className='hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-4'> <i className="ri-fire-fill"></i> Trending</Link>
      <Link  to="/popular" className='hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-4'><i className=" mr-2 ri-sparkling-2-line"></i>Popular</Link>
      <Link  to="/movie" className='hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-4'><i className="mr-2 ri-movie-line"></i>Movie</Link>
      <Link to="/tv" className='hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-4'><i className="mr-2 ri-tv-line"></i>Tv Shows</Link>
      <Link to="/person" className='hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-4'><i className="mr-2 ri-team-line"></i>People</Link>
      </nav>
      {/* <hr className='border-none h-[1px] bg-zinc-400 mt-4'/>
      <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
       <h1 className='text-white font-semibold text-xl mt-10 mb-3'>Website Information</h1>
      <Link className='hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-4'><i className="mr-2 ri-information-2-line"></i>About</Link>
      <Link className='hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-4'><i className="mr-2 ri-contacts-book-3-line"></i>Contact Us</Link>
      </nav> */}
      
    </div>
  )
}

export default Sidenav