import { useState } from 'react';
import { returnOrBorrowBook } from '../../api/bookApi';
import "./index.scss";

const Returns = () => {
    const [bookId, setBookId] = useState<string>("");
    const [bookSuccessfullyReturned, setBookSuccessfullyReturned] = useState<boolean>(false);
    const [bookReturnFailed, setBookReturnFailed] = useState<boolean>(false);

    const handleReturn = () => {
        if (!bookId) return;
        returnOrBorrowBook({ id: bookId, action: "check-in" })
            .then((response: any) => {
                if (response?.code) {
                    console.error(`An error occured: `, { 
                        ...response,
                        probableCause: 'If the book did not exist or was not checked out to begin with, you cant return it'
                    })
                    setBookReturnFailed(true);
                    return;
                }
                setBookSuccessfullyReturned(true)
            })
    }

    return (
        <div className="container">
            <div className="row vh-100">
                <div className="col-12 my-auto text-center">
                    <h1 className="display-4">Return a Book</h1>
                    <p>Enter the ID of your book (you can find this on the spine of your book)</p>
                    <p className="mb-4"><small>i.e aa5b1c95-9e58-443a-b6d9-e04a49d1ea33</small></p>
                    <div className="form-group col-12 col-md-4 mx-auto">
                        <input
                            type="text"
                            placeholder="Book ID"
                            className="form-control form-control-lg"
                            onChange={e => setBookId(e.target.value)}
                        />
                        {bookSuccessfullyReturned && <h3 className="text-success">All done!</h3>}
                        {bookReturnFailed && <h5 className="text-danger">It looks like something wen't wrong with your return... Please try later.</h5>}
                    </div>
                    <div className="form-group col-12 col-md-4 mx-auto">
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