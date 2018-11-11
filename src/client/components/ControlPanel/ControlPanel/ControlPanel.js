import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';

// Style
import styles from '../styles';

class ControlPanel extends React.Component {
  // Constructor is called before render()
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false
    };
  }

  toggleDrawer = () => {
    this.setState(prevState => ({ isDrawerOpen: !prevState.isDrawerOpen }));
  };

  render() {
    const { children } = this.props;
    const { isDrawerOpen } = this.state;
    return (
      <React.Fragment>
        {React.Children.map(children, child => React.cloneElement(child, {
          isDrawerOpen,
          toggleDrawer: this.toggleDrawer
        }))}
      </React.Fragment>
    );
  }
}

ControlPanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

ControlPanel.defaultProps = {
  children: null
};

export default withStyles(styles, { withTheme: true })(ControlPanel);
