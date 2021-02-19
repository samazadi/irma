// returns page. This page will contain the ability to:
// - Update a book (change state of that book to `available` from `borrowed`)
import { useState } from 'react';
import "./index.scss";

const Returns = () => {
    const [bookId, setBookId] = useState<string>("");

    const handleReturn = () => {
        if (!bookId) return;
    }

    return (
        <div className="container">
            <div className="row vh-100">
                <div className="col-12 my-auto text-center">
                    <h1 className="display-4">Return a Book</h1>
                    <p className="mb-4">Enter the ID of your book (you can find this on the spine of your book)</p>
                    <div className="form-group col-4 mx-auto">
                        <input
                            type="text"
                            placeholder="Book ID"
                            className="form-control form-control-lg"
                            onChange={e => setBookId(e.target.value)}
                        />
                        <p className="text-danger">Something went wrong!</p>
                        <p className="text-success">All done!</p>
                    </div>
                    <div className="form-group col-4 mx-auto">
                        <button
                            onClick={handleReturn}
                            className="btn btn-primary btn-lg w-100"
                        >Return</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Returns;