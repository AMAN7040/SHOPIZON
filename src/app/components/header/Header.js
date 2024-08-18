'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {

  const active = usePathname();

  return (
    <div className='flex justify-between text-black h-[4rem]'>
     <div className='w-1/2 mx-[0.5rem] md:mx-[5rem] my-auto text-[1.1rem] md:text-[1.8rem]'>SHOPIZON</div>
     <div className='w-full md:w-2/3 lg:w-3/5 flex justify-around items-center space-x-4 md:space-x-5 mx-[2rem]'>
      <Link className={`not-active ${active === '/' ? 'active' : ''} text-[1rem] md:text-[1.6rem] `} href='/'>Home</Link>
      <Link className={`not-active ${active === '/products' ? 'active' : ''} text-[1rem] md:text-[1.6rem]`} href='/products'>Product</Link>
      <Link className={`not-active ${active === '/cart' ? 'active' : ''} text-[1rem] md:text-[1.6rem]`} href='/cart'>Cart</Link>
      <button className='bg-black text-white rounded-md px-[0.3rem] py-[0.2rem] text-[0.9rem] md:text-[1.4rem] mx-[1rem'>Login</button>
     </div>
    </div>
  )
}

export default Header