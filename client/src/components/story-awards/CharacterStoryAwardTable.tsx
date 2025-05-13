import axios from 'axios';
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
import { Link } from "react-router-dom";
import { StoryAwardStatusDictionary } from '../../data/Dictionaries';
import { SortableTableHeadCell, StoryAward, StoryAwardRow } from '../../data/Types';
import { useTableSearchParams } from '../../hooks/useSearchParams';
import DeleteConfirmationDialog from '../shared/DeleteConfirmationDialog';
import EnhancedTablePaginationActions from '../shared/EnhancedTablePaginationActions';
import SortableTableHead, { getSortComparator } from '../shared/SortableTableHead';

interface CharacterStoryAwardTableProps {
    storyAwards: StoryAwardRow[],
    handleRemoveStoryAwardByIndex: (index: number) => void,
};

const CharacterStoryAwardTable = (props: CharacterStoryAwardTableProps) => {
    // Order, sort, page and rows per page details
    const { order, sort, setOrderSort, page, setPage, rows, setRows } = useTableSearchParams(['name', 'status']);
    // Flag used to display Story Award Delete dialog
    const [deleteOpen, setDeleteOpen] = useState(false);
    // Item currently set for deletion
    const [itemToBeDeleted, setItemToBeDeleted] = useState<StoryAward | null>(null);

    // Story awards
    const { storyAwards } = props;

    // Object containing subset of records being shown in table
    const visibleRows = useMemo(
        () => storyAwards.slice().sort(getSortComparator(order, sort as keyof StoryAward)).slice(
            page * rows,
            page * rows + rows,
        ),
        [storyAwards, order, sort, page, rows]
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
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rows - storyAwards.length) : 0;

    // Helper function triggered when sorting attributes are changed
    const handleRequestSort = (_: React.MouseEvent<unknown>, property: keyof any) => {
        const isAsc = sort === property && order === 'asc';
        setOrderSort(isAsc, property as keyof StoryAward);
    };

    // Helper function triggered when table page is changed
    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    // Helper function triggered when number of rows per page is changed
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRows(parseInt(event.target.value, 10));
    };

    // Helper function triggered when attempting to Delete a Story Award
    const handleDeleteOpen = (item: StoryAwardRow) => {
        setItemToBeDeleted(item);
        setDeleteOpen(true);
    };

    // Helper function triggered when closing the Delete Story Award Confirmation dialog
    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setItemToBeDeleted(null);
    };

    // Function used to delete a story award following confirmation
    const deleteStoryAward = async() => {
        await axios.delete(`/api/characters/${itemToBeDeleted?.characterId}/story-awards/${itemToBeDeleted?.id}`);
        props.handleRemoveStoryAwardByIndex(storyAwards.findIndex((item) => item.id === itemToBeDeleted?.id));
        handleDeleteClose();
    };

    return (
        <>
            <TableContainer component={Paper} elevation={3}>
                <Table sx={{ minWidth: 650 }} size="medium" aria-label="Story Awards table">
                    <SortableTableHead 
                        headCells={headCells}
                        order={order}
                        orderBy={sort}
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
                                <IconButton 
                                    id={`view-${award.id}`}
                                    aria-label={`View ${award.name}`}
                                    color="primary"
                                    component={Link}
                                    to={`/characters/${award.characterId}/story-awards/${award.id}`}
                                >
                                    <Icon>visibility</Icon>
                                </IconButton>
                                <IconButton 
                                    id={`edit-${award.id}`}
                                    aria-label={`Edit ${award.name}`}
                                    color="primary"
                                    component={Link}
                                    to={`/characters/${award.characterId}/story-awards/${award.id}/edit`}
                                >
                                    <Icon>edit</Icon>
                                </IconButton>
                                <IconButton 
                                    id={`delete-${award.id}`}
                                    aria-label={`Delete ${award.name}`}
                                    color="error"
                                    onClick={() => handleDeleteOpen(award)}
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
                                count={storyAwards.length}
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
                entityTypeToDelete='Story Award'
                confirmationDialogText={`You are deleting a story award titled '${itemToBeDeleted?.name }'. You will not be able to recover this data.`}
                deleteFunction={deleteStoryAward}
            />
        </>
    );
};

export default CharacterStoryAwardTable;