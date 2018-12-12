import {PaperCheckboxElement} from '@polymer/paper-checkbox/paper-checkbox';
import React from 'react';
import {ContextMenuElement, ListItemComponentProps, SheetActions} from '../typings';

class ListItemComponent extends React.Component<ListItemComponentProps> {
    private menu: React.RefObject<ContextMenuElement> = React.createRef<ContextMenuElement>();
    private checkbox: React.RefObject<PaperCheckboxElement> = React.createRef<PaperCheckboxElement>();

    handleContextMenuClick = (event: MouseEvent) => {
        const element = event.target as HTMLElement;
        if (Object.values(SheetActions).includes(element.dataset.action)) {
            this.props.onSheetAction(element.dataset.action as SheetActions);
        }
    };

    handleCheckboxChange = (event: Event) => {
        const element = event.target as HTMLInputElement;
        this.props.onChange(element.checked);
    };

    componentDidMount() {
        if (this.menu.current) {
            this.menu.current.renderer = (root: HTMLElement) => {
                let listBox = root.firstElementChild;
                if (!listBox) {
                    listBox = document.createElement('div');
                    listBox.setAttribute('role', 'listbox');
                    listBox.classList.add('menu_list');
                    listBox.innerHTML = `
                        <paper-item data-action="${SheetActions.EDIT}">
                            ${SheetActions.EDIT}
                            <paper-ripple/>
                        </paper-item>
                        <paper-item data-action="${SheetActions.DELETE}">
                            ${SheetActions.DELETE}
                            <paper-ripple/>
                        </paper-item>
                        <hr>
                        <paper-item data-action="${SheetActions.CANCEL}">
                            ${SheetActions.CANCEL}
                            <paper-ripple/>
                        </paper-item>
                    `;
                    listBox.querySelectorAll('paper-item').forEach((item) => {
                        item.addEventListener('click', this.handleContextMenuClick);
                    });
                    root.appendChild(listBox);
                }
            };
        }

        if (this.checkbox.current) {
            this.checkbox.current.addEventListener('change', this.handleCheckboxChange);
        }
    }

    componentWillUnmount() {
        if (this.menu.current) {
            const listBox = this.menu.current.querySelector('.menu_list');
            if (listBox) {
                listBox.querySelectorAll('paper-item').forEach((item) => {
                    item.removeEventListener('click', this.handleContextMenuClick);
                });
            }
        }

        if (this.checkbox.current) {
            this.checkbox.current.removeEventListener('change', this.handleCheckboxChange);
        }
    }

    render() {
        return (
            <vaadin-context-menu ref={this.menu}>
                <paper-item>
                    <paper-checkbox
                        ref={this.checkbox}
                        {...this.props.item.completed ? {checked: true} : {}}/>
                    <span className="label">{this.props.item.title}</span>
                </paper-item>
            </vaadin-context-menu>
        );
    }
}

export default ListItemComponent;