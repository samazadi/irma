import { useState, useEffect } from 'react';
import BooksStateTable from './BooksStateTable';
import BookActivityLogTable from './BookActivityLogTable';
import BookActivitySearchBox from './BookActivitySearchBox';
import { getBookActivities, getBooks } from '../../api/bookApi';
import { Activity, Book } from '../../types';

const Reports = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [books, setBooks] = useState<Book[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);
    
    useEffect(() => {
        getBooks().then(result => {
            setBooks(result.Books);
            if (result?.LastEvaluatedKey?.id) {
                setLastEvaluatedKey(result.LastEvaluatedKey.id);
            }
        })
    }, []);

    const hackyToastAlert = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000);
    }

    const handleActivityLogSearch = (): void => {
        if (!searchValue) return;
        getBookActivities(searchValue).then(result => {
            if (!result.Activities.length) {
                hackyToastAlert();
            }
            setActivities([...activities, ...result.Activities])
        });
    }

    const handleBookStateNextPage = (): void => {
        // use last key to fetch new records
        if (lastEvaluatedKey) {
            getBooks(lastEvaluatedKey).then(result => {
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
                    <div className="col-12 mb-5">
                        <h3>Activity Log</h3>
                        <p>To get the activities of a book, enter the book ID</p>
                        {showToast && <p className="text-danger">No results found...</p>}
                        <BookActivitySearchBox handleValueChange={(val: string) => setSearchValue(val)} handleSearchClick={handleActivityLogSearch} />
                        {activities.length ? <BookActivityLogTable activities={activities} /> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reports;