import Slide from './Slide'
import { Images } from '../Images'
import Play from '../assets/images/play.png'
import Pause from '../assets/images/pause.png'
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

  const handleBtnClick = (e) => {
    e.preventDefault()
    setAutoPlay(!autoPlay)
    console.log("updated autoPlay =", !autoPlay)
  }

  useEffect(() => {
    console.log("currentSlide => ", currentSlide);
    if (autoPlay === true) {
      const autoCarousel = setInterval(nextSlide, 2000);
      return () => clearInterval(autoCarousel);
    }
  }, [currentSlide, autoPlay, nextSlide]);

  return (
    <div className="carousel">
      <div className="arrowWrapper">
        <img id="left" className="jelly-nav" onClick={prevSlide} src="./left-jelly.png" alt="moon jellyfish"/>
      </div>
      {Images.map((image, i) => {
        return (
          <div key={i} className={`imgWrapper ${checkActive(i)}`}>
            {i === currentSlide ? 
              <Slide image={image} autoPlay={autoPlay} setAutoPlay={setAutoPlay} />
            : 
              null
            } 
          </div>
        )
      })}
      <div className="arrowWrapper">
        <img id="right" className="jelly-nav" onClick={nextSlide} src="./right-jelly.png" alt="moon jellyfish" />
      </div>
      <div className="btnWrapper">
        <button className="btn" onClick={handleBtnClick}>
          {
            autoPlay ?
              <img className="btnImg" src={Play} alt="play button" />
              :
              <img className="btnImg" src={Pause} alt="play button" />
          }
        </button>
      </div>
    </div>
  )
}
