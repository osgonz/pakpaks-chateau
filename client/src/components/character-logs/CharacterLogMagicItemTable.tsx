import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { MagicItem } from "../../data/Types";

interface CharacterLogMagicItemTableProps {
    magicItems: MagicItem[] | undefined | null
};

const CharacterLogMagicItemTable = (props: CharacterLogMagicItemTableProps) => {
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Magic Items
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Magic Items... coming soon...</Typography>
            </Grid>
        </>
    );
};

export default CharacterLogMagicItemTable;