import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const RootLayout = () => {
  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <main>
        <Outlet/>
      </main>
      {/* <Footer/> */}
    </div>
  )
}

export default RootLayout
