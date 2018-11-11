import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material UI
import { withStyles } from '@material-ui/core/styles';

// Style
import styles from '../styles';

class ControlPanelBody extends React.Component {
  render() {
    const { classes, children, isDrawerOpen } = this.props;

    return <div className={classNames(classes.main, isDrawerOpen && classes.mainShift)}>{children}</div>;
  }
}

ControlPanelBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isDrawerOpen: PropTypes.bool.isRequired
};

ControlPanelBody.defaultProps = {
  children: null
};

export default withStyles(styles, { withTheme: true })(ControlPanelBody);
