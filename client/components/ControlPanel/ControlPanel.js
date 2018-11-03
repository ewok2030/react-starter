import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FolderIcon from '@material-ui/icons/Folder';


class Panel extends React.Component {
    // Constructor is called before render()
    constructor(props) {
        super(props);
        this.state = {
            isDrawerOpen: false,
        };
    }

    toggleDrawer = () => {
        this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    };

    render() {
        return (
            <React.Fragment>
                {React.Children.map(this.props.children, child => {
                    return (React.cloneElement(child, {
                        isDrawerOpen: this.state.isDrawerOpen,
                        toggleDrawer: this.toggleDrawer,
                    }));
                })}
            </React.Fragment>
        );
    }
}

Panel.propTypes = {
    children: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    //controls: PropTypes.object.isRequired,
    // menuItems: PropTypes.arrayOf(PropTypes.shape({
    //     id: PropTypes.string.isRequired,
    //     title: PropTypes.string.isRequired,
    //     onClick: PropTypes.func.isRequired,
    //     isActive: PropTypes.bool.isRequired,
    //     icon: PropTypes.object,
    //     divider: PropTypes.bool,
    // })).isRequired
};

Panel.defaultProps = {
};

/* -------------- Body --------------*/

class Body extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classNames(classes.main, this.props.isDrawerOpen && classes.mainShift)}>
                {this.props.children}
            </div>
        );
    }
}

Body.propTypes = {
    children: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    isDrawerOpen: PropTypes.bool.isRequired,
};

/* -------------- Menu --------------*/

class Menu extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.props.isDrawerOpen && classes.drawerPaperClose),
                    }}
                    open={this.props.isDrawerOpen}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.props.toggleDrawer}>
                            {this.props.isDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List >
                        {this.props.children}
                    </List>
                </Drawer>
            </React.Fragment>
        );
    }
}

Menu.propTypes = {
    children: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    isDrawerOpen: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
};

/* -------------- MenuItem --------------*/

class MenuItem extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <ListItem button onClick={this.props.onClick} className={classNames(classes.menuItem, this.props.isActive && classes.activeMenuItem)}>
                <ListItemIcon className={classes.menuItemIcon}>
                    {this.props.icon === null ? <FolderIcon /> : this.props.icon}
                </ListItemIcon>
                <ListItemText primary={this.props.label} classes={{ primary: classes.menuItemLabel }} />
            </ListItem>
        );
    }
}

MenuItem.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.object,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

MenuItem.defaultProps = {
    icon: null,
}

const drawerWidth = 240;

const styles = theme => ({
    drawerPaper: {
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginTop: theme.spacing.unit * 8,
        zIndex: theme.zIndex.appBar - 1, // Required to make toolbar go beneath appBar
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    menuItem: {},
    activeMenuItem: {
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            '& $menuItemLabel, & $menuItemIcon': {
                color: theme.palette.common.white,
            },
        },
        backgroundColor: theme.palette.primary.main,
        '& $menuItemLabel, & $menuItemIcon': {
            color: theme.palette.common.white,
        },
    },
    menuItemLabel: {},
    menuItemIcon: {},
    main: {
        flexGrow: 1,
        marginLeft: theme.spacing.unit * 9,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    mainShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
});

export const ControlPanel = withStyles(styles, { withTheme: true })(Panel);
export const ControlPanelMenu = withStyles(styles, { withTheme: true })(Menu);
export const ControlPanelMenuItem = withStyles(styles, { withTheme: true })(MenuItem);
export const ControlPanelBody = withStyles(styles, { withTheme: true })(Body);

//export { ControlPanel, ControlPanelMenu, ControlPanelMenuItem, ControlPanelBody };