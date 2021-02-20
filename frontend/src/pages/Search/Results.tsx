import MaterialTable from 'material-table';
import { Book } from '../../types';
import { getMaterialTableIcons } from '../../utils';

interface BooksStateTableProps {
    books: Book[];
    handlePageChange: () => void;
}

const Results = ({ books, handlePageChange }: BooksStateTableProps) => {
    return (
        <div className="shadow mt-3">
            <MaterialTable
                columns={[
                    { title: 'ID', field: 'id' },
                    { title: 'Title', field: 'title' },
                    { title: 'Author', field: 'author' },
                    { title: 'ISBN', field: 'isbn' },
                    { title: 'Description', field: 'description', cellStyle: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 350} },
                ]}
                data={books}
                title="Results"
                icons={getMaterialTableIcons()}
                onChangePage={() => handlePageChange()}
                options={{
                    pageSizeOptions: [],
                    showFirstLastPageButtons: false,
                    search: false
                }}
            />
        </div>
    )
}

export default Results;