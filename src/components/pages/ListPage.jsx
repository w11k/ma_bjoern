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
                <ListItem key={item.id} onClick={(e) => {
                    if (e.target.className === 'item-inner') {
                        this.setState({sheetOpened: item.id});
                    }
                }}>
                    <div className="test-row">
                        <div className="test-column">
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
                        <div className="test-column">
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
                        <div className="test-column">
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
                        <div className="test-column">
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
                    </div>
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