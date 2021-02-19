import { Icons } from "material-table";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

export const getMaterialTableIcons = () => {
    const tableIcons: Icons = {
        Add: forwardRef((props, ref) => <AddBox {...props as any} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props as any} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props as any} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props as any} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props as any} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props as any} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props as any} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props as any} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props as any} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props as any} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props as any} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props as any} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props as any} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props as any} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props as any} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props as any} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props as any} ref={ref} />)
    };

    return tableIcons;
}