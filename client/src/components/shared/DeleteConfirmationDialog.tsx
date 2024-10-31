import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DeleteConfirmationDialogProps {
    open: boolean,
    handleClose: () => void,
    entityTypeToDelete: string,
    confirmationDialogText: string,
    deleteFunction: () => Promise<void>,
};

const DeleteConfirmationDialog = (props: DeleteConfirmationDialogProps) => {
    const handleDeleteConfirmation = async () => {
        await props.deleteFunction();
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {`Delete ${props.entityTypeToDelete}?`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.confirmationDialogText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={handleDeleteConfirmation} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;