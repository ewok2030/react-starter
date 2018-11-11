import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import FolderIcon from '@material-ui/icons/Folder';

// Styles
import styles from '../styles';

class ControlPanelMenuItem extends React.Component {
  render() {
    const {
      classes, onClick, isActive, icon, label
    } = this.props;

    return (
      <ListItem button onClick={onClick} className={classNames(classes.menuItem, isActive && classes.activeMenuItem)}>
        <ListItemIcon className={classes.menuItemIcon}>{icon === null ? <FolderIcon /> : icon}</ListItemIcon>
        <ListItemText primary={label} classes={{ primary: classes.menuItemLabel }} />
      </ListItem>
    );
  }
}

ControlPanelMenuItem.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

ControlPanelMenuItem.defaultProps = {
  icon: null
};

export default withStyles(styles, { withTheme: true })(ControlPanelMenuItem);
