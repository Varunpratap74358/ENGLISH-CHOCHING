import React from 'react'
import HeroSection from '../pages/HeroSection'
import About from '../pages/About'
import FeedbackPage from '../pages/FeedbackPage'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
  const {user} = useSelector(state=>state.user)
  return (
    <div>
      <HeroSection />
      <About />
      <FeedbackPage />
      <footer className="bg-blue-600 py-6 ">
        <div className="container mx-auto px-4 text-center text-white">
          <p className="text-lg font-semibold">British Academy Coaching Center</p>
          <p>{user?.address}, 242123</p>
          <p>Email: {user.email} | Phone: (+91) {user.phone}</p>
          <p className="mt-4">&copy; {new Date().getFullYear()} British Academy. All Rights Reserved.</p>
        </div>
        <div className="text-center py-2">
          <Link to={'https://portfoliyo-pi-ivory.vercel.app/?fbclid=PAZXh0bgNhZW0CMTEAAaZ37spLMP3eG6HbezozUWNQjqvg8NEhNFbmGK-2QiJVAoAA8b5GlxqTA9s_aem_XlL6bN-xalBEnvX2XyA31Q'} target='_blanck' className=' py-2 text-[#ddd1d1]'>This website designed by : <span className='text-yellow-400'>Varun Pratap Singh</span></Link>
        </div>
      </footer>
    </div>
  )
}

export default Home
