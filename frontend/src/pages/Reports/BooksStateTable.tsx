import MaterialTable from 'material-table';
import { Book } from '../../types';
import { getMaterialTableIcons } from '../../utils';

const data: Book[] = [
    { id: 'Mehmet', title: 'Baran', author: 'some authior', isbn: 'someisbn', description: "asdfa", status: "available" },
]

const BooksStateTable = () => {
    return (
        <div className="shadow mt-3">
            <MaterialTable
                columns={[
                    { title: 'ID', field: 'id' },
                    { title: 'Title', field: 'title' },
                    { title: 'Author', field: 'author' },
                    { title: 'ISBN', field: 'isbn' },
                    { title: 'Description', field: 'description' },
                    { title: 'Status', field: 'status' }
                ]}
                data={data}
                title="Current State of all Books"
                icons={getMaterialTableIcons()}
            />
        </div>
    )
}

export default BooksStateTable;