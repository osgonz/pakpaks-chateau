import { useState, useEffect, useMemo } from 'react';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { DMLog } from '../data/Types';
import { useServicePlayerLogs } from "../hooks/useCharacterLog"
import { useDMLogs } from "../hooks/useDMLog";
import { useSearchBarSearchParams } from "../hooks/useSearchParams";
import { useAuth } from '../components/shared/AuthContext';
import BreadcrumbsMenu from '../components/shared/BreadcrumbsMenu';
import DMLogTable from '../components/dm-logs/DMLogTable';

const DMLogHome = () => {
    // Auth context loading reference
    const { isLoading } = useAuth();
    // Logs details
    const loadedDMLogs = useDMLogs();
    const loadedServiceLogs = useServicePlayerLogs();
    const [logs, setLogs] = useState<DMLog[] | undefined>();

    // Variables storing filters
    const { searchValue, setSearchValue } = useSearchBarSearchParams();

    // Object containing a subset of filtered logs
    const filteredLogs = useMemo(
        () => searchValue === "" ? logs?.slice() : logs?.slice().filter((log) => {
            let sanitizedSearch = searchValue.toLowerCase().replace(/\s+/g, "");

            return log.title.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || log.location.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || log.description?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch);
        }),
        [logs, searchValue]
    );

    // Variable containing the amount of unspent service hours
    const currentServiceHours = useMemo(
        () => {
            let totalServiceHours = 0;

            logs?.forEach(l => totalServiceHours += l.serviceHours);
            loadedServiceLogs?.forEach(l => totalServiceHours += l.serviceHours);

            return totalServiceHours;
        },
        [logs, loadedServiceLogs]
    );

    // Helper function used to refresh data following a log deletion
    const handleRemoveLogByIndex = (index: number) => {
        let splicedLogs = [...(logs as DMLog[])];
        splicedLogs.splice(index, 1);
        setLogs(splicedLogs);
    };

    useEffect(() => {
        setLogs(loadedDMLogs);
    }, [loadedDMLogs]);

    return (
        <>
            { !isLoading && filteredLogs && loadedServiceLogs ? (
                <>
                    <Container maxWidth="lg">
                        <BreadcrumbsMenu 
                            currentPageTitle="DM Logs"
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
                                        DM Logs
                                    </Typography>
                                </Grid>
                                <Grid alignItems="center" justifyContent="flex-end" rowSpacing={1} container item xs={12}>
                                    <Grid item lg={2.5} md={3} sm={4} xs={6}>
                                        <Typography gutterBottom>
                                            <b>Current Service Hours:</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={5} md={4.5} sm={8} xs={6} sx={{ pl: 1 }}>
                                        <Typography gutterBottom>
                                            { currentServiceHours }
                                        </Typography>
                                    </Grid>
                                    <Grid item md={4.5} xs={12}>
                                        <Button 
                                            component={Link}
                                            to={`/dm-logs/new`}
                                            variant="outlined"
                                            fullWidth
                                        >
                                            Add DM Log
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sx={{ pb: '0.35em' }}>
                                    <TextField
                                        id="dm-log-search"
                                        label="Search"
                                        onChange={e => setSearchValue(e.target.value)}
                                        placeholder="Search by Title, Location or Description"
                                        value={searchValue}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><Icon>search</Icon></InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <DMLogTable
                                    logs={filteredLogs}
                                    handleRemoveLogByIndex={handleRemoveLogByIndex}
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