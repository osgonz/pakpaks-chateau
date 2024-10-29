import axios from 'axios';
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
import { Link } from "react-router-dom";
import { CharacterLogTypeDictionary } from '../../data/Dictionaries';
import { CharacterLog, CharacterLogRow, Order, SortableTableHeadCell } from '../../data/Types';
import DeleteConfirmationDialog from '../shared/DeleteConfirmationDialog';
import EnhancedTablePaginationActions from '../shared/EnhancedTablePaginationActions';
import SortableTableHead, { getSortComparator } from '../shared/SortableTableHead';

interface CharacterLogTableProps {
    characterLogs: CharacterLogRow[],
    handleRemoveCharacterLogByIndex: (index: number) => void,
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
    // Flag used to display Character Log Delete dialog
    const [deleteOpen, setDeleteOpen] = useState(false);
    // Log currently set for deletion
    const [logToBeDeleted, setLogToBeDeleted] = useState<CharacterLog | null>(null);

    // Character logs
    const { characterLogs } = props;

    // Object containing subset of records being shown in table
    const visibleRows = useMemo(
        () => characterLogs.slice().sort(getSortComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [characterLogs, order, orderBy, page, rowsPerPage]
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

    // Helper function triggered when attempting to Delete a Character Log
    const handleDeleteOpen = (log: CharacterLogRow) => {
        setLogToBeDeleted(log);
        setDeleteOpen(true);
    };

    // Helper function triggered when closing the Delete Character Log Confirmation dialog
    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setLogToBeDeleted(null);
    };

    // Function used to delete a character log following confirmation
    const deleteCharacterLog = async() => {
        await axios.delete(`/api/characters/${logToBeDeleted?.characterId}/character-logs/${logToBeDeleted?.id}`);
        props.handleRemoveCharacterLogByIndex(characterLogs.findIndex((log) => log.id === logToBeDeleted?.id));
        handleDeleteClose();
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
                                <IconButton 
                                    id={`view-${log.id}`}
                                    aria-label={`View ${log.title}`}
                                    color="primary"
                                    component={Link}
                                    to={`/characters/${log.characterId}/logs/${log.id}`}
                                >
                                    <Icon>visibility</Icon>
                                </IconButton>
                                <IconButton 
                                    id={`edit-${log.id}`}
                                    aria-label={`Edit ${log.title}`}
                                    color="primary"
                                    component={Link}
                                    to={`/characters/${log.characterId}/logs/${log.id}/edit`}
                                >
                                    <Icon>edit</Icon>
                                </IconButton>
                                <IconButton 
                                    id={`delete-${log.id}`}
                                    aria-label={`Delete ${log.title}`}
                                    color="error"
                                    onClick={() => handleDeleteOpen(log)}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
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
            <DeleteConfirmationDialog
                open={deleteOpen}
                handleClose={handleDeleteClose}
                entityTypeToDelete='Character Log'
                confirmationDialogText={`You are deleting a log titled '${logToBeDeleted?.title}'. You will not be able to recover this data.`}
                deleteFunction={deleteCharacterLog}
            />
        </>
    );
};

export default CharacterLogTable;