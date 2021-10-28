import Slide from './Slide'
import { Images } from '../Images'
import { useState, useEffect, useCallback } from 'react'

export default function Carousel() {

  const [currentSlide, setSlide] = useState(0)
  const length = Images.length
  const [autoPlay, setAutoPlay] = useState(true)
  
  const prevSlide = () => {
    setSlide(currentSlide === 0 ? length - 1 : currentSlide - 1)
  }

  const nextSlide = useCallback(() => {
    setSlide(currentSlide === (length - 1) ? 0 : currentSlide + 1)
  }, [currentSlide, length])

  const checkActive = (i) => {
    return i === currentSlide ? 'slide-active' : 'slide'
  }

  const handleImageClick = () => {
    setAutoPlay(!autoPlay)
    console.log("updated autoPlay =", !autoPlay)
  }
 
  useEffect(() => {
    console.log("currentSlide => ", currentSlide);
    if (autoPlay === true) {
      //// The next line is tested and works imperfectly (to see it, uncomment line 35 and comment out lines 36 & 37; then check the console for their differences)
      //// see the links below:
      //// https://stackoverflow.com/questions/56800694/what-is-the-expected-return-of-useeffect-used-for
      //// https://www.youtube.com/watch?v=aKOQtGLT-Yk&ab_channel=TheNetNinja
      // setInterval(nextSlide, 2000);
      const autoCarousel = setInterval(nextSlide, 2000);
      return () => clearInterval(autoCarousel);
    } 
  //// For the dependencies issue: Sometimes it’s as simple as just adding the required dependency. Also, see the next link and the check the updated nextSlide (lines 15-17), using useCallback hook.
  //// https://infinitypaul.medium.com/reactjs-useeffect-usecallback-simplified-91e69fb0e7a3
  }, [currentSlide, autoPlay, nextSlide]);

  return (
    <div id="carousel">
      <img id="left" className="jelly-nav" onClick={prevSlide} src="./left-jelly.png" alt="moon jellyfish"/>
      {Images.map((image, i) => {
        return (
          <div className={checkActive(i)} key={i} onClick={handleImageClick}>
            {i === currentSlide ? <Slide image={image} autoPlay={autoPlay} setAutoPlay={setAutoPlay} /> : null}      
          </div>
        )
      })}
      <img id="right" className="jelly-nav" onClick={nextSlide} src="./right-jelly.png" alt="moon jellyfish" />
    </div>
  )
}