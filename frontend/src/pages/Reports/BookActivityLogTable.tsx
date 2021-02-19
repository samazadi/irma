import MaterialTable from 'material-table';
import { ActivityRecord } from '../../types';
import { getMaterialTableIcons } from '../../utils';

const data: ActivityRecord[] = [
    { id: '123412', title: 'Baran', isbn: 'someisbn', date: 'Fri, 19 Feb 2021 02:20:36 GMT', action: "check-in" },
]

const BookActivityLogTable = () => {
    return (
        <div className="shadow mt-3">
            <MaterialTable
                columns={[
                    { title: 'ID', field: 'id' },
                    { title: 'Title', field: 'title' },
                    { title: 'ISBN', field: 'isbn' },
                    { title: 'Date', field: 'date' },
                    { title: 'Action', field: 'action' }
                ]}
                data={data}
                title="Activities of a Book"
                icons={getMaterialTableIcons()}
            />
        </div>
    )
}

export default BookActivityLogTable;