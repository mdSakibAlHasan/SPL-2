import React from 'react'
import HomeMain from '../Components/HomeMain'
import Navbar from '../Components/Navbar'
import Footer from '../Footer/Footer'
import '../Footer/Footer.css'
import '../as.css';

const Home = ()=>{
    return(
        // <div><Navbar/>
        //  <HomeMain/>
        //  <Footer/>
        // </div>
        <>
        {/* <Navbar/> */}
         <div>
          <HomeMain/>
         </div>
         {/* <Footer/> */}
         </>
    )
}

export default Home