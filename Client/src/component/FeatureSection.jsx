import { ArrowRight } from "lucide-react"
import {useNavigate} from 'react-router-dom'
import BlurCircle from "./BlurCircle"
import { dummyShowsData } from "../assets/assets"
import MovieCard from "./MovieCard"

const FeatureSection = () => {
     const navigate = useNavigate()
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
        <div>
            <BlurCircle top='0' right='-8px'/>
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
        <button
  onClick={() => navigate("/Movies")}
  className="group ml-auto flex items-center gap-2 text-sm text-gray-300 cursor-pointer"
>
  View All
  <ArrowRight
    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
  />
</button>

        </div>


        <div className='flex flex-wrap max-sm:justify-center gap-8 mt-8'>
            {dummyShowsData.slice(0,4).map((show)=>(<MovieCard key={show._id} movie={show}/>
            ))}
        </div>



        <div className="flex justify-center mt-20">
        <button onClick={()=>{navigate('/Movies');scrollTo(0,0)}} className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer">
                Show More
        </button>
        </div>

    </div>
  )
}

export default FeatureSection