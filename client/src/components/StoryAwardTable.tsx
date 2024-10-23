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
import { StoryAwardStatusDictionary } from '../data/Dictionaries';
import { Order, SortableTableHeadCell, StoryAward, StoryAwardRow } from '../data/Types';
import EnhancedTablePaginationActions from './EnhancedTablePaginationActions';
import SortableTableHead, { getSortComparator } from './SortableTableHead';

interface StoryAwardTableProps {
    storyAwards: StoryAwardRow[],
};

const StoryAwardTable = (props: StoryAwardTableProps) => {
    // Table's current sort direction
    const [order, setOrder] = useState<Order>('asc');
    // Attribute name used to sort the table
    const [orderBy, setOrderBy] = useState<keyof StoryAward>('name');
    // Current page number
    const [page, setPage] = useState(0);
    // Number of records showed per page
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Story awards
    const { storyAwards } = props;

    // Object containing subset of records being shown in table
    const visibleRows = useMemo(
        () => storyAwards.slice().sort(getSortComparator(order, orderBy)).slice(
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
            id: 'status',
            label: 'Current Status',
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
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - storyAwards.length) : 0;

    // Helper function triggered when sorting attributes are changed
    const handleRequestSort = (_: React.MouseEvent<unknown>, property: keyof any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property as keyof StoryAward);
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
            <Table sx={{ minWidth: 650 }} size="medium" aria-label="Story Awards table">
                <SortableTableHead 
                    headCells={headCells}
                    order={order}
                    orderBy={orderBy as string}
                    onRequestSort={handleRequestSort}
                    rowCount={storyAwards.length}
                />
                <TableBody>
                { visibleRows.map((award) => (
                    <TableRow key={award.id}>
                        <TableCell component="th" scope="row">
                            {award.name}
                        </TableCell>
                        <TableCell>{StoryAwardStatusDictionary.get(award.status)}</TableCell>
                        <TableCell>{award.originLogTitle}</TableCell>
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
                            count={storyAwards.length}
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

export default StoryAwardTable;