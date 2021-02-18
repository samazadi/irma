import SearchInput from '../../components/SearchInput';

import './index.scss';

const HeroSection = () => {
    return (
        <div className="hero-section-wrapper">
            <div className="jumbotron">
                <h1 className="display-4 text-center">Irma</h1>
                <p className="lead text-center">Hogwarts Library Web Portal</p>
                <SearchInput />
            </div>
        </div>
    )
}

export default HeroSection;