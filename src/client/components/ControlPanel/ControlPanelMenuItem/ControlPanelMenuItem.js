import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


class ControlPanelMenuItem extends React.Component {
    render() {
        const { classes } = this.props;

    handleOnClick = (id) => (event) => {
        this.props.onClick(id, event);
    }

        return (
            <ListItem button onClick={this.handleOnClick(this.props.id)} className={classNames(classes.menuItem, item.isActive && classes.activeItem)}>
                {this.props.icon !== null ?
                    <ListItemIcon className={classes.itemIcon}>
                        {this.props.icon}
                    </ListItemIcon> :
                    null
                }
                <ListItemText primary={this.props.title} classes={{ primary: classes.itemText }} />
            </ListItem>
        );
    }
}


ControlPanelMenuItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    icon: PropTypes.object,
};

ControlPanelMenuItem.defaultProps = {
    icon: null,
};


const styles = theme => ({
    menuItem: {},
    activeItem: {
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            '& $itemText, & $itemText': {
                color: theme.palette.common.white,
            },
        },
        backgroundColor: theme.palette.primary.main,
        '& $itemText, & $itemIcon': {
            color: theme.palette.common.white,
        },
    },
    itemText: {},
    itemIcon: {},
});

export default withStyles(styles, { withTheme: true })(ControlPanelMenuItem);
