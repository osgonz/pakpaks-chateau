import { Children, Fragment, ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

interface ExpandableTableRowProps {
    children: ReactNode,
    expandableContent: string,
    id: string
};

const ExpandableTableRow = (props: ExpandableTableRowProps) => {
    const { children, expandableContent, id } = props;

    // Flag used to expand the row
    const [open, setOpen] = useState(false);

    return (
        <Fragment key={id}>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="Expand Row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        <Icon>{open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</Icon>
                    </IconButton>
                </TableCell>
                {
                    children
                }
            </TableRow>
            <TableRow>
                <TableCell sx={{ paddingY: 0 }} colSpan={1 + Children.count(children)}>
                    <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                    >
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="body2">{expandableContent}</Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
};

export default ExpandableTableRow;