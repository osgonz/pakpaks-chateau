import { useState, useMemo } from 'react';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ItemRarityDictionary } from '../data/Dictionaries';
import { MagicItem, Order, SortableTableHeadCell } from '../data/Types';
import EnhancedTablePaginationActions from './EnhancedTablePaginationActions';
import SortableTableHead, { getSortComparator } from './SortableTableHead';

interface MagicItemTableProps {
    magicItems: MagicItem[],
};

const MagicItemTable = (props: MagicItemTableProps) => {
    // Table's current sort direction
    const [order, setOrder] = useState<Order>('asc');
    // Attribute name used to sort the table
    const [orderBy, setOrderBy] = useState<keyof any>('name');
    // Current page number
    const [page, setPage] = useState(0);
    // Number of records showed per page
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Magic items
    const { magicItems } = props;

    // Object containing subset of records being shown in table
    const visibleRows = useMemo(
        () => magicItems.slice().sort(getSortComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [order, orderBy, page, rowsPerPage]
    );
    
    // Metadata for table headers
    const headCells: readonly SortableTableHeadCell[] = [
        {
            id: 'name',
            label: 'Name',
            alignment: 'left',
            isSortable: true,
        },
        {
            id: 'rarity',
            label: 'Item Rarity',
            alignment: 'left',
            isSortable: true,
        },
        {
            id: 'isConsumable',
            label: 'Category',
            alignment: 'left',
            isSortable: true,
        },
        {
            id: 'requiresAttunement',
            label: 'Attunement',
            alignment: 'left',
            isSortable: true,
        },
        {
            id: 'originLogId',
            label: 'Origin Log',
            alignment: 'left',
            isSortable: false,
        },
        {
            id: 'actions',
            label: 'Actions',
            alignment: 'center',
            isSortable: false,
        }
    ];

    // Avoid a layout jump when reaching the last page with empty rows
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - magicItems.length) : 0;

    // Helper function triggered when sorting attributes are changed
    const handleRequestSort = (_: React.MouseEvent<unknown>, property: keyof any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Helper function triggered when table page is changed
    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    // Helper function triggered when number of rows per page is changed
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 650 }} size="medium" aria-label="Magic Items table">
                <SortableTableHead 
                    headCells={headCells}
                    order={order}
                    orderBy={orderBy as string}
                    onRequestSort={handleRequestSort}
                    rowCount={magicItems.length}
                />
                <TableBody>
                { visibleRows.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                            {item.flavorName ? `${item.flavorName} (${item.name})` : item.name}
                        </TableCell>
                        <TableCell>{ItemRarityDictionary.get(item.rarity)}</TableCell>
                        <TableCell>{item.isConsumable ? 'Consumable' : 'Permanent'}</TableCell>
                        <TableCell>{item.requiresAttunement ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{item.originLogId}</TableCell>
                        <TableCell align="center">
                            <IconButton color="primary"><Icon>visibility</Icon></IconButton>
                            <IconButton color="primary"><Icon>edit</Icon></IconButton>
                            <IconButton color="error"><Icon>delete</Icon></IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={magicItems.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={EnhancedTablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default MagicItemTable;