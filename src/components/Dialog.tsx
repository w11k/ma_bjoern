import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core';
import React from 'react';
import {DialogComponentProps} from '../typings';

class DialogComponent extends React.Component<DialogComponentProps> {
    input: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    handleClose = () => {
        this.props.handleClose((this.input.current || {value: ''}).value, this.props.id);
    };

    render() {
        return (
            <Dialog
                open={this.props.opened}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Create Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        defaultValue={this.props.defaultValue}
                        onKeyUp={(e) => e.keyCode === 13 && this.handleClose()}
                        inputRef={this.input}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default DialogComponent;