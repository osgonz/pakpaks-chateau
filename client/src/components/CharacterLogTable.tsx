import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { CharacterLogTypeDictionary } from '../data/Dictionaries';
import { CharacterLog, CharacterLogRow, Order, SortableTableHeadCell } from '../data/Types';
import EnhancedTablePaginationActions from './EnhancedTablePaginationActions';
import SortableTableHead, { getSortComparator } from './SortableTableHead';
import CharacterLogDialog from './CharacterLogDialog';

interface CharacterLogTableProps {
    characterId: string | undefined,
    characterLogs: CharacterLogRow[],
};

const CharacterLogTable = (props: CharacterLogTableProps) => {
    // Table's current sort direction
    const [order, setOrder] = useState<Order>('desc');
    // Attribute name used to sort the table
    const [orderBy, setOrderBy] = useState<keyof CharacterLog>('timestamp');
    // Current page number
    const [page, setPage] = useState(0);
    // Number of records showed per page
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Flag used to hide/show the Character Log Dialog
    const [logOpen, setLogOpen] = useState(false);

    // Character logs
    const { characterLogs } = props;

    // Object containing subset of records being shown in table
    const visibleRows = useMemo(
        () => characterLogs.slice().sort(getSortComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [order, orderBy, page, rowsPerPage]
    );
    
    // Metadata for table headers
    const headCells: readonly SortableTableHeadCell[] = [
        {
            id: 'timestamp',
            label: 'Date Logged',
            alignment: 'left',
            isSortable: true,
        },
        {
            id: 'title',
            label: 'Title',
            alignment: 'left',
            isSortable: true,
        },
        {
            id: 'type',
            label: 'Type',
            alignment: 'left',
            isSortable: true,
        },
        {
            id: 'levels',
            label: 'Levels',
            alignment: 'right',
            isSortable: true,
        },
        {
            id: 'gold',
            label: 'Gold',
            alignment: 'right',
            isSortable: true,
        },
        {
            id: 'downtime',
            label: 'Downtime',
            alignment: 'right',
            isSortable: true,
        },
        {
            id: 'magicItemNames',
            label: 'Magic Items',
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
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - characterLogs.length) : 0;

    // Helper function triggered when sorting attributes are changed
    const handleRequestSort = (_: React.MouseEvent<unknown>, property: keyof any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property as keyof CharacterLog);
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

    // Helper function triggered when showing Character Log Dialog
    const handleLogDialogOpen = () => {
        setLogOpen(true);
    };

    return (
        <>
            <TableContainer component={Paper} elevation={3}>
                <Table sx={{ minWidth: 650 }} size="medium" aria-label="Character Logs table">
                    <SortableTableHead 
                        headCells={headCells}
                        order={order}
                        orderBy={orderBy as string}
                        onRequestSort={handleRequestSort}
                        rowCount={characterLogs.length}
                    />
                    <TableBody>
                    { visibleRows.map((log) => (
                        <TableRow key={log.id}>
                            <TableCell>{format(log.timestamp, "yyyy-MM-dd HH:mm")}</TableCell>
                            <TableCell component="th" scope="row">
                                {log.title}
                            </TableCell>
                            <TableCell>{CharacterLogTypeDictionary.get(log.type)}</TableCell>
                            <TableCell align="right">{log.levels}</TableCell>
                            <TableCell align="right">{log.gold}</TableCell>
                            <TableCell align="right">{log.downtime}</TableCell>
                            <TableCell>
                                <List>
                                    { log.magicItemNames &&
                                        <ListItem key={log.id+'-items'}>+ {log.magicItemNames}</ListItem>
                                    }
                                    { log.lostMagicItemNames &&
                                        <ListItem key={log.id+'-lostItems'}>- {log.lostMagicItemNames}</ListItem>
                                    }
                                </List>
                            </TableCell>
                            <TableCell align="center">
                                <IconButton color="primary" onClick={handleLogDialogOpen}><Icon>visibility</Icon></IconButton>
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
                                count={characterLogs.length}
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
            <CharacterLogDialog
                characterId={props.characterId}
                open={logOpen}
                setOpen={setLogOpen}
            />
        </>
    );
};

export default CharacterLogTable;