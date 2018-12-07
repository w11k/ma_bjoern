import {Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import React from 'react';
import {SheetActions} from '../constants';
import {SheetComponentProps} from '../typings';

class SheetComponent extends React.Component<SheetComponentProps> {
    render() {
        return (
            <Drawer
                anchor="bottom"
                open={this.props.opened > -1}
                onClose={() => this.props.handleClose(SheetActions.cancel.title, -1)}
            >
                <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => this.props.handleClose(SheetActions.cancel.title, -1)}
                >
                    <div>
                        <List>
                            {Object.values(SheetActions).map((action) => (
                                <ListItem button key={action.title}
                                          onClick={() => this.props.handleClose(action.title, this.props.opened)}>
                                    <ListItemIcon>{action.icon}</ListItemIcon>
                                    <ListItemText primary={action.title}/>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export default SheetComponent;