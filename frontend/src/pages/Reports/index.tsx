// this page will contain:
// - ability to track changes for a book
// - report that contains the current state of all books
import { useState, useEffect } from 'react';
import BooksStateTable from './BooksStateTable';
import BookActivityLogTable from './BookActivityLogTable';
import BookActivitySearchBox from './BookActivitySearchBox';
import { getBooksAsync } from '../../api/bookApi';
import { Book } from '../../types';

const Reports = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [activityLogData, setActivityLogData] = useState<number[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string>("");

    useEffect(() => {
        getBooksAsync().then(result => {
            setBooks(result.Books);
            if (result?.LastEvaluatedKey?.id) {
                setLastEvaluatedKey(result.LastEvaluatedKey.id);
            }
            console.log(result)
        })
    }, []);

    const handleActivityLogSearch = (): void => {
        if (!searchValue) return;
        setActivityLogData([1]);
    }

    const handleBookStateNextPage = (): void => {
        // use last key to fetch new records
        if (lastEvaluatedKey) {
            getBooksAsync(lastEvaluatedKey).then(result => {
                setBooks([...books, ...result.Books]);
                setLastEvaluatedKey(result.LastEvaluatedKey?.id);
            });
        }
    }

    return (
        <div className="reports-wrapper">
            <div className="container-fluid">
                <div className="row mb-5">
                    <div className="col-12 text-center">
                        <h1 className="display-4 my-4">Reports</h1>
                    </div>
                    <div className="col-12">
                        <BooksStateTable
                            books={books}
                            handlePageChange={handleBookStateNextPage}
                        />
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