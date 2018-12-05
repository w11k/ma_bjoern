import {Theme} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer/Drawer';
import Hidden from '@material-ui/core/Hidden/Hidden';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
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
                    onClose={props.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                >
                    <Menu handleDrawerToggle={props.handleDrawerToggle}/>
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
                    <Menu handleDrawerToggle={props.handleDrawerToggle}/>
                </Drawer>
            </Hidden>
        </nav>
    );
}

export default withStyles(styles, {withTheme: true})(DrawerComponent);