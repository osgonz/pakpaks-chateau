import { Key } from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { CharacterRow, CharacterSortByOption, MagicItem, Order, SortableTableHeadCell } from '../../data/Types';

/**
 * Generic descending comparator function
 * @param a First element to be compared
 * @param b Second element to be compared
 * @param orderBy Key for attribute elements will be compared on
 * @returns Comparison result (-1, 0 or 1)
 */
export function getDescendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] == null) {
        if (a[orderBy] == null) {
            return 0;
        }
        return -1;
    }
    if (a[orderBy] == null) {
        return 1;
    }
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

/**
 * 
 * @param order Sort direction to be applied
 * @param orderBy Key for attribute elements will be compared on
 * @returns Result of comparator function
 */
export function getSortComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
) : (
    a: { [key in Key]: boolean | number | string | Date | null },
    b: { [key in Key]: boolean | number | string | Date | null },
) => number {
    return order === 'desc'
        ? (a, b) => getDescendingComparator(a, b, orderBy)
        : (a, b) => -getDescendingComparator(a, b, orderBy);
};

/**
 * Descending comparator function for Magic Item name edge case
 * @param a First element to be compared
 * @param b Second element to be compared
 * @param orderBy Key for attribute elements will be compared on
 * @returns Comparison result (-1, 0 or 1)
 */
function getDescendingMagicItemNameComparator(a: MagicItem, b: MagicItem) {
    const nameA = a["flavorName"] ?? a["name"];
    const nameB = b["flavorName"] ?? b["name"];

    if (nameB == null) {
        if (nameA == null) {
            return 0;
        }
        return -1;
    }
    if (nameA == null) {
        return 1;
    }
    if (nameB < nameA) {
        return -1;
    }
    if (nameB > nameA) {
        return 1;
    }
    return 0;
}

/**
 * 
 * @param order Sort direction to be applied
 * @param orderBy Key for attribute elements will be compared on
 * @returns Result of comparator function
 */
export function getMagicItemSortComparator<Key extends keyof MagicItem>(
    order: Order,
    orderBy: Key,
) : (
    a: MagicItem,
    b: MagicItem,
) => number {
    return order === 'desc'
        ? (a, b) => orderBy === "name" ? getDescendingMagicItemNameComparator(a, b) : getDescendingComparator(a, b, orderBy)
        : (a, b) => orderBy === "name" ? -getDescendingMagicItemNameComparator(a, b) : -getDescendingComparator(a, b, orderBy);
};

/**
 * Comparator function for Characters
 * @param sortBy Sort option to be applies
 * @returns Result of comparator function
 */
export function getCharacterSortComparator(
    sortBy: CharacterSortByOption,
) : (
    a: CharacterRow,
    b: CharacterRow,
) => number {
    return sortBy === CharacterSortByOption.LevelAscending || sortBy === CharacterSortByOption.NameAscending
        ? (a, b) => sortBy === CharacterSortByOption.NameAscending ? -getDescendingComparator(a, b, "name") : -getDescendingComparator(a, b, "characterLevel")
        : (a, b) => sortBy === CharacterSortByOption.NameDescending ? getDescendingComparator(a, b, "name") : getDescendingComparator(a, b, "characterLevel");
};

interface SortableTableHeadProps {
    headCells: readonly SortableTableHeadCell[],
    isExpandable?: boolean,
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void,
    order: Order,
    orderBy: string,
    rowCount: number
};

const SortableTableHead = (props: SortableTableHeadProps) => {
    // Variables containing head cell metadata, sorting direction, attribute used for sorting, and reference to helper sorting function
    const { headCells, isExpandable, order, orderBy, onRequestSort } = props;

    // Wrapper for helper sorting function
    const createSortHandler = (property: keyof any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                { isExpandable && (
                    <TableCell />
                )}
                { headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id as Key}
                        align={headCell.alignment}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        { headCell.isSortable ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                { orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                                ) : null }
                            </TableSortLabel>
                        ) : headCell.label
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default SortableTableHead;