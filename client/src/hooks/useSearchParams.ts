import { useSearchParams } from 'react-router-dom';
import { CharacterLogTypeDictionary, ItemRarityDictionary } from '../data/Dictionaries';
import { CharacterLogType, ItemRarity, Order } from '../data/Types';

/**
 * Custom hook that returns a view's search bar value and a method to modify it by injecting query params
 * @returns Search bar value and method to modify it
 */
export function useSearchBarSearchParams() {
    // Object representing query params
    const [searchParams, setSearchParams] = useSearchParams();

    let searchValue = '';
    const searchParam = searchParams.get('search');

    searchValue = searchParam && searchParam.length > 0 ? searchParam : searchValue;

    /**
     * Function that updates the search bar query parameter
     * @param value Search bar string value
     */
    const setSearchValue = (value: string) => {
        setSearchParams(prevParams => {
            prevParams.delete('page');
            value.length > 0 ? prevParams.set('search', value) : prevParams.delete('search');

            return prevParams;
        });
    };

    return { searchValue, setSearchValue }
}

/**
 * Custom hook that returns the active character tab index and a method to modify it by injecting query params
 * @returns Tab index and method to modify it
 */
export function useCharacterTabSearchParams() {
    // Object representing query params
    const [searchParams, setSearchParams] = useSearchParams();

    let tabValue = 0;
    const tabParam = searchParams.get('tab')?.toLowerCase();

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
            prevParams.delete('order');
            prevParams.delete('page');
            prevParams.delete('rows');
            prevParams.delete('sort');

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
 * Custom hook that returns a magic item view's category, attunement, rarities, origins, and methods to modify these by injecting query params
 * @returns Category, attunement, rarities, origins, and methods to modify them
 */
export function useMagicItemSearchParams() {
    // Object representing query params
    const [searchParams, setSearchParams] = useSearchParams();

    let categoryValue = -1;
    let attunementValue= -1;
    let rarities = [] as ItemRarity[];
    let origins = [] as CharacterLogType[];
    const categoryParam = searchParams.get('consumable')?.toLowerCase();
    const attunementParam = searchParams.get('attunement')?.toLowerCase();
    const raritiesParam = searchParams.get('rarities');
    const originsParam = searchParams.get('origins');

    switch (categoryParam) {
        case 'no':
            categoryValue = 0;
            break;
        case 'yes':
            categoryValue = 1;
            break;
        default:
            break;

    };

    switch (attunementParam) {
        case 'no':
            attunementValue = 0;
            break;
        case 'yes':
            attunementValue = 1;
            break;
        default:
            break;
    };

    if (raritiesParam) {
        raritiesParam.split(',').forEach(r => {
            switch (r.toLowerCase()) {
                case 'common':
                    rarities.push(ItemRarity.Common);
                    break;
                case 'uncommon':
                    rarities.push(ItemRarity.Uncommon);
                    break;
                case 'rare':
                    rarities.push(ItemRarity.Rare);
                    break;
                case 'very rare':
                    rarities.push(ItemRarity.VeryRare);
                    break;
                case 'legendary':
                    rarities.push(ItemRarity.Legendary);
                    break;
                case 'artifact':
                    rarities.push(ItemRarity.Artifact);
                    break;
                case 'unique':
                    rarities.push(ItemRarity.Unique);
                    break;
                default:
                    break;
            };
        });
    };

    if (originsParam) {
        originsParam.split(',').forEach(o => {
            switch (o.toLowerCase()) {
                case 'adventure':
                    origins.push(CharacterLogType.Adventure);
                    break;
                case 'merchant':
                    origins.push(CharacterLogType.Merchant);
                    break;
                case 'magic item trade':
                    origins.push(CharacterLogType.Trade);
                    break;
                case 'downtime activity':
                    origins.push(CharacterLogType.Downtime);
                    break;
                case 'dm service award':
                    origins.push(CharacterLogType.ServiceAward);
                    break;
                default:
                    break;
            };
        });
    };

    /**
     * Function that updates the category query parameter
     * @param value Boolean-like number indicating a category (permanent/consumable) filter
     */
    const setCategory = (value: number) => {
        setSearchParams(prevParams => {
            prevParams.delete('page');

            switch (value) {
                case 0:
                    prevParams.set('consumable', 'no');
                    break;
                case 1:
                    prevParams.set('consumable', 'yes');
                    break;
                default:
                    prevParams.delete('consumable');
                    break;
            };

            return prevParams;
        });
    };

    /**
     * Function that updates the attunement query parameter
     * @param value Boolean-like number indicating an attunement filter
     */
    const setAttunement = (value: number) => {
        setSearchParams(prevParams => {
            prevParams.delete('page');

            switch (value) {
                case 0:
                    prevParams.set('attunement', 'no');
                    break;
                case 1:
                    prevParams.set('attunement', 'yes');
                    break;
                default:
                    prevParams.delete('attunement');
                    break;
            };

            return prevParams;
        });
    };

    /**
     * Function that updates the rarities query parameter
     * @param rarities Array of enums representing item rarities to filter by
     */
    const setRarities = (rarities: ItemRarity[]) => {
        setSearchParams(prevParams => {
            prevParams.delete('page');

            let rarityNames = [] as string[];

            rarities.forEach(r => {
                rarityNames.push(ItemRarityDictionary.get(r)!.toLowerCase());
            });

            rarityNames.length > 0 ? prevParams.set('rarities', rarityNames.join(',')) : prevParams.delete('rarities');
            return prevParams;
        });
    };

    /**
     * Function that updates the origins query parameter
     * @param origins Array of enums representing origin log types to filter by
     */
    const setOrigins = (origins: CharacterLogType[]) => {
        setSearchParams(prevParams => {
            prevParams.delete('page');

            let originNames = [] as string[];

            origins.forEach(o => {
                originNames.push(CharacterLogTypeDictionary.get(o)!.toLowerCase());
            });

            originNames.length > 0 ? prevParams.set('origins', originNames.join(',')) : prevParams.delete('origins');
            return prevParams;
        });
    };

    return { categoryValue, setCategory, attunementValue, setAttunement, rarities, setRarities, origins, setOrigins };
}

/**
 * Custom hook that returns a table's order, sort, page, rows, and methods to modify these by injecting query params
 * @returns Order, sort, page, rows, and methods to modify them
 */
export function useTableSearchParams(sortableKeys: string[]) {
    // Object representing query params
    const [searchParams, setSearchParams] = useSearchParams();

    const hasTimestamp = sortableKeys.includes('timestamp');
    let order = hasTimestamp ? 'desc' : 'asc' as Order;
    let page = 0;
    let rows = 10;
    let sort = hasTimestamp ? 'timestamp' : 'name';
    const orderParam = searchParams.get('order')?.toLowerCase();
    const pageParam = searchParams.get('page');
    const rowsParam = searchParams.get('rows');
    const sortParam = searchParams.get('sort');

    if (orderParam as Order) {
        order = orderParam as Order;
    }

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

    if (sortParam && sortableKeys.includes(sortParam)) {
        sort = sortParam;
    }

    /**
     * Function that updates the order and sort query parameters
     * @param isAsc Flag indicating if property is unchanged and currently ordered asc
     * @param property Property key to sort records by
     */
    const setOrderSort = (isAsc: boolean, property: string) => {
        setSearchParams(prevParams => {
            if (isAsc) {
                prevParams.set('order', 'desc');
            } else {
                prevParams.delete('order');
            }

            if (property === (hasTimestamp ? 'timestamp' : 'name')) {
                prevParams.delete('sort');
            } else {
                prevParams.set('sort', property);
            }
            return prevParams;
        });
    };
    
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

    return { page, setPage, rows, setRows, order, sort, setOrderSort };
}