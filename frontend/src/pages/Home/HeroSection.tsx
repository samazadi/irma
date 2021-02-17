import { useState } from 'react';
import { InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { searchForBook } from '../../services/search';
import { SearchTypes, SearchTypeValues } from '../../types';
import './index.scss';

const HeroSection = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchType, setSearchType] = useState<SearchTypeValues>("title");

    const handleSearchClick = (): void => {
        searchForBook(searchInput);
    }

    const handleDropdownSelect = (e: string | null): void => {
        console.log("dropdown select changed", e)
    }

    return (
        <div className="hero-section-wrapper">
            <div className="jumbotron">
                <h1 className="display-4 text-center">Irma</h1>
                <p className="lead text-center">Hogwarts Library Web Portal</p>

                <div className="row">
                    <div className="col-5 offset-2 col-md-6 offset-md-2">
                        <InputGroup size="lg">
                            <FormControl
                                placeholder="Title, ISBN, or ID"
                                aria-label="Title, ISBN, or ID"
                                aria-describedby="basic-addon2"
                                onChange={e => setSearchInput(e.target.value)}
                            />
                            <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title="Dropdown"
                                id="input-group-dropdown-2"
                                onSelect={handleDropdownSelect}
                                defaultValue={"title"}
                            >
                                <Dropdown.Item eventKey={SearchTypes.TITLE}>Title</Dropdown.Item>
                                <Dropdown.Item eventKey={SearchTypes.ISBN}>ISBN</Dropdown.Item>
                                <Dropdown.Item eventKey={SearchTypes.ID}>ID</Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>
                    </div>
                    <div className="col-5 col-md-3">
                        <p className="lead">
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={handleSearchClick}
                            >Search</button>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default HeroSection;