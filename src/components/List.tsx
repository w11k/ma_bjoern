import React from 'react';
import {view} from 'react-easy-state';
import model, {Model} from '../model';
import {Item, ListComponentProps, ListTypes, SheetActions} from '../typings';
import ListItem from './ListItem';

class ListComponent extends React.Component<ListComponentProps> {
    private listType: ListTypes;
    private model: Model;

    constructor(props: ListComponentProps) {
        super(props);
        this.model = model as unknown as Model;
        this.listType = this.props.type;
    }

    render() {
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
                <ListItem
                    item={item}
                    key={item.id}
                    onChange={(c: boolean) => this.model.updateItem(item.id, {completed: c})}
                    onSheetAction={(a: SheetActions) => this.handleSheetClose(a, item)}
                />
            ));
        return (
            <div>
                <div className="list-container">
                    {list}
                </div>
            </div>
        );
    }

    private handleSheetClose = (action: SheetActions, item: Item) => {
        switch (action) {
            case SheetActions.EDIT:
                this.presentAlertPrompt(item);
                break;
            case SheetActions.DELETE:
                this.model.deleteItem(item.id);
                break;
            case SheetActions.CANCEL:
            default:
                break;
        }
    };


    private presentAlertPrompt = (item: Item) => {
        setTimeout(() => {
            const newTitle = window.prompt('Edit Item', item.title);
            if (typeof newTitle !== 'string') {
                return;
            } else if (newTitle.trim() === '') {
                return window.alert('No input!');
            } else if (item.title === newTitle) {
                return window.alert('No change!');
            }
            this.model.updateItem(item.id, {title: newTitle});
        }, 300);
    };
}

export default view(ListComponent);