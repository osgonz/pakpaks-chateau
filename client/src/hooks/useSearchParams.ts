import { useSearchParams } from 'react-router-dom';

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