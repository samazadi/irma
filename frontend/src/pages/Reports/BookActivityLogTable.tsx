import MaterialTable from 'material-table';
import { Activity } from '../../types';
import { getMaterialTableIcons } from '../../utils';

interface BookActivityLogTableProps {
    activities: Activity[];
}

const BookActivityLogTable = ({ activities }: BookActivityLogTableProps) => {
    return (
        <div className="shadow mt-3">
            <MaterialTable
                columns={[
                    { title: 'Activity ID', field: 'id' },
                    { title: 'Book ID', field: 'bookId' },
                    { title: 'Title', field: 'title' },
                    { title: 'ISBN', field: 'isbn' },
                    { title: 'Date', field: 'date' },
                    { title: 'Action', field: 'action' }
                ]}
                data={activities}
                title="Activities of a Book"
                icons={getMaterialTableIcons()}
                options={{
                    pageSizeOptions: [],
                    showFirstLastPageButtons: false,
                    pageSize: 100,
                    paging: false,
                    search: false
                }}
            />
        </div>
    )
}

export default BookActivityLogTable;