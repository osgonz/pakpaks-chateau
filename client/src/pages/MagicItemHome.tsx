import { useState, useEffect, useMemo } from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { MagicItemGeneralRow } from '../data/Types';
import BreadcrumbsMenu from '../components/shared/BreadcrumbsMenu';
import MagicItemTable from '../components/magic-items/MagicItemTable';
import { useMagicItems } from "../hooks/useMagicItem";

const DMLogHome = () => {
    // Magic Items details
    const loadedItems = useMagicItems();
    const [items, setItems] = useState<MagicItemGeneralRow[] | undefined>();

    // Variables storing
    const [searchValue, setSearchValue] = useState("");

    // Object containing a subset of filtered Magic Items
    const filteredMagicItems = useMemo(
        () => searchValue === "" ? items?.slice() : items?.slice().filter((item) => {
            let sanitizedSearch = searchValue.toLowerCase().replace(/\s+/g, "");

            return item.name.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || item.flavorName?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || item.characterName.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch)
                || item.flavorDescription?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch);
        }),
        [items, searchValue]
    );

    // Helper function used to refresh data following an item deletion
    const handleRemoveItemByIndex = (index: number) => {
        let splicedItems = [...(items as MagicItemGeneralRow[])];
        splicedItems.splice(index, 1);
        setItems(splicedItems);
    };

    useEffect(() => {
        setItems(loadedItems);
    }, [loadedItems]);

    return (
        <>
            { filteredMagicItems ? (
                <>
                    <Container maxWidth="lg">
                        <BreadcrumbsMenu 
                            currentPageTitle="Magic Items"
                        />
                        <Paper 
                            elevation={1}
                            sx={{
                                p: 3 
                            }}
                        >
                            <Grid 
                                container 
                                justifyContent="center" 
                                spacing={2}
                                sx={{
                                    pb: 2,
                                    pr: 4,
                                    ml: "auto",
                                    mr: "auto",

                                }}
                            >
                                <Grid item xs={12}>
                                    <Typography variant="h3" component="h1" gutterBottom textAlign="center">
                                        Magic Items
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="magic-item-search"
                                        label="Search"
                                        onChange={e => setSearchValue(e.target.value)}
                                        placeholder="Search by Item Name, Owner, or Properties"
                                        value={searchValue}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><Icon>search</Icon></InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <MagicItemTable
                                    magicItems={filteredMagicItems}
                                    handleRemoveMagicItemByIndex={handleRemoveItemByIndex}
                                />
                            </Grid>
                        </Paper>
                    </Container>
                </>
            ) : (
                <LinearProgress />
            )}
        </>
    );
};

export default DMLogHome;