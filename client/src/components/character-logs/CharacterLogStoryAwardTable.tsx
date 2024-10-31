import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { StoryAward } from "../../data/Types";

interface CharacterLogStoryAwardTableProps {
    storyAwards: StoryAward[] | undefined | null
};

const CharacterLogStoryAwardTable = (props: CharacterLogStoryAwardTableProps) => {
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Story Awards
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Story Awards... coming soon...</Typography>
            </Grid>
        </>
    );
};

export default CharacterLogStoryAwardTable;