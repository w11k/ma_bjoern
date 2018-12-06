import {createStyles, Drawer, Hidden, Theme, withStyles} from '@material-ui/core';
import React from 'react';
import {drawerWidth} from '../constants';
import {DrawerComponentProps} from '../typings';
import Menu from './Menu';

const styles = (theme: Theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0
            }
        },
        drawerPaper: {
            width: drawerWidth
        }
    });

function DrawerComponent(props: DrawerComponentProps<typeof styles>) {
    const {classes, theme} = props;
    return (
        <nav className={classes.drawer}>
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={props.mobileOpen}
                    onClose={props.closeDrawer}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                >
                    <Menu closeDrawer={props.closeDrawer}/>
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    variant="permanent"
                    open
                >
                    <Menu closeDrawer={props.closeDrawer}/>
                </Drawer>
            </Hidden>
        </nav>
    );
}

export default withStyles(styles, {withTheme: true})(DrawerComponent);