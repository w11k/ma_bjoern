import {Theme, WithStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';
import {Link} from 'react-router-dom';
import {drawerWidth, pages} from '../constants';
import {MenuComponentProps} from '../typings';

function createLink({innerRef, ...props}: any) {
    return <Link {...props}/>;
}

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
                    <ListItem button {...{to: page.url}}
                              component={createLink}
                              key={page.title}
                              onClick={props.handleDrawerToggle}>
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        <ListItemText primary={page.title}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default withStyles(styles)(MenuComponent);