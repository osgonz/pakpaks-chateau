import axios from 'axios';
import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import Grid from '@mui/material/Grid';
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";
import { CharacterLogTypeDictionary } from '../../data/Dictionaries';
import { CharacterLog, CharacterLogRow, SortableTableHeadCell } from '../../data/Types';
import { useTableSearchParams } from '../../hooks/useSearchParams';
import DeleteConfirmationDialog from '../shared/DeleteConfirmationDialog';
import EnhancedTablePaginationActions from '../shared/EnhancedTablePaginationActions';
import ExpandableTableRow from '../shared/ExpandableTableRow';
import SortableTableHead, { getSortComparator } from '../shared/SortableTableHead';

interface CharacterLogTableProps {
    characterLogs: CharacterLogRow[],
    handleRemoveCharacterLogByIndex: (index: number) => void,
};

const CharacterLogTable = (props: CharacterLogTableProps) => {
    // Order, sort, page and rows per page details
    const { order, sort, setOrderSort, page, setPage, rows, setRows } = useTableSearchParams(['timestamp', 'title', 'type', 'levels', 'gold', 'downtime']);
    // Flag used to display Character Log Delete dialog
    const [deleteOpen, setDeleteOpen] = useState(false);
    // Log currently set for deletion
    const [logToBeDeleted, setLogToBeDeleted] = useState<CharacterLog | null>(null);

    // Character logs
    const { characterLogs } = props;

    // Object containing subset of records being shown in table
    const visibleRows = useMemo(
        () => characterLogs.slice().sort(getSortComparator(order, sort as keyof CharacterLog)).slice(
            page * rows,
            page * rows + rows,
        ),
        [characterLogs, order, sort, page, rows]
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
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rows - characterLogs.length) : 0;

    // Helper function triggered when sorting attributes are changed
    const handleRequestSort = (_: React.MouseEvent<unknown>, property: keyof any) => {
        const isAsc = sort === property && order === 'asc';
        setOrderSort(isAsc, property as keyof CharacterLog);
    };

    // Helper function triggered when table page is changed
    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    // Helper function triggered when number of rows per page is changed
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRows(parseInt(event.target.value, 10));
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
        await axios.delete(`/api/characters/${logToBeDeleted?.characterId}/character-logs/${logToBeDeleted?.id}`, { withCredentials: true });
        props.handleRemoveCharacterLogByIndex(characterLogs.findIndex((log) => log.id === logToBeDeleted?.id));
        handleDeleteClose();
    };

    return (
        <Grid item xs={12}>
            <TableContainer component={Paper} elevation={3}>
                <Table sx={{ minWidth: 650 }} size="medium" aria-label="Character Logs table">
                    <SortableTableHead 
                        headCells={headCells}
                        order={order}
                        orderBy={sort}
                        onRequestSort={handleRequestSort}
                        rowCount={characterLogs.length}
                        isExpandable={true}
                    />
                    <TableBody>
                    { visibleRows.map((log) => (
                        <ExpandableTableRow id={log.id} expandableContent={log.description ?? ''}>
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
                                    <VisibilityIcon />
                                </IconButton>
                                { !!log.isOwner &&
                                    <>
                                        <IconButton 
                                            id={`edit-${log.id}`}
                                            aria-label={`Edit ${log.title}`}
                                            color="primary"
                                            component={Link}
                                            to={`/characters/${log.characterId}/logs/${log.id}/edit`}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton 
                                            id={`delete-${log.id}`}
                                            aria-label={`Delete ${log.title}`}
                                            color="error"
                                            onClick={() => handleDeleteOpen(log)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                }
                            </TableCell>
                        </ExpandableTableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={9} />
                        </TableRow>
                    )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={characterLogs.length}
                                rowsPerPage={rows}
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
        </Grid>
    );
};

export default CharacterLogTable;