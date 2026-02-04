import { useState, useEffect } from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import { MagicItemGeneralRow } from '../data/Types';
import BreadcrumbsMenu from '../components/shared/BreadcrumbsMenu';
import MagicItemTable from '../components/magic-items/MagicItemTable';
import { useMagicItems } from "../hooks/useMagicItem";

const DMLogHome = () => {
    // Magic Items details
    const loadedItems = useMagicItems();
    const [items, setItems] = useState<MagicItemGeneralRow[] | undefined>();

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
            { items ? (
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
                                <MagicItemTable
                                    magicItems={items}
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