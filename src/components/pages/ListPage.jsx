import {Checkbox, List, ListButton, ListItem, Page, Sheet} from 'framework7-react';
import React from 'react';
import {view} from 'react-easy-state';
import model from '../../model';
import {ListTypes} from '../../routes';

class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.model = model;
        this.listType = this.props.f7route.route.tab.id;
        this.state = {
            sheetOpened: -1
        }
    }

    render() {
        const list = this.model.getAllItems()
            .filter(item => {
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
            .map(item => (
                <ListItem key={item.id} title={item.title} onClick={(e) => {
                    if (e.target.className === 'item-inner') {
                        this.setState({sheetOpened: item.id});
                    }
                }}>
                    <Checkbox slot="media" checked={item.completed} onChange={(e) => this.toggleItem(item.id, e)}/>
                </ListItem>
            ));
        return (
            <Page>
                <List noChevron={true}>
                    {list}
                </List>
                <Sheet opened={this.state.sheetOpened > -1} onSheetClosed={() => {
                    this.setState({sheetOpened: -1});
                }}>
                    <List>
                        <ListButton title="Edit" sheetClose onClick={() => this.openDialog(this.state.sheetOpened)}/>
                        <ListButton title="Delete" sheetClose onClick={() => this.deleteItem(this.state.sheetOpened)}/>
                        <ListButton title="Cancel" sheetClose/>
                    </List>
                </Sheet>
            </Page>
        );
    }

    toggleItem(id, event) {
        this.model.updateItem(id, {completed: event.target.checked});
    }

    deleteItem(id) {
        this.model.deleteItem(id);
    }

    openDialog(id) {
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
    }
}

export default view(ListPage);