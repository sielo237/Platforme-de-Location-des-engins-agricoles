import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesList } from '../../redux/categoriesSlice';
import { getEnginesList } from '../../redux/enginesSlice';
import LandingPageNavbar from '../navbar/LandingPageNavbar';
import LandingPageFooter from '../footer/LandingPageFooter';

const LandingPageMenu = () => {
  const dispatch = useDispatch();
 useEffect(() => {
  dispatch(getCategoriesList());
  dispatch(getEnginesList());
  
 },[])
  return (
    <section className=' relative min-h-screen'>
        <LandingPageNavbar/>
         <section className='min-h-screen'>
            <Outlet/>
        </section>
    </section>
  )
}

export default LandingPageMenu