interface BookActivitySearchBoxProps {
    handleValueChange: (event: string) => void;
    handleSearchClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BookActivitySearchBox = ({ handleValueChange, handleSearchClick }: BookActivitySearchBoxProps) => {
    return (
        <div className="input-group input-group-lg mb-3 col-12 col-md-6 pl-0">
            <input onChange={e => handleValueChange(e.target.value)} type="text" className="form-control" placeholder="Book ID" aria-label="Book ID" />
            <div className="input-group-append">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleSearchClick}
                >Search</button>
            </div>
        </div>
    )
}

export default BookActivitySearchBox;