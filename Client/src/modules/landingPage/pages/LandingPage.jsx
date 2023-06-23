import React,{useEffect} from 'react';
import HeroSection from '../components/HeroSection';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import Statistics from '../components/Statistics';
import Testimonials from '../components/Testimonials';
import Mobile from '../components/Mobile';

const LandingPage = () => {

  return (
    <>
      <HeroSection/>
      <AboutUs/>
      <Services/>
     <Statistics/>
     <Testimonials/>
     <Mobile/>
    </>
  )
}

export default LandingPage