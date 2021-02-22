import MaterialTable from 'material-table';
import { Book } from '../../types';
import { getMaterialTableIcons } from '../../utils';

interface BooksStateTableProps {
    books: Book[];
    handleBorrowBook: (book: any) => void; // had to use type any as workaround for material-table cast
}

const Results = ({ books, handleBorrowBook }: BooksStateTableProps) => {
    return (
        <div className="shadow mt-3">
            <MaterialTable
                columns={[
                    { title: 'ID', field: 'id' },
                    { title: 'Title', field: 'title' },
                    { title: 'Author', field: 'author' },
                    { title: 'ISBN', field: 'isbn' },
                    { title: 'Description', field: 'description', cellStyle: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 350 } },
                ]}
                data={books as any}
                actions={[
                    (rowData: Book) => {
                        return ({
                            icon: () => <button disabled={rowData?.status === "checked-out"} className="btn btn-primary">Borrow</button>,
                            tooltip: 'Borrow',
                            onClick: (event, rowData) => {
                                if (!event.target.classList.contains('disabled')) {
                                    handleBorrowBook(rowData);
                                }
                                event.target.classList.add('disabled');
                            }
                        })
                    }
                ]}
                title="Results"
                icons={getMaterialTableIcons()}
                options={{
                    pageSizeOptions: [],
                    showFirstLastPageButtons: false,
                    search: false,
                    actionsColumnIndex: -1
                }}
            />
        </div>
    )
}

export default Results;