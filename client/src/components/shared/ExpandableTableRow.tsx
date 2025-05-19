import { Children, ReactNode, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Markdown from "./Markdown";

interface ExpandableTableRowProps {
    children: ReactNode,
    expandableContent: string,
    id: string
};

const ExpandableTableRow = (props: ExpandableTableRowProps) => {
    const { children, expandableContent, id } = props;

    // Flag used to expand the row
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [id]);

    return (
        <>
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
                            <Markdown>{expandableContent}</Markdown>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ExpandableTableRow;