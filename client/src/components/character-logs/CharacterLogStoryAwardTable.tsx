import { useState, useMemo } from 'react';
import Button from "@mui/material/Button";
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
import Typography from "@mui/material/Typography";
import { StoryAwardStatusDictionary } from '../../data/Dictionaries';
import { Order, SortableTableHeadCell, StoryAward } from "../../data/Types";
import CharacterLogStoryAwardDialog from './CharacterLogStoryAwardDialog';
import DeleteConfirmationDialog from '../shared/DeleteConfirmationDialog';
import EnhancedTablePaginationActions from '../shared/EnhancedTablePaginationActions';
import SortableTableHead, { getSortComparator } from '../shared/SortableTableHead';

interface CharacterLogStoryAwardTableProps {
    storyAwards: StoryAward[],
    storyAwardsToAdd: StoryAward[],
    isViewing: boolean,
    handleRemoveStoryAwardByIndex: (index: number) => void,
    handleAddStoryAward: (newAward: StoryAward) => void,
    handleRemoveUnsavedStoryAwardByIndex: (index: number) => void,
};

const CharacterLogStoryAwardTable = (props: CharacterLogStoryAwardTableProps) => {
    // Table's current sort direction
    const [order, setOrder] = useState<Order>('asc');
    // Attribute name used to sort the table
    const [orderBy, setOrderBy] = useState<keyof StoryAward>('name');
    // Current page number
    const [page, setPage] = useState(0);
    // Number of records showed per page
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // Flag used to display Story Award Delete dialog
    const [deleteOpen, setDeleteOpen] = useState(false);
    // Award currently set for deletion
    const [awardToBeDeleted, setAwardToBeDeleted] = useState<StoryAward | null>(null);
    // Flag used to display Story Award dialog
    const [storyAwardOpen, setStoryAwardOpen] = useState(false);
    // Award currently set for viewing
    const [awardToBeViewed, setAwardToBeViewed] = useState<StoryAward | null>(null);

    // Destructuring props
    const { storyAwards, storyAwardsToAdd, isViewing } = props;

    // Object containing subset of records being shown in table
    const visibleRows = useMemo(
        () => [...(storyAwardsToAdd.map((award, index) => {
            return {
                ...award,
                id: `#${index}`
            }
        })), ...(storyAwards.slice())].sort(getSortComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [storyAwards, storyAwardsToAdd, order, orderBy, page, rowsPerPage]
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
            id: 'actions',
            label: 'Actions',
            alignment: 'center',
            isSortable: false,
        }
    ];

    // Avoid a layout jump when reaching the last page with empty rows
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (storyAwards.length + storyAwardsToAdd.length)) : 0;

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

    // Helper function triggered when attempting to Delete a Story Award
    const handleDeleteOpen = (award: StoryAward) => {
        setAwardToBeDeleted(award);
        setDeleteOpen(true);
    };

    // Helper function triggered when closing the Delete Story Award Confirmation dialog
    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setAwardToBeDeleted(null);
    };

    // Helper function triggered when attempting to Delete a Story Award
    const handleStoryAwardOpen = (award: StoryAward | null) => {
        setAwardToBeViewed(award);
        setStoryAwardOpen(true);
    };

    // Helper function triggered when closing the Delete Story Award Confirmation dialog
    const handleStoryAwardClose = () => {
        setStoryAwardOpen(false);
        setAwardToBeViewed(null);
    };

    const addStoryAward = async(newAward: StoryAward) => {
        props.handleAddStoryAward(newAward);
    }

    // Function used to remove a Story Award following confirmation
    const removeStoryAward = async() => {
        if (awardToBeDeleted?.id.charAt(0) === '#'){
            props.handleRemoveUnsavedStoryAwardByIndex(parseInt(awardToBeDeleted?.id.slice(1)));
        } else {
            props.handleRemoveStoryAwardByIndex(storyAwards.findIndex((award) => award.id === awardToBeDeleted?.id));
        }
        handleDeleteClose();
    };
    
    return (
        <>
            <Grid item xs={isViewing ? 12 : 10}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Story Awards
                </Typography>
            </Grid>
            { !isViewing &&
                <Grid item xs={2}>
                    <Button 
                        variant="text"
                        onClick={() => handleStoryAwardOpen(null)}
                        fullWidth
                    >
                        Add
                    </Button>
                </Grid>
            }
            { (storyAwards.length + storyAwardsToAdd.length) > 0 &&
                <Grid item xs={12}>
                    <TableContainer component={Paper} elevation={3}>
                        <Table sx={{ minWidth: 650 }} size="medium" aria-label="Story Awards table">
                            <SortableTableHead 
                                headCells={headCells}
                                order={order}
                                orderBy={orderBy as string}
                                onRequestSort={handleRequestSort}
                                rowCount={storyAwards.length + storyAwardsToAdd.length}
                            />
                            <TableBody>
                            { visibleRows.map((award) => (
                                <TableRow key={award.id}>
                                    <TableCell component="th" scope="row">
                                        {award.name}
                                    </TableCell>
                                    <TableCell>{StoryAwardStatusDictionary.get(award.status)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton 
                                            id={`view-${award.id}`}
                                            aria-label={`View ${award.name}`}
                                            color="primary"
                                            onClick={() => handleStoryAwardOpen(award)}
                                        >
                                            <Icon>visibility</Icon>
                                        </IconButton>
                                        { !isViewing &&
                                            <IconButton 
                                                id={`delete-${award.id}`}
                                                aria-label={`Delete ${award.name}`}
                                                color="error"
                                                onClick={() => handleDeleteOpen(award)}
                                            >
                                                <Icon>delete</Icon>
                                            </IconButton>
                                        }
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
                                        count={storyAwards.length + storyAwardsToAdd.length}
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
                        entityTypeToDelete='Magic Item'
                        confirmationDialogText={`You are removing a story award titled '${awardToBeDeleted?.name}'. Once you save, you will not be able to recover this data.`}
                        deleteFunction={removeStoryAward}
                    />
                </Grid>
            }
            <CharacterLogStoryAwardDialog
                open={storyAwardOpen}
                handleClose={handleStoryAwardClose}
                currentStoryAward={awardToBeViewed}
                saveFunction={addStoryAward}
            />
        </>
    );
};

export default CharacterLogStoryAwardTable;