import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { assets } from "../assets/assets";
import backgroundImage from "../assets/backgroundImage.png";
import {useNavigate} from 'react-router-dom'

function HeroSection() {
    const navigate = useNavigate()
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      className="
        flex flex-col items-start justify-center
        gap-4 px-6 md:px-16 lg:px-36
        bg-cover bg-center
        h-screen
        text-white
      "
    >
      {/* Marvel Logo */}
      <img
        src={assets.marvelLogo}
        alt="Marvel Logo"
        className="max-h-11 lg:h-11 mt-20"
      />

      {/* Movie Title */}
      <h1 className="text-5xl md:text-[70px] md:leading-[1.1] font-semibold">
        Guardians 
        <br className="hidden md:block" />
         of the Galaxy
      </h1>

      {/* Movie Info */}
      <div className="flex items-center gap-4 text-gray-300">
        <span>Action | Adventure | Sci-Fi</span>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <span>2026</span>
          </div>

          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <span>2h 12m</span>
          </div>
        </div>
      </div>
      
    <p className="max-w-md text-gray-300">In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.</p>
        <button
  onClick={() => navigate("/Movies")}
  className="
    group relative flex items-center gap-2
    px-7 py-3.5
    rounded-full
    bg-gradient-to-read from-primary to-purple-600
    text-white font-semibold
    shadow-[0_0_25px_rgba(139,92,246,0.35)]
    hover:shadow-[0_0_35px_rgba(139,92,246,0.6)]
    hover:-translate-y-1
    active:translate-y-0
    transition-all duration-300
    cursor-pointer
    overflow-hidden
  "
>
  <span className="relative z-10">
    Explore Movies
  </span>

  <ArrowRight
    className="
      relative z-10 w-5 h-5
      transition-transform duration-300
      group-hover:translate-x-1
    "
  />
</button>
    </div>
  );
}

export default HeroSection;

