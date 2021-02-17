import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar';
import HeroSection from './HeroSection';

const Home = () => {
    return (
        <Fragment>
            <Navbar />
            <HeroSection />
        </Fragment>
    )
}

export default Home;