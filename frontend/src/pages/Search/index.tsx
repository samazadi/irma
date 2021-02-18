import { useParams } from "react-router-dom";
import SearchInput from '../../components/SearchInput';
import Results from './Results';
import { SearchParams } from "../../types";
import "./index.scss";

const Search = () => {
    const params: SearchParams = useParams();
    const { searchString, searchType } = params;

    return (
        <div className="search-results-wrapper">
            <div className="jumbotron">
                <h1 className="display-4 mb-4 text-center">Search</h1>
                <SearchInput prefilledSearchString={searchString} prefilledSearchType={searchType} />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-10 offset-md-1">
                        <h3 className="text-center mb-3">Results</h3>
                        <Results />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;