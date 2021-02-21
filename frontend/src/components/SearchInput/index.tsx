import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { SearchTypes, SearchTypeValues } from '../../types';
import { useHistory } from 'react-router-dom';

interface SearchInputProps {
    prefilledSearchString?: string;
    prefilledSearchType?: SearchTypeValues;
    handleNoneRoutingSearch?: (searchString: string, searchType: SearchTypeValues) => void;
}

const SearchInput = ({ prefilledSearchString, prefilledSearchType, handleNoneRoutingSearch }: SearchInputProps) => {
    const history = useHistory();
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchType, setSearchType] = useState<SearchTypeValues>("title");

    useEffect(() => {
        if (prefilledSearchString && prefilledSearchType) {
            setSearchInput(prefilledSearchString);
            setSearchType(prefilledSearchType);
        }
    }, [prefilledSearchString, prefilledSearchType]);

    const handleSearchClick = (): void => {
        if (!searchInput) return;
        
        const pathnameParts = history.location.pathname.split('/');
        if (pathnameParts[1] === "search" && handleNoneRoutingSearch) {
            return handleNoneRoutingSearch(searchInput, searchType);
        }
        
        return history.push(`/search/${searchInput}/${searchType}`);
    }

    const handleDropdownSelect = (value: string | null): void => {
        if (!value) return console.error('No dropdown value');
        setSearchType(value as SearchTypeValues);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 offset-md-2">
                    <InputGroup size="lg">
                        <FormControl
                            placeholder="Title, ISBN, ID, or Author"
                            aria-label="Title, ISBN, ID, or Author"
                            aria-describedby="basic-addon2"
                            defaultValue={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                        />
                        <DropdownButton
                            as={InputGroup.Append}
                            variant="primary"
                            title={searchType.toUpperCase()}
                            id="input-group-dropdown-2"
                            style={{ minWidth: 100 }}
                            onSelect={handleDropdownSelect}
                            defaultValue={"title"}
                        >
                            <Dropdown.Item eventKey={SearchTypes.TITLE}>Title</Dropdown.Item>
                            <Dropdown.Item eventKey={SearchTypes.ISBN}>ISBN</Dropdown.Item>
                            <Dropdown.Item eventKey={SearchTypes.ID}>ID</Dropdown.Item>
                            <Dropdown.Item eventKey={SearchTypes.AUTHOR}>Author</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                </div>
                <div className="col-12 col-md-3 mt-3 mt-md-0">
                    <p className="lead">
                        <button
                            className="btn btn-primary btn-lg w-100"
                            onClick={handleSearchClick}
                        >Search</button>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default SearchInput;