import { useState } from 'react'

export default function Slide({ image, autoPlay, setAutoPlay }) {
  const [isMouseHover, setIsMouseHover] = useState(false)
  const handleMouseEnter = () => {
    if(autoPlay && !isMouseHover) {
      setAutoPlay(!autoPlay)
      setIsMouseHover(true)
    }
  }
  const handleMouseLeave = () => {
    if(!autoPlay && isMouseHover) {
      setAutoPlay(!autoPlay)
      setIsMouseHover(false)
    }
  }
  console.log("isMouseHover ===>", isMouseHover)
  return (
    <img 
      src={image} 
      alt="deep sea creature" 
      className="carousel-image" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  )
}