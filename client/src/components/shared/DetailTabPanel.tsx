import { ReactNode } from "react";
import Grid from '@mui/material/Grid';

interface DetailTabPanelProps {
    children?: ReactNode;
    index: number;
    tabName: string;
    value: number;
};

const DetailTabPanel = (props: DetailTabPanelProps) => {
    const { children, value, index, tabName, ...other } = props;

    return (
        <Grid
            container
            item
            role="tabpanel"
            hidden={value != index}
            id={`${tabName}-tabpanel`}
            aria-labelledby={`${tabName}-tab`}
            justifyContent="center" 
            rowSpacing={2}
            columnSpacing={1}
            sx={{
                mr: "auto",
            }}
            {...other}
        >
            { value === index && (
                children
            )}
        </Grid>
    );
};

export default DetailTabPanel;