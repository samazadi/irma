import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar';
import HeroSection from './HeroSection';
import WarningFooter from './WarningFooter';

const Home = () => {
    return (
        <Fragment>
            <Navbar />
            <HeroSection />
            <WarningFooter />
        </Fragment>
    )
}

export default Home;