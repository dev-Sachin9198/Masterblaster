import Navbar from './component/Navbar'
import { Route ,Routes } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';
import Home from './pages/Home'
import Movies from './pages/Movies'
import MoviesDetails from './pages/MoviesDetails'
import MyBooking from './pages/MyBooking'
import SeatLayout from './pages/SeatLayout'
import Favorite from './pages/Favorite'
import Footer from './component/Footer';

export default function App() {

  // const isAdminRaute = useLocation().pathname.startsWith('/Admin')
  return (
    <>
    <Toaster/>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/Movies' element={<Movies/>} />
    <Route path='/Movies/:id' element={<MoviesDetails/>} />
    <Route path='/Movies/:id/:date' element={<SeatLayout/>} />
    <Route path='/My booking' element={<MyBooking/>} />
    <Route path='/favorite' element={<Favorite/>} />
    </Routes>
    <Footer/>

    </>
  )
}
