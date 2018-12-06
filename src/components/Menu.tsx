import {
    AppBar,
    createStyles,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Theme,
    Toolbar,
    Typography,
    withStyles
} from '@material-ui/core';
import React from 'react';
import {drawerWidth, pages} from '../constants';
import {MenuComponentProps} from '../typings';
import createLink from './Link';

const styles = (theme: Theme) =>
    createStyles({
        menuBar: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth - 1
            },
            left: 0,
            right: 'auto'
        },
        toolbar: theme.mixins.toolbar
    });

function MenuComponent(props: MenuComponentProps<typeof styles>) {
    const {classes} = props;
    return (
        <div>
            <div className={classes.toolbar}>
                <AppBar position="fixed" className={classes.menuBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            Menu
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <Divider/>
            <List>
                {Object.values(pages).map((page) => (
                    <ListItem
                        button
                        {...{to: page.url}}
                        component={createLink}
                        key={page.title}
                        onClick={props.closeDrawer}
                    >
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        <ListItemText primary={page.title}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default withStyles(styles)(MenuComponent);