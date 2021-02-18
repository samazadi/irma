import { useParams } from "react-router-dom";
import SearchInput from '../../components/SearchInput';
import Results from './Results';
import { SearchParams } from "../../types";
import "./index.scss";

const SearchResults = () => {
    const params: SearchParams = useParams();
    const { searchString, searchType } = params;

    return (
        <div className="search-results-wrapper">
            <div className="jumbotron">
                <h1 className="display-4 mb-4 text-center">Search Results</h1>
                <SearchInput />
            </div>
            <Results />
        </div>
    )
}

export default SearchResults;