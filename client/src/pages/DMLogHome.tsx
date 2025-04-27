import { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { DMLog } from '../data/Types';
import BreadcrumbsMenu from '../components/shared/BreadcrumbsMenu';
import DMLogTable from '../components/dm-logs/DMLogTable';
import { useDMLogs } from "../hooks/useDMLog";

const DMLogHome = () => {
    // Logs details
    const loadedLogs = useDMLogs();
    const [logs, setLogs] = useState<DMLog[] | undefined>();

    // Helper function used to refresh data following a log deletion
    const handleRemoveLogByIndex = (index: number) => {
        let splicedLogs = [...(logs as DMLog[])];
        splicedLogs.splice(index, 1);
        setLogs(splicedLogs);
    };

    useEffect(() => {
        setLogs(loadedLogs);
    }, [loadedLogs]);

    return (
        <>
            { logs ? (
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
                                <Grid justifyContent="flex-end" container item xs={12}>
                                    <Grid item md={4.5} xs={12} sx={{ pb: '0.35em' }}>
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
                                <DMLogTable
                                    logs={logs}
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