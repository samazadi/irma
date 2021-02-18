import React, { useState } from 'react';
import { InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { SearchTypes, SearchTypeValues } from '../../types';
import { searchForBook } from '../../services/search';

const SearchInput = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchType, setSearchType] = useState<SearchTypeValues>("TITLE");

    const handleSearchClick = (): void => {
        if (!searchInput) return;
        const searchResult = searchForBook(searchInput, searchType);
        console.log("The result we got", searchResult);
    }

    const handleDropdownSelect = (value: string | null): void => {
        if (!value) return console.error('No dropdown value');
        setSearchType(value as SearchTypeValues);
    }

    return (
        <div className="container">
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
                            variant="primary"
                            title={searchType}
                            id="input-group-dropdown-2"
                            style={{ minWidth: 100 }}
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
    )
}

export default SearchInput;