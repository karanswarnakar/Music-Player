import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="contaner">
        <div className="banner"></div>
        <div className="data">
          <div className="top">
            <i class="ri-heart-2-line"></i>
            <h2>Unsayable</h2>


            <i class="ri-more-2-line"></i>
          </div>
          <div id="song_name">Brambles</div>
        </div>

        <MusicPlayer />


      </div>

      <Footer />

    </div>
  )
}

export default App
