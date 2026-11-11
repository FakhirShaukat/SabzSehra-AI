import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <div className='logo w-full p-4 flex items-center gap-2 '>
      
      <img src={assets.logo} alt="Logo" className="h-10 w-10 object-cover" />
        <h1 className='text-xs md:text-lg text-white'>Sabz Sehra AI</h1>
    </div>
  )
}

export default Navbar