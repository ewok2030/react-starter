import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

// Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// Style
import styles from '../styles';

class ControlPanelMenu extends React.Component {
  render() {
    const {
      classes, children, isDrawerOpen, toggleDrawer
    } = this.props;

    return (
      <React.Fragment>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose)
          }}
          open={isDrawerOpen}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={toggleDrawer}>{isDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
          </div>
          <Divider />
          <List>{children}</List>
        </Drawer>
      </React.Fragment>
    );
  }
}

ControlPanelMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isDrawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired
};

ControlPanelMenu.defaultProps = {
  children: null
};

export default withStyles(styles)(ControlPanelMenu);
