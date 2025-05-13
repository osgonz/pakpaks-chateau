import { useSearchParams } from 'react-router-dom';

/**
 * Custom hook that returns the active character tab index and a method to modify it by injecting query params
 * @returns Tab index and method to modify it
 */
export function useCharacterTabSearchParams() {
    // Object representing query params
    const [searchParams, setSearchParams] = useSearchParams();

    let tabValue = 0;
    const tabParam = searchParams.get('tab');

    switch (tabParam) {
        case 'items':
            tabValue = 1;
            break;
        case 'awards':
            tabValue = 2;
            break;
        case 'other':
            tabValue = 3;
            break;
        default:
            break;
    };

    /**
     * Function that updates the tab query parameter
     * @param index Zero-based index of the character tab
     */
    const setTabValue = (index: number) => {
        setSearchParams(prevParams => {
            prevParams.delete('page');
            prevParams.delete('rows');

            switch(index) {
                case 1:
                    prevParams.set('tab', 'items');
                    break;
                case 2:
                    prevParams.set('tab', 'awards');
                    break;
                case 3:
                    prevParams.set('tab', 'other');
                    break;
                default:
                    prevParams.delete('tab');
                    break;
            };

            return prevParams;
        });
    };

    return { tabValue, setTabValue };
}

/**
 * Custom hook that returns a table's page, rows, and methods to modify these by injecting query params
 * @returns Page, rows, and methods to modify them
 */
export function useTableSearchParams() {
    // Object representing query params
    const [searchParams, setSearchParams] = useSearchParams();

    let page = 0;
    let rows = 10;
    const pageParam = searchParams.get('page');
    const rowsParam = searchParams.get('rows');

    if (pageParam) {
        const parsedPage = parseInt(pageParam, 10);
        if (!isNaN(parsedPage) && parsedPage > 1) {
            page = parsedPage - 1;
        }
    }

    if (rowsParam) {
        const parsedRows = parseInt(rowsParam, 10);
        if (!isNaN(parsedRows) && parsedRows > 0) {
            rows = parsedRows;
        }
    }

    /**
     * Function that updates the page query parameter
     * @param page Zero-based index of the page
     */
    const setPage = (page: number) => {
        setSearchParams(prevParams => {
            if (page > 0) {
                prevParams.set('page', (page + 1).toString());
            } else {
                prevParams.delete('page');
            }

            return prevParams;
        });
    };

    /**
     * Function that updates the rows query parameter
     * @param rows Number of rows to display per page
     */
    const setRows = (rows: number) => {
        setSearchParams(prevParams => {
            prevParams.delete('page');
            if (rows > 0 && rows != 10) {
                prevParams.set('rows', rows.toString());
            } else {
                prevParams.delete('rows');
            }

            return prevParams;
        });
    };

    return { page, setPage, rows, setRows };
}