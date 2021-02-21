import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import SearchInput from '../../components/SearchInput';
import Results from './Results';
import { Book, SearchParams, SearchTypeValues } from "../../types";
import "./index.scss";
import { searchForBook } from '../../api/bookApi';

const Search = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [noResultsFound, setNoResultsFound] = useState<boolean>(false);
    const params: SearchParams = useParams();
    const { searchString, searchType } = params;

    useEffect(() => {
        if (searchString && searchType) {
            searchForBook(searchString, searchType)
                .then((results: Book[]) => {
                    if (results.length) {
                        setBooks(results);
                        return;
                    }
                    setNoResultsFound(true);
                });
        }
    }, [searchString, searchType])

    const handleNoneRoutingSearch = (searchString: string, searchType: SearchTypeValues) => {
        searchForBook(searchString, searchType)
            .then((results: Book[]) => {
                if (results.length) {
                    setBooks(results);
                    setNoResultsFound(false);
                    return;
                }
                setNoResultsFound(true);
            });
    }

    const resultsSection = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-10 offset-md-1">
                    {noResultsFound ? <h3 className="text-danger">No results found</h3> : <Results books={books} />}
                </div>
            </div>
        </div>
    )

    return (
        <div className="search-results-wrapper">
            <div className="jumbotron">
                <h1 className="display-4 mb-4 text-center">Search</h1>
                <SearchInput
                    prefilledSearchString={searchString}
                    prefilledSearchType={searchType}
                    handleNoneRoutingSearch={handleNoneRoutingSearch}
                />
            </div>
            {resultsSection()}
        </div>
    )
}

export default Search;