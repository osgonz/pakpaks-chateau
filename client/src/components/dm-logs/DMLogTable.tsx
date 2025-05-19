import axios from 'axios';
import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import Grid from "@mui/material/Grid";
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
import { Link } from "react-router-dom";
import { DMLog, SortableTableHeadCell } from "../../data/Types";
import { useTableSearchParams } from '../../hooks/useSearchParams';
import DeleteConfirmationDialog from '../shared/DeleteConfirmationDialog';
import EnhancedTablePaginationActions from '../shared/EnhancedTablePaginationActions';
import ExpandableTableRow from '../shared/ExpandableTableRow';
import SortableTableHead, { getSortComparator } from '../shared/SortableTableHead';

interface DMLogTableProps {
    logs: DMLog[],
    handleRemoveLogByIndex: (index: number) => void,
};

const DMLogTable = (props: DMLogTableProps) => {
    // Order, sort, page and rows per page details
    const { order, sort, setOrderSort, page, setPage, rows, setRows } = useTableSearchParams(['timestamp', 'title', 'serviceHours']);
    // Flag used to display DM Log Delete dialog
    const [deleteOpen, setDeleteOpen] = useState(false);
    // Character currently set for deletion
    const [logToBeDeleted, setLogToBeDeleted] = useState<DMLog | null>(null);

    // Character logs
    const { logs } = props;

    // Object containing subset of records being shown in table
    const visibleRows = useMemo(
        () => logs.slice().sort(getSortComparator(order, sort as keyof DMLog)).slice(
            page * rows,
            page * rows + rows,
        ),
        [logs, order, sort, page, rows]
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
            id: 'serviceHours',
            label: 'Service Hours',
            alignment: 'right',
            isSortable: true,
        },
        {
            id: 'actions',
            label: 'Actions',
            alignment: 'center',
            isSortable: false,
        }
    ];

    // Avoid a layout jump when reaching the last page with empty rows
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rows - logs.length) : 0;

    // Helper function triggered when sorting attributes are changed
    const handleRequestSort = (_: React.MouseEvent<unknown>, property: unknown) => {
        const isAsc = sort === property && order === 'asc';
        setOrderSort(isAsc, property as keyof DMLog);
    };

    // Helper function triggered when table page is changed
    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    // Helper function triggered when number of rows per page is changed
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRows(parseInt(event.target.value, 10));
    };

    // Helper function triggered when attempting to Delete a DM Log
    const handleDeleteOpen = (log: DMLog) => {
        setLogToBeDeleted(log);
        setDeleteOpen(true);
    };

    // Helper function triggered when closing the Delete DM Log Confirmation dialog
    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setLogToBeDeleted(null);
    };

    // Function used to delete a log following confirmation
    const deleteLog = async() => {
        await axios.delete(`/api/dm-logs/${logToBeDeleted?.id}`);
        props.handleRemoveLogByIndex(logs!.findIndex((log) => log.id === logToBeDeleted?.id));
        handleDeleteClose();
    };


    return (
        <Grid item xs={12}>
            <TableContainer component={Paper} elevation={3}>
                <Table sx={{ minWidth: 650 }} size="medium" aria-label="DM Logs table">
                    <SortableTableHead 
                        headCells={headCells}
                        order={order}
                        orderBy={sort}
                        onRequestSort={handleRequestSort}
                        rowCount={logs.length}
                        isExpandable={true}
                    />
                    <TableBody>
                    { visibleRows.map((log) => (
                        <ExpandableTableRow id={log.id} expandableContent={log.description ?? ''}>
                            <TableCell>{format(log.timestamp, "yyyy-MM-dd HH:mm")}</TableCell>
                            <TableCell component="th" scope="row">
                                {log.title}
                            </TableCell>
                            <TableCell align="right">{log.serviceHours}</TableCell>
                            <TableCell align="center">
                                <IconButton 
                                    id={`view-${log.id}`}
                                    aria-label={`View ${log.title}`}
                                    color="primary"
                                    component={Link}
                                    to={`/dm-logs/${log.id}`}
                                >
                                    <Icon>visibility</Icon>
                                </IconButton>
                                <IconButton 
                                    id={`edit-${log.id}`}
                                    aria-label={`Edit ${log.title}`}
                                    color="primary"
                                    component={Link}
                                    to={`/dm-logs/${log.id}/edit`}
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
                        </ExpandableTableRow>
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
                                count={logs.length}
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
                entityTypeToDelete='DM Log'
                confirmationDialogText={`You are deleting a DM log titled '${logToBeDeleted?.title}'. You will not be able to recover this data.`}
                deleteFunction={deleteLog}
            />
        </Grid>
    );
};

export default DMLogTable;