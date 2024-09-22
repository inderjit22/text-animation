import './App.css'
import { GoArrowUpRight } from "react-icons/go";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Lenis from 'lenis'
import { PiMouseScroll } from "react-icons/pi";


function App() {
  useGSAP(()=>{
    gsap.from('.nav',{
      y:'50px',
      direction:1,
      opacity:0,
      stagger:0.4
    },'q')

    gsap.from('.innerPO , .innerPI ',{
      y:'50px',
      direction:0.5,
      opacity:0,
    },'q')

    gsap.from('.contScroll',{
      opacity:0,
      duration:1
    },'q')

  },[])

  useGSAP(()=>{
    gsap.to('.contScroll',{
      y:'-20px',
      repeat: -1,
      yoyo: true
    })
  },[])

  window.addEventListener('mousemove',(dets)=>{
    gsap.to('.circle',{
      x:dets.x -15,
      y:dets.y -15
    })
  })

  const lenis = new Lenis()

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  function HandelMouseEnter(e) {
    let a = e.target.querySelector('.arrow')
    gsap.to(a, {
      rotate: 360,
      duration: 1,
    })
  }

  function HandelMouseOut(e) {
    let b = e.target.querySelector('.arrow')
    gsap.to(b, {
      rotate: 0
    })
  }

  let Data = "Lorem ipsum dolor sit amet consectetur adipisicing elit Placeat expedita architecto delectus aliquid ipsa distinctio tempore aut libero sed laboriosam officiis dolorum harum atque Reprehenderit unde modi";
  let FilterData = Data.split(" ")

  useGSAP(() => {
    gsap.to('.innerPI', {
      width: '100%',
      stagger: 0.5,
      scrollTrigger: {
        trigger: '.contDiv',
        start: 'top top',
        end: '350% bottom',
        scrub: true,
        pin: true,
      }
    })
  }, [])

  return (
    <>
      <div className="contMain">
        {/* NavBar */}
        <div className="navBox">
          <p className='nav' onMouseEnter={HandelMouseEnter} onMouseLeave={HandelMouseOut}>Home <span className='arrowBox'>< GoArrowUpRight className='arrow' /></span></p>
          <p className='nav' onMouseEnter={HandelMouseEnter} onMouseLeave={HandelMouseOut}>About <span className='arrowBox'>< GoArrowUpRight className='arrow' /></span></p>
          <p className='nav' onMouseEnter={HandelMouseEnter} onMouseLeave={HandelMouseOut}>Contact <span className='arrowBox'>< GoArrowUpRight className='arrow' /></span></p>
        </div>
        {/* ContDiv */}
        <div className="contDiv">
          <div className="circle">
          </div>
          <div className="imgBox">
          </div>
          <div className="last">
            <div className='contScroll'>
              <PiMouseScroll className='white scrol'/>
              <p className='white' >Scroll</p>
            </div>
          </div>
          <div className='contInnerDiv'>
            {
              FilterData.map((item, index) => {
                return (
                  <span className='spanOuter' key={index}>
                    <p className='innerPO'>{item}</p>
                    <span className='spanInner' key={index}>
                      <p className='innerPI'>{item}</p>
                    </span>
                  </span>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
