// this page will contain:
// - ability to track changes for a book
// - report that contains the current state of all books
import { useState } from 'react';
import BooksStateTable from './BooksStateTable';
import BookActivityLogTable from './BookActivityLogTable';
import BookActivitySearchBox from './BookActivitySearchBox';

const Reports = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [activityLogData, setActivityLogData] = useState<number[]>([]);

    const handleActivityLogSearch = () => {
        if (!searchValue) return;
        console.log("activity log hit", searchValue)
        setActivityLogData([1])
    }

    return (
        <div className="reports-wrapper">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12 text-center">
                        <h1 className="display-4 my-4">Reports</h1>
                    </div>
                    <div className="col-12">
                        <BooksStateTable />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <h3>Activity Log</h3>
                        <p>To get the activities of a book, enter the book ID</p>
                        <BookActivitySearchBox handleValueChange={(val: string) => setSearchValue(val)} handleSearchClick={handleActivityLogSearch} />
                        {activityLogData.length ? <BookActivityLogTable /> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reports;