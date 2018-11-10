import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/Help';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DashboardIcon from '@material-ui/icons/Dashboard';

// Action Creators
import { getCurrentUser } from '../store/modules/Account';

class Root extends React.Component {

  constructor(props) {
    super(props);
    // Constructor is called before render()
    this.state = {
      isNavMenuOpen: false,
    };
    this.props.getCurrentUser();
  }

  toggleNavMenu = () => {
    this.setState({ isNavMenuOpen: !this.state.isNavMenuOpen });
  };

  renderNavMenu = () => {
    return (
      <List>
        <ListItem component={Link} to="/" button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar variant='absolute' className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={this.toggleNavMenu}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.title}>Marine Cloud Environment</Typography>
              <IconButton color="inherit" component={Link} to="/help">
                <HelpIcon />
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            onClose={this.toggleNavMenu}
            open={this.state.isNavMenuOpen}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleNavMenu}
              onKeyDown={this.toggleNavMenu}
            >
              {this.renderNavMenu()}
            </div>
          </Drawer>
          <main className={classes.mainContent}>
            <div className={classes.appBarSpacer} />
            {this.props.children}
          </main>
        </div>
      </React.Fragment>
    );
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    userName: PropTypes.string,
  }),
};

// Default property values
Root.defaultTypes = {
  currentUser: null,
};

// Map store state to component's properties (see redux/store.js for names of modules)
const mapStateToProps = state => ({
  location: state.router.location,
  currentUser: state.account.current,
});

// Map actions to component's properties
const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => {
    dispatch(getCurrentUser());
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    //zIndex: theme.zIndex.drawer + 1, // TODO: Make this reference the toolbar? Or make toolbar be appBar - 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    flexGrow: 1,
  },
  mainContent: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar, // Generic class to offset height of appBar
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Root));