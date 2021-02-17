import './index.scss';

const HeroSection = () => {
    return (
        <div className="hero-section-wrapper">
            <div className="jumbotron">
                <h1 className="display-4 text-center">Irma</h1>
                <p className="lead text-center">Hogwarts Library Web Portal</p>

                <div className="row">
                    <div className="col-6 col-md-3 offset-md-4">
                        <div className="input-group input-group-lg mb-3">
                            <input type="text" className="form-control" placeholder="Book Name, ISBN, or ID" aria-label="UsernameBook Name, ISBN, or ID" aria-describedby="basic-addon1" />
                        </div>

                    </div>
                    <div className="col-6 col-md-3">
                        <p className="lead">
                            <button className="btn btn-primary btn-lg">Search</button>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default HeroSection;