import {AppBar, createStyles, IconButton, Theme, Toolbar, Typography, withStyles} from '@material-ui/core';
import {Menu as MenuIcon} from '@material-ui/icons';
import React from 'react';
import {drawerWidth} from '../constants';
import {AppBarComponentProps} from '../typings';

const styles = (theme: Theme) =>
    createStyles({
        appBar: {
            marginLeft: drawerWidth,
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`
            }
        },
        menuButton: {
            marginRight: 20,
            [theme.breakpoints.up('sm')]: {
                display: 'none'
            }
        }
    });

function AppBarComponent(props: AppBarComponentProps<typeof styles>) {
    const {classes} = props;
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={props.toggleDrawer}
                    className={classes.menuButton}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default withStyles(styles)(AppBarComponent);