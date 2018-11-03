import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

// Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// Components
import EnhancedTable from '../components/EnhancedTable/EnhancedTable';
import { ControlPanel, ControlPanelMenu, ControlPanelMenuItem, ControlPanelBody } from '../../components/ControlPanel/ControlPanel';

// Action Creators
import { getUsers } from '../store/modules/account';

const columns = [
    { id: 'id', isNumeric: false, label: 'Id', enableSort: true },
    { id: 'username', isNumeric: false, label: 'Username', enableSort: true },
    { id: 'email', isNumeric: false, label: 'Email', enableSort: true },
    { id: 'link', isNumeric: false, label: 'Edit', enableSort: false },
];

// Home page for the portal
class Home extends React.Component {
    // Constructor is called before render()
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 0
        };
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    handlePanelClick = index => (event) => {
        this.setState({ activePanel: index });
    };

    handleNavigate = (event, link) => {
        console.log(link);
    }

    render() {
        const { classes, isLoading } = this.props;
        return (
            <ControlPanel>
                <ControlPanelMenu onClick={this.handlePanelClick}>
                    <ControlPanelMenuItem label={"Overview"} onClick={this.handlePanelClick(0)} isActive={this.state.activePanel === 0} icon={<DashboardIcon />} />
                    <ControlPanelMenuItem label={"Users"} onClick={this.handlePanelClick(1)} isActive={this.state.activePanel === 1} icon={<AccountCircleIcon />} />
                </ControlPanelMenu>
                <ControlPanelBody isDrawerOpen={this.state.isDrawerOpen}>
                    {this.state.activePanel == 0 &&
                        <Grid container>
                            <Typography>{this.state.activePanel}</Typography>
                        </Grid>
                    }
                    {this.state.activePanel == 1 &&
                        <EnhancedTable columns={columns} title='Users' isLoading={isLoading} enableSelect={false} data=
                            {this.props.users.map(ds => {
                                return ({
                                    id: ds.id,
                                    username: ds.username,
                                    email: ds.emailPrimary,
                                    link: <IconButton component={Link} to={`/accounts/user/${ds.id}`}> <EditIcon /></IconButton>
                                });
                            })
                            } />
                    }
                </ControlPanelBody>
            </ControlPanel>
        );
    }
}

Home.propTypes = {
    // redux store properties mapped to this class via @connect()
    users: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,

    // redux action creators mapped to this class via @connect()
    fetchUsers: PropTypes.func.isRequired,

    // react-router props
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

// Map store state to component's properties (see store/configureStore.js for names of each store module)
const mapStateToProps = state => ({
    location: state.router.location,
    users: state.account.users,
    isLoading: state.account.isLoading,
});

// Map actions to component's properties
const mapDispatchToProps = dispatch => ({
    fetchUsers: () => {
        dispatch(getUsers());
    },
});

// Style
const styles = theme => ({
    main: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    tableHeaderStyle: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Home));