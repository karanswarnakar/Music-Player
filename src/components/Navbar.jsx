import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <button id="back">
        <i class="ri-arrow-down-s-line"></i>
      </button>

      <p>Now Playing</p>

      <button id="listOfMusic">
        <i class="ri-play-list-line"></i>
      </button>
    </nav>
  )
}

export default Navbar
