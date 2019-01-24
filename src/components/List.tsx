import {
    Checkbox,
    createStyles,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    withStyles
} from '@material-ui/core';
import React from 'react';
import {view} from 'react-easy-state';
import model, {Model} from '../model';
import {Item, ListComponentProps, ListComponentState, ListTypes, SheetActions} from '../typings';
import Dialog from './Dialog';
import Sheet from './Sheet';

const styles = () =>
    createStyles({
        list: {
            backgroundColor: 'white',
            maxHeight: 'calc(100vh - 137px)',
            overflowY: 'auto',
            padding: 0
        },
        secondaryAction: {
            position: 'inherit',
            transform: 'none'
        },
        checkbox: {
            padding: 6
        }
    });

class ListComponent extends React.Component<ListComponentProps<typeof styles>, ListComponentState> {
    private listType: string;
    private model: Model;
    state = {
        sheetOpened: -1,
        dialogState: {
            opened: false,
            id: -1,
            value: ''
        }
    };

    constructor(props: ListComponentProps<typeof styles>) {
        super(props);
        this.model = model as unknown as Model;
        this.listType = this.props.type;
    }

    render() {
        const {classes} = this.props;
        const list = this.model.getAllItems()
            .filter((item: Item) => {
                switch (this.listType) {
                    case ListTypes.ALL:
                        return true;
                    case ListTypes.ACTIVE:
                        return !item.completed;
                    case ListTypes.COMPLETED:
                        return item.completed;
                    case ListTypes.NONE:
                    default:
                        return false;
                }
            })
            .map((item: Item) => (
                <ListItem button key={item.id} onClick={(e) => {
                    if ((e.target as any).nodeName !== 'INPUT') {
                        this.setState({sheetOpened: item.id});
                    }
                }}>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <input type="checkbox"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <span className="label">Test</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div className="animation-square"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <img src="favicon.ico"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ListItem>
            ));
        return (
            <div>
                <List className={classes.list}>
                    {list}
                </List>
                <Sheet opened={this.state.sheetOpened} handleClose={this.handleSheetClose}/>
                <Dialog title="Edit Item"
                        opened={this.state.dialogState.opened}
                        id={this.state.dialogState.id}
                        defaultValue={this.state.dialogState.value}
                        handleClose={this.handleDialogClose}/>
            </div>
        );
    }

    handleSheetClose = (action: SheetActions, id: number) => {
        this.setState({sheetOpened: -1});
        const item = this.model.getItem(id);
        if (!item) {
            return;
        }
        switch (action) {
            case SheetActions.EDIT:
                this.setState({
                    dialogState: {
                        opened: true,
                        id: id,
                        value: item.title
                    }
                });
                break;
            case SheetActions.DELETE:
                this.model.deleteItem(id);
                break;
            case SheetActions.CANCEL:
            default:
                break;
        }
    };

    private handleDialogClose = (value: string = '', id: number = -2) => {
        this.setState({
            dialogState: {
                opened: false,
                id: -1,
                value: ''
            }
        });
        const item = this.model.getItem(id);
        const title = value.trim();
        if (!item || item.title === title || title.length === 0) {
            return;
        }
        this.model.updateItem(id, {title});
    };
}

export default withStyles(styles)(view(ListComponent));