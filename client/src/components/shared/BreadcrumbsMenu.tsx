import Breadcrumbs from '@mui/material/Breadcrumbs';
import Icon from '@mui/material/Icon';
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from 'react-router-dom';

interface BreadcrumbsMenuProps {
    characterId?: string,
    characterName?: string,
    currentPageTitle?: string
};

const BreadcrumbsMenu = (props: BreadcrumbsMenuProps) => {
    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            separator={ <Icon>chevron_right</Icon> }
            sx={{
                pt: 1,
                pb: 2

            }}
        >
            <Link
                component={RouterLink}
                underline="hover"
                color="inherit"
                to="/"
            >
                Home
            </Link>
            { props.characterName &&
                <Link
                    component={RouterLink}
                    underline="hover"
                    color="inherit"
                    to={"/characters"}
                >
                    Characters
                </Link>
            }
            { props.characterName &&
                ( props.characterId ?
                    <Link
                        component={RouterLink}
                        underline="hover"
                        color="inherit"
                        to={`/characters/${props.characterId}`}
                    >
                        {props.characterName}
                    </Link>
                :
                    <Typography
                        color="text.primary"
                    >
                        {props.characterName}
                    </Typography>
                )
            }
            { props.currentPageTitle &&
                <Typography
                    color="text.primary"
                >
                    {props.currentPageTitle}
                </Typography>
            }
        </Breadcrumbs>
    );
};

export default BreadcrumbsMenu;