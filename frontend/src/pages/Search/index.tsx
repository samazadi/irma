import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import SearchInput from '../../components/SearchInput';
import Results from './Results';
import { SearchParams } from "../../types";
import "./index.scss";

const Search = () => {
    const params: SearchParams = useParams();
    const { searchString, searchType } = params;

    useEffect(() => {
        if (searchString && searchType) {
            console.log("I run any time", searchString, searchType);
        }
    }, [searchString, searchType])

    const handleBookStateNextPage = (): void => {
        // // use last key to fetch new records
        // if (lastEvaluatedKey) {
        //     getBooksAsync(lastEvaluatedKey).then(result => {
        //         setBooks([...books, ...result.Books]);
        //         setLastEvaluatedKey(result.LastEvaluatedKey?.id);
        //     });
        // }
        console.log("handle next page: ")
    }

    return (
        <div className="search-results-wrapper">
            <div className="jumbotron">
                <h1 className="display-4 mb-4 text-center">Search</h1>
                <SearchInput prefilledSearchString={searchString} prefilledSearchType={searchType} />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-10 offset-md-1">
                        <Results books={[]} handlePageChange={handleBookStateNextPage} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;