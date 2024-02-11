import { ReactNode } from "react";
import Grid from '@mui/material/Grid';

interface CharacterDetailTabPanelProps {
    children?: ReactNode;
    index: number;
    tabName: string;
    value: number;
};

const CharacterDetailTabPanel = (props: CharacterDetailTabPanelProps) => {
    const { children, value, index, tabName, ...other } = props;

    return (
        <Grid
            item
            xs={12}
            role="tabpanel"
            hidden={value != index}
            id={`${tabName}-tabpanel`}
            aria-labelledby={`${tabName}-tab`}
            {...other}
        >
            { value === index && (
                children
            )}
        </Grid>
    );
};

export default CharacterDetailTabPanel;