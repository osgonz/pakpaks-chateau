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
import { ItemRarityDictionary } from '../../data/Dictionaries';
import { MagicItem, MagicItemRow, Order, SortableTableHeadCell } from "../../data/Types";
import CharacterLogMagicItemDialog from './CharacterLogMagicItemDialog';
import DeleteConfirmationDialog from '../shared/DeleteConfirmationDialog';
import EnhancedTablePaginationActions from '../shared/EnhancedTablePaginationActions';
import SortableTableHead, { getMagicItemSortComparator } from '../shared/SortableTableHead';

interface CharacterLogMagicItemTableProps {
    magicItems: MagicItem[],
    magicItemsToAdd: MagicItem[],
    characterMagicItems: MagicItemRow[],
    hasEarned: boolean,
    isViewing: boolean,
    handleRemoveMagicItemByIndex: (index: number) => void,
    handleAddMagicItem: (newItem: MagicItem) => void,
    handleRemoveUnsavedMagicItemByIndex: (index: number) => void,
};

const CharacterLogMagicItemTable = (props: CharacterLogMagicItemTableProps) => {
    // Table's current sort direction
    const [order, setOrder] = useState<Order>('asc');
    // Attribute name used to sort the table
    const [orderBy, setOrderBy] = useState<keyof MagicItem>('name');
    // Current page number
    const [page, setPage] = useState(0);
    // Number of records showed per page
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // Flag used to display Magic Item Delete dialog
    const [deleteOpen, setDeleteOpen] = useState(false);
    // Item currently set for deletion
    const [itemToBeDeleted, setItemToBeDeleted] = useState<MagicItem | null>(null);
    // Flag used to display Magic Item dialog
    const [magicItemOpen, setMagicItemOpen] = useState(false);
    // Item currently set for viewing
    const [itemToBeViewed, setItemToBeViewed] = useState<MagicItem | null>(null);

    // Destructuring props
    const { magicItems, magicItemsToAdd, characterMagicItems, hasEarned, isViewing } = props;

    // Object containing subset of records being shown in table
    const visibleRows = useMemo(
        () => [...(magicItemsToAdd.map((item, index) => {
            return {
                ...item,
                id: `#${index}`
            }
        })), ...(magicItems.slice())].sort(getMagicItemSortComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [magicItems, magicItemsToAdd, order, orderBy, page, rowsPerPage]
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
        setOrderBy(property as keyof MagicItem);
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

    // Helper function triggered when attempting to Delete a Magic Item
    const handleDeleteOpen = (item: MagicItem) => {
        setItemToBeDeleted(item);
        setDeleteOpen(true);
    };

    // Helper function triggered when closing the Delete Magic Item Confirmation dialog
    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setItemToBeDeleted(null);
    };

    // Helper function triggered when attempting to Delete a Magic Item
    const handleMagicItemOpen = (item: MagicItem | null) => {
        setItemToBeViewed(item);
        setMagicItemOpen(true);
    };

    // Helper function triggered when closing the Delete Magic Item Confirmation dialog
    const handleMagicItemClose = () => {
        setMagicItemOpen(false);
        setItemToBeViewed(null);
    };

    const addMagicItem = async(newItem: MagicItem) => {
        props.handleAddMagicItem(newItem);
    }

    // Function used to remove a magic item following confirmation
    const removeMagicItem = async() => {
        if (itemToBeDeleted?.id.charAt(0) === '#'){
            props.handleRemoveUnsavedMagicItemByIndex(parseInt(itemToBeDeleted?.id.slice(1)));
        } else {
            props.handleRemoveMagicItemByIndex(magicItems.findIndex((item) => item.id === itemToBeDeleted?.id));
        }
        handleDeleteClose();
    };

    return (
        <>
            <Grid item xs={isViewing ? 12 : 10}>
                <Typography variant="h5" component="h3" gutterBottom>
                    {`${hasEarned ? 'Earned' : 'Lost'} Magic Items`}
                </Typography>
            </Grid>
            { !isViewing &&
                <Grid item xs={2}>
                    <Button 
                        variant="text"
                        onClick={() => handleMagicItemOpen(null)}
                        fullWidth
                    >
                        Add
                    </Button>
                </Grid>
            }
            { (magicItems.length + magicItemsToAdd.length) > 0 &&
                <Grid item xs={12}>
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
                                    <TableCell align="center">
                                        <IconButton 
                                            id={`view-${item.id}`}
                                            aria-label={`View ${item.flavorName ? `${item.flavorName} (${item.name})` : item.name}`}
                                            color="primary"
                                            onClick={() => handleMagicItemOpen(item)}
                                        >
                                            <Icon>visibility</Icon>
                                        </IconButton>
                                        { !isViewing &&
                                            <IconButton 
                                                id={`delete-${item.id}`}
                                                aria-label={`Delete ${item.flavorName ? `${item.flavorName} (${item.name})` : item.name}`}
                                                color="error"
                                                onClick={() => handleDeleteOpen(item)}
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
                                        count={magicItems.length + magicItemsToAdd.length}
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
                        confirmationDialogText={`You are removing ${hasEarned ? 'an earned' : 'a lost'} magic item titled '${itemToBeDeleted?.flavorName ? `${itemToBeDeleted.flavorName} (${itemToBeDeleted.name})` : itemToBeDeleted?.name }'. Once you save, you will not be able to recover this data.`}
                        deleteFunction={removeMagicItem}
                    />
                </Grid>
            }
            <CharacterLogMagicItemDialog
                open={magicItemOpen}
                handleClose={handleMagicItemClose}
                characterMagicItems={characterMagicItems}
                currentMagicItem={itemToBeViewed}
                isEarned={hasEarned}
                saveFunction={addMagicItem}
            />
        </>
    );
};

export default CharacterLogMagicItemTable;