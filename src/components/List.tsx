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
import {Item, ListComponentProps, ListTypes} from '../typings';

const styles = () =>
    createStyles({
        list: {
            backgroundColor: 'white',
            maxHeight: 'calc(100vh - 137px)',
            overflowY: 'auto'
        },
        secondaryAction: {
            position: 'inherit',
            transform: 'none'
        },
        checkbox: {
            padding: 6
        }
    });

class ListComponent extends React.Component<ListComponentProps<typeof styles>> {
    private listType: string;
    private model: Model;

    constructor(props: ListComponentProps<typeof styles>) {
        super(props);
        this.model = model as unknown as Model;
        this.listType = this.props.type;
        this.state = {
            sheetOpened: -1
        };
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
                    <ListItemSecondaryAction className={classes.secondaryAction}>
                        <Checkbox className={classes.checkbox}
                                  checked={item.completed}
                                  onChange={(e: React.ChangeEvent, c: boolean) => this.toggleItem(item.id, c)}/>
                    </ListItemSecondaryAction>
                    <ListItemText primary={item.title}/>
                </ListItem>
            ));
        return (
            <div>
                <List className={classes.list}>
                    {list}
                </List>
                {/*                <Sheet opened={this.state.sheetOpened > -1} onSheetClosed={() => {
                    this.setState({sheetOpened: -1});
                }}>
                    <List>
                        <ListButton title="Edit" sheetClose onClick={() => this.openDialog(this.state.sheetOpened)}/>
                        <ListButton title="Delete" sheetClose onClick={() => this.deleteItem(this.state.sheetOpened)}/>
                        <ListButton title="Cancel" sheetClose/>
                    </List>
                </Sheet>*/}
            </div>
        );
    }

    toggleItem(id: number, checked: boolean) {
        this.model.updateItem(id, {completed: checked});
    }

    deleteItem(id: number) {
        this.model.deleteItem(id);
    }

    /*openDialog(id: number) {
        const item = this.model.getItem(id);
        const dialog = this.$f7.dialog.prompt(null, 'Edit Item', (result) => {
            if (item.title === result) {
                return;
            }
            this.model.updateItem(item.id, {title: result});
        });
        const input = dialog.$el.find('input');
        input.val(item.title);
        input.focus();
    }*/
}

export default withStyles(styles)(view(ListComponent));